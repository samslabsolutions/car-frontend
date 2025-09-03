"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
    User,
    Activity,
    Heart,
    Clock,
    MessageSquare,
    Settings,
    Upload,
    Edit3,
    Save,
    X,
    Camera,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Flag,
    Users,
    Settings as SettingsIcon,
    Fuel,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { toast } from 'react-toastify';
import Link from 'next/link';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        nationality: '',
        preferredCity: '',
        photo: ''
    });
    const [editData, setEditData] = useState({ ...profileData });
    const [photoFile, setPhotoFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(true);
    const [wishlistError, setWishlistError] = useState(null);
    const [visibleWishlistCount, setVisibleWishlistCount] = useState(3);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Fetch user data
    // Replace your existing useEffect for fetching user data with this:
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // First, check if we need to handle OAuth cookies
                const getCookie = (name) => {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(';').shift();
                    return null;
                };

                // Check for OAuth cookies first
                const cookieToken = getCookie('jwt');
                const userCookie = getCookie('user');

                console.log('Checking for OAuth cookies:', {
                    hasCookieToken: !!cookieToken,
                    hasUserCookie: !!userCookie
                });

                if (cookieToken && userCookie) {
                    try {
                        const userData = JSON.parse(decodeURIComponent(userCookie));
                        console.log('Found OAuth cookies, storing in localStorage:', userData);

                        // Store in localStorage
                        localStorage.setItem('jwt', cookieToken);
                        localStorage.setItem('user', JSON.stringify(userData));

                        // Clean up cookies
                        document.cookie = 'jwt=; Max-Age=0; path=/; sameSite=lax';
                        document.cookie = 'user=; Max-Age=0; path=/; sameSite=lax';

                        console.log('OAuth cookies processed and cleaned up');
                    } catch (parseError) {
                        console.error('Error parsing OAuth cookies:', parseError);
                    }
                }

                // Now get token from localStorage
                const token = localStorage.getItem('jwt');
                console.log('Token from localStorage:', !!token);

                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${BASE_URL}/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                console.log('User data fetched successfully:', data.user.email);

                setProfileData({
                    name: data.user.name || '',
                    email: data.user.email || '',
                    phoneNumber: data.user.phoneNumber || '',
                    dateOfBirth: data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toISOString().split('T')[0] : '',
                    nationality: data.user.nationality || '',
                    preferredCity: data.user.preferredCity || '',
                    photo: data.user.photo || ''
                });
                setEditData({
                    name: data.user.name || '',
                    email: data.user.email || '',
                    phoneNumber: data.user.phoneNumber || '',
                    dateOfBirth: data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toISOString().split('T')[0] : '',
                    nationality: data.user.nationality || '',
                    preferredCity: data.user.preferredCity || '',
                    photo: data.user.photo || ''
                });
                setLoading(false);
            } catch (err) {
                console.error('Fetch user error:', err);
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array

    // Fetch wishlist data
    const fetchWishlist = useCallback(async () => {
        try {
            setWishlistLoading(true);
            const token = localStorage.getItem('jwt');
            if (!token) {
                setWishlistError('No authentication token found');
                setWishlistLoading(false);
                return;
            }

            const response = await fetch(`${BASE_URL}/api/cars/getall`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch wishlist');
            }

            const transformedCars = data.wishlist.map(car => ({
                id: car._id,
                images: car.images.length > 0
                    ? car.images.map(img => img.url ? `${BASE_URL}${img.url}` : '/placeholder.jpg')
                    : ['/placeholder.jpg'],
                category: car.category || 'Car',
                title: `${car.make} ${car.model} ${car.year}`,
                specs: {
                    seats: car.seatingCapacity || 'N/A',
                    doors: car.doors || 'N/A',
                    fuel: car.fuelType || 'N/A',
                },
                pricing: {
                    daily: car.pricing?.daily?.discountedPrice || 0,
                    weekly: car.pricing?.weekly?.discountedPrice || 0,
                },
                dealer: {
                    name: car.agency?.agencyName || 'Car Rental',
                    logo: '/dollar-logo.png',
                },
                agency: {
                    contactPhone: car.agency?.contactPhone || '#',
                },
            }));

            setWishlist(transformedCars);
            setWishlistLoading(false);
            setWishlistError(null);
        } catch (err) {
            console.error('Fetch wishlist error:', err);
            setWishlistError(err.message || 'Failed to load wishlist');
            setWishlistLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'activity') {
            fetchWishlist();
        }
    }, [activeTab, fetchWishlist]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...profileData });
        setPhotoFile(null);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const formData = new FormData();
            formData.append('name', editData.name);
            formData.append('phoneNumber', editData.phoneNumber);
            formData.append('dateOfBirth', editData.dateOfBirth);
            formData.append('nationality', editData.nationality);
            formData.append('preferredCity', editData.preferredCity);
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            const response = await fetch(`${BASE_URL}/auth/updateMe`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                let errorMessage = 'Failed to update profile';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('Error parsing error response:', parseError);
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setProfileData({
                name: data.user.name || '',
                email: data.user.email || '',
                phoneNumber: data.user.phoneNumber || '',
                dateOfBirth: data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toISOString().split('T')[0] : '',
                nationality: data.user.nationality || '',
                preferredCity: data.user.preferredCity || '',
                photo: data.user.photo || ''
            });
            setIsEditing(false);
            setPhotoFile(null);
            setError(null);
        } catch (err) {
            console.error('Update profile error:', err);
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setPhotoFile(null);
        setIsEditing(false);
        setError(null);
    };

    const handleInputChange = (field, value) => {
        setEditData({ ...editData, [field]: value });
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const handleImageChange = (carId, direction) => {
        setCurrentImageIndex(prev => {
            const car = wishlist.find(c => c.id === carId);
            const currentIdx = prev[carId] || 0;
            const nextIdx = direction === 'next'
                ? (currentIdx + 1) % car.images.length
                : currentIdx === 0
                    ? car.images.length - 1
                    : currentIdx - 1;
            return { ...prev, [carId]: nextIdx };
        });
    };

    const toggleWishlist = async (carId) => {
        const isWishlisted = wishlist.some(car => car.id === carId);
        const method = isWishlisted ? 'DELETE' : 'POST';

        // Optimistic update
        setWishlist(prev =>
            isWishlisted
                ? prev.filter(car => car.id !== carId)
                : [...prev]
        );

        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`${BASE_URL}/api/cars/wishlist/${carId}`, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
                // Refresh wishlist after successful update
                fetchWishlist();
            } else {
                throw new Error(data.message || 'Failed to update wishlist');
            }
        } catch (error) {
            console.error('Wishlist toggle failed:', error);
            toast.error(error.message || 'An error occurred while updating wishlist', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
            // Revert optimistic update
            fetchWishlist();
        }
    };

    const handleShowMore = () => {
        setVisibleWishlistCount(prev => prev + 6);
    };

    const handleShowLess = () => {
        setVisibleWishlistCount(3);
    };

    const sidebarItems = [
        {
            id: 'profile',
            label: 'My Profile',
            icon: <User className="w-5 h-5" />
        },
        {
            id: 'activity',
            label: 'Activity',
            icon: <Activity className="w-5 h-5" />
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: <Settings className="w-5 h-5" />
        }
    ];

    const nationalityOptions = [
        'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
        'France', 'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Egypt',
        'Jordan', 'Lebanon', 'Syria', 'Other'
    ];

    const cityOptions = [
        'Abu Dhabi', 'Ajman', 'Dubai', 'Fujairah', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain'
    ];

    const contactedDealers = [
        {
            id: 1,
            dealerName: 'Premium Car Rentals',
            carModel: 'BMW X5 2024',
            contactDate: '2024-08-20',
            status: 'Responded',
            lastMessage: 'Car is available for your dates'
        },
        {
            id: 2,
            dealerName: 'Elite Motors',
            carModel: 'Mercedes C-Class',
            contactDate: '2024-08-19',
            status: 'Pending',
            lastMessage: 'Inquiry sent'
        },
        {
            id: 3,
            dealerName: 'Dubai Car Hub',
            carModel: 'Audi Q7',
            contactDate: '2024-08-18',
            status: 'Responded',
            lastMessage: 'Special discount available'
        }
    ];

    const formatPrice = (price) => price.toLocaleString();

    const renderProfileContent = () => (
        <div className="space-y-8 ">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                <div className="flex items-start justify-between mb-8 ">
                    <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                        {profileData.photo ? (
                            <img
                                src={`${BASE_URL}/${profileData.photo}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-semibold text-white">
                                    {profileData.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        )}
                        {isEditing && (
                            <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                                <Camera className="w-4 h-4" />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                        <p className="text-gray-600">{profileData.email}</p>
                        {isEditing && (
                            <label className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                                Upload new photo
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.name}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email Address
                        </label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.email}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Phone Number
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={editData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.phoneNumber || 'Not provided'}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Date of Birth
                        </label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={editData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Flag className="w-4 h-4 inline mr-2" />
                            Nationality
                        </label>
                        {isEditing ? (
                            <select
                                value={editData.nationality}
                                onChange={(e) => handleInputChange('nationality', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                            >
                                <option value="">Select Nationality</option>
                                {nationalityOptions.map((nationality) => (
                                    <option key={nationality} value={nationality}>{nationality}</option>
                                ))}
                            </select>
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.nationality || 'Not provided'}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Preferred City
                        </label>
                        {isEditing ? (
                            <select
                                value={editData.preferredCity}
                                onChange={(e) => handleInputChange('preferredCity', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                            >
                                <option value="">Select City</option>
                                {cityOptions.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profileData.preferredCity || 'Not provided'}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderActivityContent = () => (
        <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900 tracking-tight flex items-center">
                            <Heart className="w-6 h-6 mr-2 text-red-500" />
                            My Wishlist
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Your saved cars, ready for your next adventure.
                        </p>
                        <hr className="mt-4 w-48 border-t-2 border-blue-600" />
                    </div>
                    <span className="mt-6 sm:mt-0 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {wishlist.length} items
                    </span>
                </div>

                {wishlistError && (
                    <div
                        className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                        role="alert"
                    >
                        {wishlistError}
                    </div>
                )}

                {wishlistLoading ? (
                    <div className="text-center text-gray-600">Loading wishlist...</div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center text-gray-600">
                        No cars in your wishlist.
                    </div>
                ) : (
                    <>
                        {/* ✅ Grid with 3 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 px-4">
                            {wishlist.slice(0, visibleWishlistCount).map((car) => (
                                <div key={car.id} className="mb-6">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500">
                                        {/* Image Section */}
                                        <div className="relative group">
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={car.images[currentImageIndex[car.id] || 0]}
                                                    alt={car.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            </div>

                                            <button
                                                onClick={() => handleImageChange(car.id, "prev")}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleImageChange(car.id, "next")}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>

                                            <button
                                                onClick={() => toggleWishlist(car.id)}
                                                className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center transition-colors shadow-sm text-red-500"
                                            >
                                                <Heart className="w-5 h-5" fill="currentColor" />
                                            </button>

                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                                                {car.images.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-2 h-2 rounded-full transition-all ${(currentImageIndex[car.id] || 0) === idx
                                                            ? "bg-white"
                                                            : "bg-white/50"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-5">
                                            <div className="text-blue-600 text-sm font-medium mb-1">
                                                {car.category}
                                            </div>
                                            <Link
                                                href={`/details/${car.id}`}
                                                className="no-underline hover:underline"
                                            >
                                                <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-tight">
                                                    {car.title}
                                                </h3>
                                            </Link>

                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="flex items-center space-x-1.5 text-gray-600">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm">{car.specs.seats}</span>
                                                </div>
                                                <div className="flex items-center space-x-1.5 text-gray-600">
                                                    <SettingsIcon className="w-4 h-4" />
                                                    <span className="text-sm">{car.specs.doors}</span>
                                                </div>
                                                <div className="flex items-center space-x-1.5 text-gray-600">
                                                    <Fuel className="w-4 h-4" />
                                                    <span className="text-sm">{car.specs.fuel}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <span className="text-xl font-bold text-blue-600">
                                                        AED {formatPrice(car.pricing.daily)}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">/day</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-base font-semibold text-gray-900">
                                                        AED {formatPrice(car.pricing.weekly)}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">/week</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            (window.location.href = `tel:${car.agency.contactPhone}`)
                                                        }
                                                        className="w-10 h-10 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            (window.location.href = `https://wa.me/${car.agency.contactPhone}`)
                                                        }
                                                        className="w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">
                                                            {car.dealer.name[0]}
                                                        </span>
                                                    </div>
                                                    <span className="text-[14px] font-medium text-gray-900">
                                                        {car.dealer.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {wishlist.length > 3 && (
                            <div className="mt-4 text-center">
                                {visibleWishlistCount < wishlist.length ? (
                                    <button
                                        onClick={handleShowMore}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                                    >
                                        Show More
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleShowLess}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                                    >
                                        Show Less
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Contacted Dealers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                        <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                        Contacted Dealers
                    </h2>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {contactedDealers.length} contacts
                    </span>
                </div>

                <div className="space-y-4">
                    {contactedDealers.map((contact) => (
                        <div key={contact.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">
                                            {contact.dealerName}
                                        </h3>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${contact.status === "Responded"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {contact.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-1">{contact.carModel}</p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {contact.lastMessage}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {new Date(contact.contactDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );



    const renderSettingsContent = () => (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications about your bookings</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                            <p className="text-sm text-gray-600">Receive SMS updates for important events</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                            <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600 text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-26">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="text-center mb-8">
                                {profileData.photo ? (
                                    <img
                                        src={`${BASE_URL}/${profileData.photo}`}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-blue-500"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-semibold text-white">
                                            {profileData.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                )}
                                <h3 className="font-semibold text-gray-900">{profileData.name}</h3>
                                <p className="text-sm text-gray-600">{profileData.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === item.id
                                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1">
                        {activeTab === 'profile' && renderProfileContent()}
                        {activeTab === 'activity' && renderActivityContent()}
                        {activeTab === 'settings' && renderSettingsContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;