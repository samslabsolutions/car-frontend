import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditListingForm = ({ isOpen, setIsOpen, selectedCar, editFormData, setEditFormData, fetchListings, currentPage, setError }) => {
    const [activeTab, setActiveTab] = useState('Car Details');
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setLocalError] = useState(null); // Local error state for modal-specific errors
    const router = useRouter();

    const tabs = ['Car Details', 'Price', 'Features', 'Media', 'Location'];

    const technicalFeaturesOptions = [
        'Blind Spot Warning', 'Adaptive Cruise Control', 'Touchscreen LCD', 'Powered Tailgate',
        'Gesture Control', 'Automatic Emergency Braking', 'Bluetooth Connectivity', 'Navigation System',
        'Keyless Entry', 'Push Start', 'Climate Control', 'Heated Seats', 'Cooled Seats',
        'Sunroof', 'Panoramic Sunroof', 'Parking Sensors', 'Reverse Camera', 'Lane Departure Warning',
        'Collision Warning', 'Adaptive Headlights'
    ];

    const otherFeaturesOptions = [
        '3D Surround Camera', 'Memory Front Seats', 'Parking Assist', 'Digital HUD',
        'Temperature Controlled Seats', 'Built-in GPS', 'Steering Assist', 'Tinted Windows',
        'Premium Sound System', 'USB Charging Ports', 'Wireless Charging', 'Apple CarPlay',
        'Android Auto', 'Voice Control', 'Ambient Lighting', 'Premium Upholstery',
        'Massage Seats', 'Air Purifier', 'Heads-up Display'
    ];

    const cityOptions = [
        // Abu Dhabi Emirate
        "Abu Dhabi", "Al Ain", "Madinat Zayed", "Ruwais", "Ghayathi", "Liwa Oasis",
        // Dubai Emirate
        "Dubai",
        // Sharjah Emirate
        "Sharjah", "Khor Fakkan", "Kalba", "Dibba Al-Hisn",
        // Ajman Emirate
        "Ajman",
        // Umm Al-Quwain Emirate
        "Umm Al-Quwain",
        // Ras Al Khaimah Emirate
        "Ras Al Khaimah",
        // Fujairah Emirate
        "Fujairah", "Dibba Al-Fujairah"
    ];

    const handleInputChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setLocalError(null); // Clear local error on input change
    };

    const handleFeatureChange = (field, value) => {
        setEditFormData(prev => {
            const currentFeatures = prev[field] ? prev[field].split(',') : [];
            if (currentFeatures.includes(value)) {
                return {
                    ...prev,
                    [field]: currentFeatures.filter(f => f !== value).join(',')
                };
            } else {
                return {
                    ...prev,
                    [field]: [...currentFeatures, value].join(',')
                };
            }
        });
        setLocalError(null); // Clear local error on feature change
    };

    const validateForm = () => {
        const requiredFields = [
            'title', 'make', 'model', 'year', 'description', 'location', 'city',
            'bodyType', 'fuelType', 'gearbox', 'seatingCapacity', 'doors', 'bags',
            'securityDeposit', 'dailyOriginalPrice', 'dailyDiscountedPrice',
            'dailyMileageLimit', 'dailyAdditionalCharge'
        ];

        for (const field of requiredFields) {
            if (!editFormData[field] || editFormData[field].toString().trim() === '') {
                setLocalError(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
                return false;
            }
        }

        const numericFields = [
            'year', 'seatingCapacity', 'doors', 'bags', 'securityDeposit',
            'deliveryCharge', 'minimumAge', 'dailyOriginalPrice', 'dailyDiscountedPrice',
            'dailyMileageLimit', 'dailyAdditionalCharge', 'weeklyOriginalPrice',
            'weeklyDiscountedPrice', 'weeklyMileageLimit', 'weeklyAdditionalCharge',
            'monthlyOriginalPrice', 'monthlyDiscountedPrice', 'monthlyMileageLimit',
            'monthlyAdditionalCharge'
        ];

        for (const field of numericFields) {
            if (editFormData[field] && isNaN(Number(editFormData[field]))) {
                setLocalError(`${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid number`);
                return false;
            }
        }

        return true;
    };

    const handleRemoveImage = async (imageId) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setLocalError('Please log in to perform this action.');
                setError('Please log in to perform this action.'); // Propagate to parent
                router.push('/login');
                return;
            }
            await axios.delete(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${selectedCar._id}/images/${imageId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            selectedCar.images = selectedCar.images.filter(img => img._id !== imageId);
            fetchListings(currentPage);
            setLocalError(null);
        } catch (err) {
            console.error('Error removing image:', err);
            setLocalError('Failed to remove image.');
            setError('Failed to remove image.'); // Propagate to parent
        }
    };

    const handleUpdateSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setLocalError('Please log in to perform this action.');
                setError('Please log in to perform this action.'); // Propagate to parent
                router.push('/login');
                return;
            }

            const updateData = new FormData();
            for (const key in editFormData) {
                if (editFormData[key] !== undefined && editFormData[key] !== '' && editFormData[key] !== 'NaN') {
                    updateData.append(key, editFormData[key]);
                }
            }
            for (const file of newImages) {
                updateData.append('images', file);
            }

            await axios.patch(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${selectedCar._id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setIsOpen(false);
            setNewImages([]);
            fetchListings(currentPage);
            setLocalError(null);
            setError(null); // Clear parent error
            alert('Car listing updated successfully!');
        } catch (error) {
            console.error('Error updating listing:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update listing. Please try again.';
            setLocalError(errorMessage);
            setError(errorMessage); // Propagate to parent
            if (error.response?.status === 401) {
                setLocalError('Your session has expired. Please log in again.');
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-md overflow-auto">
            <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-4/5 overflow-auto relative">
                <button
                    onClick={() => {
                        setIsOpen(false);
                        setLocalError(null); // Clear local error on close
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Edit Listing</h2>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    <nav className="flex space-x-8 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setLocalError(null); // Clear local error on tab change
                                }}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {activeTab === 'Car Details' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={editFormData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                                    <input
                                        type="text"
                                        value={editFormData.make}
                                        onChange={(e) => handleInputChange('make', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                                    <input
                                        type="text"
                                        value={editFormData.model}
                                        onChange={(e) => handleInputChange('model', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                    <input
                                        type="number"
                                        value={editFormData.year}
                                        onChange={(e) => handleInputChange('year', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={editFormData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={editFormData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                                    <select
                                        value={editFormData.bodyType}
                                        onChange={(e) => handleInputChange('bodyType', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible', 'Pickup', 'Van', 'Sports Car', 'Luxury', 'Crossover'].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                                    <select
                                        value={editFormData.fuelType}
                                        onChange={(e) => handleInputChange('fuelType', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'GCC'].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gearbox</label>
                                    <select
                                        value={editFormData.gearbox}
                                        onChange={(e) => handleInputChange('gearbox', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        {['Auto', 'Manual'].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Engine Capacity</label>
                                    <input
                                        type="text"
                                        value={editFormData.engineCapacity}
                                        onChange={(e) => handleInputChange('engineCapacity', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity</label>
                                    <input
                                        type="number"
                                        value={editFormData.seatingCapacity}
                                        onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Doors</label>
                                    <input
                                        type="number"
                                        value={editFormData.doors}
                                        onChange={(e) => handleInputChange('doors', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bags</label>
                                    <input
                                        type="number"
                                        value={editFormData.bags}
                                        onChange={(e) => handleInputChange('bags', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Color</label>
                                    <input
                                        type="text"
                                        value={editFormData.exteriorColor}
                                        onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Interior Color</label>
                                    <input
                                        type="text"
                                        value={editFormData.interiorColor}
                                        onChange={(e) => handleInputChange('interiorColor', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit</label>
                                    <input
                                        type="number"
                                        value={editFormData.securityDeposit}
                                        onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={editFormData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        {[
                                            'Economy Cars',
                                            'Luxury Car Rental Dubai',
                                            'Sports Car Rental Dubai',
                                            'Special Edition',
                                            'New Arrival',
                                            'Muscle Cars',
                                            'No Deposit Cars',
                                            'Electric Cars'
                                        ].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
                                    <select
                                        value={editFormData.featured}
                                        onChange={(e) => handleInputChange('featured', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Price' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900">Daily Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.dailyOriginalPrice}
                                            onChange={(e) => handleInputChange('dailyOriginalPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.dailyDiscountedPrice}
                                            onChange={(e) => handleInputChange('dailyDiscountedPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                        <input
                                            type="number"
                                            value={editFormData.dailyMileageLimit}
                                            onChange={(e) => handleInputChange('dailyMileageLimit', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                        <input
                                            type="number"
                                            value={editFormData.dailyAdditionalCharge}
                                            onChange={(e) => handleInputChange('dailyAdditionalCharge', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Weekly Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.weeklyOriginalPrice}
                                            onChange={(e) => handleInputChange('weeklyOriginalPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.weeklyDiscountedPrice}
                                            onChange={(e) => handleInputChange('weeklyDiscountedPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                        <input
                                            type="number"
                                            value={editFormData.weeklyMileageLimit}
                                            onChange={(e) => handleInputChange('weeklyMileageLimit', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                        <input
                                            type="number"
                                            value={editFormData.weeklyAdditionalCharge}
                                            onChange={(e) => handleInputChange('weeklyAdditionalCharge', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Monthly Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.monthlyOriginalPrice}
                                            onChange={(e) => handleInputChange('monthlyOriginalPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                        <input
                                            type="number"
                                            value={editFormData.monthlyDiscountedPrice}
                                            onChange={(e) => handleInputChange('monthlyDiscountedPrice', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                        <input
                                            type="number"
                                            value={editFormData.monthlyMileageLimit}
                                            onChange={(e) => handleInputChange('monthlyMileageLimit', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                        <input
                                            type="number"
                                            value={editFormData.monthlyAdditionalCharge}
                                            onChange={(e) => handleInputChange('monthlyAdditionalCharge', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Features</h3>
                                    <div className="space-y-3">
                                        {technicalFeaturesOptions.map(feature => (
                                            <label key={feature} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editFormData.technicalFeatures?.split(',').includes(feature)}
                                                    onChange={() => handleFeatureChange('technicalFeatures', feature)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Features</h3>
                                    <div className="space-y-3">
                                        {otherFeaturesOptions.map(feature => (
                                            <label key={feature} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editFormData.otherFeatures?.split(',').includes(feature)}
                                                    onChange={() => handleFeatureChange('otherFeatures', feature)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Media' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {selectedCar.images?.map((image) => (
                                        <div key={image._id} className="relative">
                                            <img
                                                src={process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000${image.url}`}
                                                alt="Car"
                                                className="w-full h-32 object-cover rounded"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(image._id)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG (multiple files allowed)</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => setNewImages(Array.from(e.target.files))}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {newImages.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                        {newImages.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                                <button
                                                    onClick={() => setNewImages(newImages.filter((_, i) => i !== index))}
                                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'Location' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <select
                                        value={editFormData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select City</option>
                                        {cityOptions.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={editFormData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Locations (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={editFormData.pickupLocations}
                                        onChange={(e) => handleInputChange('pickupLocations', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Available</label>
                                    <select
                                        value={editFormData.deliveryAvailable}
                                        onChange={(e) => handleInputChange('deliveryAvailable', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Charge</label>
                                    <input
                                        type="number"
                                        value={editFormData.deliveryCharge}
                                        onChange={(e) => handleInputChange('deliveryCharge', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Age</label>
                                    <input
                                        type="number"
                                        value={editFormData.minimumAge}
                                        onChange={(e) => handleInputChange('minimumAge', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">License Required</label>
                                    <input
                                        type="text"
                                        value={editFormData.licenseRequired}
                                        onChange={(e) => handleInputChange('licenseRequired', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Included</label>
                                    <select
                                        value={editFormData.insuranceIncluded}
                                        onChange={(e) => handleInputChange('insuranceIncluded', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Policy</label>
                                    <input
                                        type="text"
                                        value={editFormData.fuelPolicy}
                                        onChange={(e) => handleInputChange('fuelPolicy', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Policy</label>
                                    <input
                                        type="text"
                                        value={editFormData.mileagePolicy}
                                        onChange={(e) => handleInputChange('mileagePolicy', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Policy</label>
                                    <input
                                        type="text"
                                        value={editFormData.depositPolicy}
                                        onChange={(e) => handleInputChange('depositPolicy', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                                    <input
                                        type="text"
                                        value={editFormData.cancellationPolicy}
                                        onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Modes (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={editFormData.paymentModes}
                                        onChange={(e) => handleInputChange('paymentModes', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setLocalError(null); // Clear local error on cancel
                                }}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Listing'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditListingForm;