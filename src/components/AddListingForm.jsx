import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddListingForm = () => {
    const [activeTab, setActiveTab] = useState('Car Details');
    const [formData, setFormData] = useState({
        title: '',
        make: '',
        model: '',
        year: '',
        description: '',
        location: '',
        city: '', // Added city field
        bodyType: '',
        fuelType: '',
        gearbox: '',
        engineCapacity: '',
        seatingCapacity: '',
        doors: '',
        bags: '',
        exteriorColor: '',
        interiorColor: '',
        securityDeposit: '',
        deliveryAvailable: 'false',
        deliveryCharge: '',
        pickupLocations: '',
        minimumAge: '',
        licenseRequired: '',
        insuranceIncluded: 'true',
        fuelPolicy: '',
        mileagePolicy: '',
        depositPolicy: '',
        cancellationPolicy: '',
        paymentModes: '',
        technicalFeatures: '',
        otherFeatures: '',
        dailyOriginalPrice: '',
        dailyDiscountedPrice: '',
        dailyMileageLimit: '',
        dailyAdditionalCharge: '',
        weeklyOriginalPrice: '',
        weeklyDiscountedPrice: '',
        weeklyMileageLimit: '',
        weeklyAdditionalCharge: '',
        monthlyOriginalPrice: '',
        monthlyDiscountedPrice: '',
        monthlyMileageLimit: '',
        monthlyAdditionalCharge: '',
        category: '',
        status: 'active',
        featured: 'false'
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
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
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFeatureChange = (field, value) => {
        setFormData(prev => {
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
    };

    const validateForm = () => {
        const requiredFields = [
            'title', 'make', 'model', 'year', 'description', 'location',
            'city', // Added city to required fields
            'bodyType', 'fuelType', 'gearbox', 'seatingCapacity', 'doors', 'bags',
            'securityDeposit', 'dailyOriginalPrice', 'dailyDiscountedPrice',
            'dailyMileageLimit', 'dailyAdditionalCharge'
        ];

        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                setError(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
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
            if (formData[field] && isNaN(Number(formData[field]))) {
                setError(`${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid number`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const jwt = localStorage.getItem('jwt') || localStorage.getItem('token');
            if (!jwt) {
                setError('Please log in to create a listing.');
                router.push('/login');
                return;
            }

            const submitData = new FormData();
            for (const key in formData) {
                if (formData[key] !== undefined && formData[key] !== '' && formData[key] !== 'NaN') {
                    submitData.append(key, formData[key]);
                }
            }
            for (const file of images) {
                submitData.append('images', file);
            }

            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cars/create', submitData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFormData({
                title: '',
                make: '',
                model: '',
                year: '',
                description: '',
                location: '',
                city: '', // Reset city
                bodyType: '',
                fuelType: '',
                gearbox: '',
                engineCapacity: '',
                seatingCapacity: '',
                doors: '',
                bags: '',
                exteriorColor: '',
                interiorColor: '',
                securityDeposit: '',
                deliveryAvailable: 'false',
                deliveryCharge: '',
                pickupLocations: '',
                minimumAge: '',
                licenseRequired: '',
                insuranceIncluded: 'true',
                fuelPolicy: '',
                mileagePolicy: '',
                depositPolicy: '',
                cancellationPolicy: '',
                paymentModes: '',
                technicalFeatures: '',
                otherFeatures: '',
                dailyOriginalPrice: '',
                dailyDiscountedPrice: '',
                dailyMileageLimit: '',
                dailyAdditionalCharge: '',
                weeklyOriginalPrice: '',
                weeklyDiscountedPrice: '',
                weeklyMileageLimit: '',
                weeklyAdditionalCharge: '',
                monthlyOriginalPrice: '',
                monthlyDiscountedPrice: '',
                monthlyMileageLimit: '',
                monthlyAdditionalCharge: '',
                category: '',
                status: 'active',
                featured: 'false'
            });
            setImages([]);
            alert('Car listing created successfully!');
            router.push('/dashboard?section=My Listings');
        } catch (error) {
            console.error('Error creating listing:', error.response?.status, error.response?.data);
            setError(error.response?.data?.message || 'Failed to create listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <h2 className="text-2xl font-semibold mb-6">Add New Listing</h2>
            <nav className="flex space-x-8 mb-8">
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {activeTab === 'Car Details' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                            <input
                                type="text"
                                value={formData.make}
                                onChange={(e) => handleInputChange('make', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                            <select
                                value={formData.bodyType}
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
                                value={formData.fuelType}
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
                                value={formData.gearbox}
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
                                value={formData.engineCapacity}
                                onChange={(e) => handleInputChange('engineCapacity', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity</label>
                            <input
                                type="number"
                                value={formData.seatingCapacity}
                                onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Doors</label>
                            <input
                                type="number"
                                value={formData.doors}
                                onChange={(e) => handleInputChange('doors', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bags</label>
                            <input
                                type="number"
                                value={formData.bags}
                                onChange={(e) => handleInputChange('bags', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Color</label>
                            <input
                                type="text"
                                value={formData.exteriorColor}
                                onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Interior Color</label>
                            <input
                                type="text"
                                value={formData.interiorColor}
                                onChange={(e) => handleInputChange('interiorColor', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit</label>
                            <input
                                type="number"
                                value={formData.securityDeposit}
                                onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
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
                                value={formData.status}
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
                                value={formData.featured}
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
                                    value={formData.dailyOriginalPrice}
                                    onChange={(e) => handleInputChange('dailyOriginalPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                <input
                                    type="number"
                                    value={formData.dailyDiscountedPrice}
                                    onChange={(e) => handleInputChange('dailyDiscountedPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                <input
                                    type="number"
                                    value={formData.dailyMileageLimit}
                                    onChange={(e) => handleInputChange('dailyMileageLimit', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                <input
                                    type="number"
                                    value={formData.dailyAdditionalCharge}
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
                                    value={formData.weeklyOriginalPrice}
                                    onChange={(e) => handleInputChange('weeklyOriginalPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                <input
                                    type="number"
                                    value={formData.weeklyDiscountedPrice}
                                    onChange={(e) => handleInputChange('weeklyDiscountedPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                <input
                                    type="number"
                                    value={formData.weeklyMileageLimit}
                                    onChange={(e) => handleInputChange('weeklyMileageLimit', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                <input
                                    type="number"
                                    value={formData.weeklyAdditionalCharge}
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
                                    value={formData.monthlyOriginalPrice}
                                    onChange={(e) => handleInputChange('monthlyOriginalPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
                                <input
                                    type="number"
                                    value={formData.monthlyDiscountedPrice}
                                    onChange={(e) => handleInputChange('monthlyDiscountedPrice', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Limit</label>
                                <input
                                    type="number"
                                    value={formData.monthlyMileageLimit}
                                    onChange={(e) => handleInputChange('monthlyMileageLimit', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charge</label>
                                <input
                                    type="number"
                                    value={formData.monthlyAdditionalCharge}
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
                                            checked={formData.technicalFeatures?.split(',').includes(feature)}
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
                                            checked={formData.otherFeatures?.split(',').includes(feature)}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
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
                                    onChange={(e) => setImages(Array.from(e.target.files))}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {images.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index}`}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
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
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select</option>
                                {cityOptions.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Details</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Downtown Dubai"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Locations (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.pickupLocations}
                                onChange={(e) => handleInputChange('pickupLocations', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Available</label>
                            <select
                                value={formData.deliveryAvailable}
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
                                value={formData.deliveryCharge}
                                onChange={(e) => handleInputChange('deliveryCharge', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Age</label>
                            <input
                                type="number"
                                value={formData.minimumAge}
                                onChange={(e) => handleInputChange('minimumAge', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">License Required</label>
                            <input
                                type="text"
                                value={formData.licenseRequired}
                                onChange={(e) => handleInputChange('licenseRequired', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Included</label>
                            <select
                                value={formData.insuranceIncluded}
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
                                value={formData.fuelPolicy}
                                onChange={(e) => handleInputChange('fuelPolicy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mileage Policy</label>
                            <input
                                type="text"
                                value={formData.mileagePolicy}
                                onChange={(e) => handleInputChange('mileagePolicy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Policy</label>
                            <input
                                type="text"
                                value={formData.depositPolicy}
                                onChange={(e) => handleInputChange('depositPolicy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                            <input
                                type="text"
                                value={formData.cancellationPolicy}
                                onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Modes (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.paymentModes}
                                onChange={(e) => handleInputChange('paymentModes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={() => {
                            setFormData({
                                title: '',
                                make: '',
                                model: '',
                                year: '',
                                description: '',
                                location: '',
                                city: '', // Reset city
                                bodyType: '',
                                fuelType: '',
                                gearbox: '',
                                engineCapacity: '',
                                seatingCapacity: '',
                                doors: '',
                                bags: '',
                                exteriorColor: '',
                                interiorColor: '',
                                securityDeposit: '',
                                deliveryAvailable: 'false',
                                deliveryCharge: '',
                                pickupLocations: '',
                                minimumAge: '',
                                licenseRequired: '',
                                insuranceIncluded: 'true',
                                fuelPolicy: '',
                                mileagePolicy: '',
                                depositPolicy: '',
                                cancellationPolicy: '',
                                paymentModes: '',
                                technicalFeatures: '',
                                otherFeatures: '',
                                dailyOriginalPrice: '',
                                dailyDiscountedPrice: '',
                                dailyMileageLimit: '',
                                dailyAdditionalCharge: '',
                                weeklyOriginalPrice: '',
                                weeklyDiscountedPrice: '',
                                weeklyMileageLimit: '',
                                weeklyAdditionalCharge: '',
                                monthlyOriginalPrice: '',
                                monthlyDiscountedPrice: '',
                                monthlyMileageLimit: '',
                                monthlyAdditionalCharge: '',
                                category: '',
                                status: 'active',
                                featured: 'false'
                            });
                            setImages([]);
                            setError(null);
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Listing'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddListingForm;