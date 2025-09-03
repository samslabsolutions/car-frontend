"use client";

import React, { useState, useEffect } from 'react';
import {
    Home,
    Car,
    Plus,
    Heart,
    Search,
    MessageCircle,
    User,
    LogOut,
    ChevronDown,
    Trash2,
    Edit,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [activeTab, setActiveTab] = useState('Car Details');
    const [sortBy, setSortBy] = useState('Newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        listingTitle: 'ali tufan',
        category: 'cars',
        label: 'select label',
        condition: 'new',
        type: 'sedan',
        make: 'select make',
        model: 'select model',
        year: 'select year',
        offerType: 'select offer',
        driveType: 'select type',
        transmission: 'select transmission',
        fuelType: 'select fuel',
        mileage: '75,000',
        engineSize: 'engine size',
        cylinder: 'select cylinder'
    });
    const router = useRouter();

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', key: 'Dashboard' },
        { icon: Car, label: 'My Listings', key: 'My Listings' },
        { icon: Plus, label: 'Add Listings', key: 'Add Listings' },
        { icon: Heart, label: 'My Favorites', key: 'My Favorites' },
        { icon: Search, label: 'Saved Search', key: 'Saved Search' },
        { icon: MessageCircle, label: 'Messages', key: 'Messages' },
        { icon: User, label: 'My Profile', key: 'My Profile' },
        { icon: LogOut, label: 'Logout', key: 'Logout' }
    ];

    const tabs = ['Car Details', 'Price', 'Features', 'Media', 'Location'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setError(null);
        if (section === 'My Listings') {
            fetchListings(1);
        } else if (section === 'Logout') {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            router.push('/login');
        }
    };

    const fetchListings = async (page) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to view your listings.');
                router.push('/login');
                return;
            }

            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/my-listings`, {
                params: { page, limit: 10, status: 'all' },
                headers: { Authorization: `Bearer ${jwt}` }
            });
            const { cars, totalPages } = response.data;
            setListings(cars);
            setTotalPages(totalPages);
            setCurrentPage(page);
            setError(null);
        } catch (error) {
            console.error('Error fetching listings:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                setError('Failed to fetch listings. Please try again later.');
            }
        }
    };

    const handleDelete = async (carId) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            await axios.delete(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${carId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            setListings(listings.filter(listing => listing._id !== carId));
            setError(null);
        } catch (error) {
            console.error('Error deleting listing:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                setError('Failed to delete listing. Please try again.');
            }
        }
    };

    const handleEdit = (carId) => {
        router.push(`/edit-listing/${carId}`);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchListings(page);
        }
    };

    useEffect(() => {
        if (activeSection === 'My Listings') {
            fetchListings(1);
        }
    }, [activeSection]);

    // Filter listings based on search query
    const filteredListings = listings.filter(listing => {
        return (
            listing.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Sort listings based on sortBy value
    const sortedListings = [...filteredListings].sort((a, b) => {
        switch (sortBy) {
            case 'Newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'Oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'Price Low to High':
                return (a.pricing?.daily?.discountedPrice || 0) - (b.pricing?.daily?.discountedPrice || 0);
            case 'Price High to Low':
                return (b.pricing?.daily?.discountedPrice || 0) - (a.pricing?.daily?.discountedPrice || 0);
            default:
                return 0;
        }
    });

    const renderContent = () => {
        switch (activeSection) {
            case 'Dashboard':
                return (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">My Listings</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">43,279</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Car className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Saved Search</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">19</p>
                                    </div>
                                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                                        <Search className="w-6 h-6 text-pink-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Messages</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">My Favorites</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">22,786</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Car Page Views</h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Select Cars</span>
                                            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                                                <option>Audi A3</option>
                                                <option>BMW X5</option>
                                                <option>Mercedes C-Class</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Date</span>
                                            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                                                <option>15 Days</option>
                                                <option>30 Days</option>
                                                <option>90 Days</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 relative">
                                    <div className="absolute inset-0 flex items-end justify-between px-4">
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '40%' }}></div>
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '60%' }}></div>
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '80%' }}></div>
                                        <div className="w-8 bg-blue-400 rounded-t" style={{ height: '100%' }}></div>
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '70%' }}></div>
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '50%' }}></div>
                                        <div className="w-8 bg-blue-200 rounded-t" style={{ height: '30%' }}></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                        <span>Sun</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">Wade Warren</span> applied for a job
                                                <span className="text-blue-600"> Web Developer</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">Henry Wilson</span> applied for a job
                                                <span className="text-blue-600"> Senior Product Designer</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">Raul Costa</span> applied for a job
                                                <span className="text-green-600"> Product Manager, Risk</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">Jack Milk</span> applied for a job
                                                <span className="text-blue-600"> Technical Architect</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'My Listings':
                return (
                    <div className="p-6">
                        {error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search Cars eg. Audi Q"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <span className="text-sm text-gray-600">Sort by</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                                    >
                                        <option value="Newest">Newest</option>
                                        <option value="Oldest">Oldest</option>
                                        <option value="Price Low to High">Price Low to High</option>
                                        <option value="Price High to Low">Price High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-blue-50 px-6 py-4">
                                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-blue-600">
                                    <div>Make</div>
                                    <div>Model</div>
                                    <div>Year</div>
                                    <div>Transmission</div>
                                    <div>FuelType</div>
                                    <div>Action</div>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {sortedListings.length === 0 && !error ? (
                                    <div className="p-6 text-center text-gray-500">No listings found.</div>
                                ) : (
                                    sortedListings.map((listing) => {
                                        // Find the main image
                                        const mainImage = listing.images?.find(img => img.isMain) || listing.images?.[0];
                                        const imageUrl = mainImage?.url
                                            ? process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000${mainImage.url}`
                                            : "https://via.placeholder.com/150";

                                        return (
                                            <div key={listing._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                                <div className="grid grid-cols-6 gap-4 items-center">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={imageUrl}
                                                            alt={listing.make}
                                                            className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                                                            onError={(e) => {
                                                                e.target.src = "https://via.placeholder.com/150";
                                                            }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-medium text-gray-900">{listing.make}</div>
                                                            <div className="text-sm text-gray-500 truncate">
                                                                {listing.title}
                                                            </div>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <span className="text-lg font-bold text-gray-900">${listing.pricing?.daily?.discountedPrice || 'N/A'}</span>
                                                                <span className="text-sm text-gray-500 line-through">${listing.pricing?.daily?.originalPrice || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-900 font-medium">{listing.model}</div>
                                                    <div className="text-gray-900">{listing.year}</div>
                                                    <div className="text-gray-900">{listing.gearbox}</div>
                                                    <div className="text-gray-900">{listing.fuelType}</div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleDelete(listing._id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(listing._id)}
                                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium ${currentPage === index + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );

            case 'Add Listings':
                return (
                    <div className="p-6">
                        <div className="mb-8">
                            <nav className="flex space-x-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        {activeTab === 'Car Details' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Listing Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.listingTitle}
                                            onChange={(e) => handleInputChange('listingTitle', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        >
                                            <option value="cars">cars</option>
                                            <option value="trucks">trucks</option>
                                            <option value="motorcycles">motorcycles</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Label
                                        </label>
                                        <select
                                            value={formData.label}
                                            onChange={(e) => handleInputChange('label', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                        >
                                            <option value="select label">select label</option>
                                            <option value="featured">featured</option>
                                            <option value="premium">premium</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Price' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 1000"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price Prefix
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 1000"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                            Any text shown before price (for example: from).
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price Suffix
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Features' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Heated Seats</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Heated Steering Wheel</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Navigation System</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Tyre Pressure Monitoring System</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Apple CarPlay/Android Auto</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Bluetooth</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">HomeLink</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Airbag - Driver</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Airbag - Passenger</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Anti-lock Braking System</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Backup Camera</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Center Console</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Heated and Ventilated Front Seats</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Panoramic Moonroof</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Qi Wireless Charging</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Touchscreen</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-900">Alloy Wheels</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Brake Calipers - Silver Painted</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Rear Bumper High Gloss</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Rear Diffuser Body Colour</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-700">Windows -</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Media' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Media</h3>
                                    <p className="text-gray-600">Media upload functionality will be added here.</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Location' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                                    <p className="text-gray-600">Location selection functionality will be added here.</p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{activeSection}</h3>
                                <p className="text-gray-600">Content for {activeSection} section goes here.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-64 bg-slate-900 text-white flex flex-col md:w-1/5 lg:w-64">
                <div className="p-6 border-b border-slate-700">
                    <div className="text-xl font-bold">CarRental</div>
                </div>
                <nav className="flex-1 py-6">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.key;
                        return (
                            <button
                                key={index}
                                onClick={() => handleSectionChange(item.key)}
                                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors w-full text-left ${isActive
                                    ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{activeSection}</h1>
                            <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;