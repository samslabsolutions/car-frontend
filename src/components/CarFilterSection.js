'use client';
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CarFilterSection = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        transactionType: 'Rent',
        location: '',
        status: 'All',
        propertyType: 'Residential',
        bedsAndBaths: 'Beds & Baths'
    });

    // Filter states
    const [selectedRental, setSelectedRental] = useState('');
    const [tempSelectedRental, setTempSelectedRental] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [tempMinPrice, setTempMinPrice] = useState('');
    const [tempMaxPrice, setTempMaxPrice] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [tempSelectedSort, setTempSelectedSort] = useState('');
    const [selectedCarType, setSelectedCarType] = useState('');
    const [tempSelectedCarType, setTempSelectedCarType] = useState('');

    // More filters states
    const [moreFiltersData, setMoreFiltersData] = useState({
        location: '',
        carBrand: '',
        modelYear: '',
        seats: '',
        vehicleType: '',
        priceRange: { min: '', max: '' },
        rentalPeriod: '',
        carFeatures: [],
        paymentMode: '',
        transmission: '',
        fuelType: '',
        carColor: '',
        minAge: '',
        sortBy: ''
    });

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const statusOptions = ['All', 'Ready', 'Off-Plan'];

    // Filter options
    const rentalOptions = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' }
    ];

    const sortOptions = [
        { label: 'Low to High', value: 'low-to-high' },
        { label: 'High to Low', value: 'high-to-low' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Most Popular', value: 'popular' }
    ];

    const carTypeOptions = [
        { label: 'SUV', value: 'suv' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Crossover', value: 'crossover' },
        { label: 'Sedan', value: 'sedan' },
        { label: 'Hatchback', value: 'hatchback' },
        { label: 'Convertible', value: 'convertible' }
    ];

    // More filters options
    const locationOptions = [
        'Abu Hail', 'Al Aweer', 'Al Barsha', 'Al Estiqlal St', 'Al Estiqlal Street', 'Al Fahidi',
        'Al Garhoud', 'Al Jaddaf', 'Al Karama', 'Al Khabaisi', 'Al Khabisi', 'Al Khawaneej',
        'Al Khawaneej 2', 'Al Quoz', 'Al Quoz 3', 'Al Qusais', 'Al Qusais 2', 'Al Rawda',
        'Al Yarmooq', 'Barsha Heights', 'Bur Dubai', 'Business Bay', 'Creek Harbour', 'DIFC',
        'Deira', 'Down Town Dubai', 'Downtown Dubai', 'Dubai Airport', 'Dubai Design District',
        'Dubai Internet City', 'Dubai Mall', 'Dubai Marina', 'Dubai Production City',
        'Dubai Silicon Oasis', 'Dubai Sports City', 'Garhoud', 'Hor Al Anz', 'JBR', 'JLT',
        'Jumeirah', 'Jumeirah 1', 'Jumeirah Village Circle', 'Karama', 'Majan', 'Meydan',
        'Motor city', 'Nad Al Hamar', 'Nad Al Sheba', 'Nad Al Sheba 1', 'Naif', 'Oud Metha',
        'Palm Jumeirah', 'Port Saeed', 'Ras Al Khor', 'Sheikh Zayed Road', 'Silicon Oasis',
        'Town Square', 'Trade Centre', 'Trade Centre 1', 'Umm Al Sheif', 'Umm Ramool',
        'Umm Suqeim 3', 'Warsan'
    ];

    const carBrands = [
        'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Nissan', 'Hyundai',
        'Kia', 'Ford', 'Chevrolet', 'Volkswagen', 'Mazda', 'Subaru', 'Infiniti', 'Acura'
    ];

    const modelYears = Array.from({ length: 15 }, (_, i) => (2024 - i).toString());

    const seatOptions = ['2 Seats', '4 Seats', '5 Seats', '7 Seats', '8+ Seats'];

    const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van'];

    const rentalPeriods = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Long Term'];

    const carFeatures = [
        'Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Charging', 'Leather Seats',
        'Sunroof', 'Backup Camera', 'Parking Sensors', 'Cruise Control', 'Apple CarPlay',
        'Android Auto', 'Heated Seats', 'Premium Sound System'
    ];

    const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'];

    const transmissionTypes = ['Automatic', 'Manual', 'CVT'];

    const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

    const carColors = [
        'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Brown', 'Green', 'Gold', 'Yellow'
    ];

    const minAges = ['18', '21', '25', '30'];

    const sortByOptions = [
        'Price: Low to High', 'Price: High to Low', 'Newest First', 'Most Popular',
        'Rating: High to Low', 'Distance: Nearest First'
    ];

    // Apply filter functions
    const handleApplyRentalFilter = () => {
        setSelectedRental(tempSelectedRental);
        setActiveDropdown(null);
    };

    const handleApplyPriceFilter = () => {
        if (tempMinPrice || tempMaxPrice) {
            const priceText = `${tempMinPrice || '0'} - ${tempMaxPrice || '∞'}`;
            setSelectedPrice(priceText);
        }
        setActiveDropdown(null);
    };

    const handleApplySortFilter = () => {
        setSelectedSort(tempSelectedSort);
        setActiveDropdown(null);
    };

    const handleApplyCarTypeFilter = () => {
        setSelectedCarType(tempSelectedCarType);
        setActiveDropdown(null);
    };

    // Reset functions
    const handleResetRental = () => {
        setTempSelectedRental('');
        setSelectedRental('');
        setActiveDropdown(null);
    };

    const handleResetPrice = () => {
        setTempMinPrice('');
        setTempMaxPrice('');
        setSelectedPrice('');
        setActiveDropdown(null);
    };

    const handleResetSort = () => {
        setTempSelectedSort('');
        setSelectedSort('');
        setActiveDropdown(null);
    };

    const handleResetCarType = () => {
        setTempSelectedCarType('');
        setSelectedCarType('');
        setActiveDropdown(null);
    };

    const handleMoreFiltersChange = (field, value) => {
        setMoreFiltersData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFeatureToggle = (feature) => {
        setMoreFiltersData(prev => ({
            ...prev,
            carFeatures: prev.carFeatures.includes(feature)
                ? prev.carFeatures.filter(f => f !== feature)
                : [...prev.carFeatures, feature]
        }));
    };

    const handleMoreFiltersReset = () => {
        setMoreFiltersData({
            location: '',
            carBrand: '',
            modelYear: '',
            seats: '',
            vehicleType: '',
            priceRange: { min: '', max: '' },
            rentalPeriod: '',
            carFeatures: [],
            paymentMode: '',
            transmission: '',
            fuelType: '',
            carColor: '',
            minAge: '',
            sortBy: ''
        });
    };

    const handleMoreFiltersApply = () => {
        console.log('Applied filters:', moreFiltersData);
        setShowMoreFilters(false);
    };

    return (
        <>
            <section className="py-8 mt-20">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <style>{`
                    h2, h3, p, span, button, input, label, select {
                        font-family: 'Poppins', sans-serif;
                    }
                    button.font-semibold, label.font-semibold, span.font-semibold, input.font-semibold::placeholder {
                        font-weight: 400;
                        color: #222222;
                        font-size: 15px;
                    }
                `}</style>
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-3 bg-white">
                        {/* Buy Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('buy')}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[100px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">{selectedFilters.transactionType}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'buy' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                        </div>

                        {/* Location Input */}
                        <div className="relative flex-1 min-w-[215px] max-w-[530px]">
                            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                <Search className="w-[17px] h-[17px] text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search the car name"
                                    value={selectedFilters.location}
                                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                                    className="flex-1 outline-none text-gray-700 placeholder-gray-500 font-semibold"
                                />
                            </div>
                        </div>

                        {/* Rental Options Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('rental')}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[130px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">
                                    {selectedRental ? rentalOptions.find(opt => opt.value === selectedRental)?.label : 'Rental Options'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'rental' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                            {activeDropdown === 'rental' && (
                                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 min-w-[320px] border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Select Rental Option</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {rentalOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTempSelectedRental(option.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedRental === option.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-[#155dfc]'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleResetRental}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors border border-gray-200 hover:border-[#155dfc]"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={handleApplyRentalFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors border border-gray-900 hover:border-[#155dfc]"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('price')}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[130px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">
                                    {selectedPrice || 'Price Range'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'price' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                            {activeDropdown === 'price' && (
                                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 min-w-[320px] border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Set Price Range</h3>
                                        <div className="space-y-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Minimum Price (AED)</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter min price"
                                                    value={tempMinPrice}
                                                    onChange={(e) => setTempMinPrice(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Maximum Price (AED)</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter max price"
                                                    value={tempMaxPrice}
                                                    onChange={(e) => setTempMaxPrice(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleResetPrice}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors border border-gray-200 hover:border-[#155dfc]"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={handleApplyPriceFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors border border-gray-900 hover:border-[#155dfc]"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sort Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('sort')}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[130px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">
                                    {selectedSort ? sortOptions.find(opt => opt.value === selectedSort)?.label : 'Sort By'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'sort' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                            {activeDropdown === 'sort' && (
                                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 min-w-[320px] border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Sort By</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTempSelectedSort(option.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedSort === option.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-[#155dfc]'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleResetSort}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors border border-gray-200 hover:border-[#155dfc]"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={handleApplySortFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors border border-gray-900 hover:border-[#155dfc]"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Car Type Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('cartype')}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[130px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">
                                    {selectedCarType ? carTypeOptions.find(opt => opt.value === selectedCarType)?.label : 'Car Type'}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'cartype' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                            {activeDropdown === 'cartype' && (
                                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 min-w-[320px] border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Select Car Type</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {carTypeOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTempSelectedCarType(option.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedCarType === option.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-[#155dfc]'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleResetCarType}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors border border-gray-200 hover:border-[#155dfc]"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={handleApplyCarTypeFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors border border-gray-900 hover:border-[#155dfc]"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* More Filters Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMoreFilters(true)}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors min-w-[130px] border border-[#dedede] hover:border-[#155dfc] font-semibold"
                            >
                                <span className="font-semibold">More Filters</span>
                                <SlidersHorizontal className="w-[15px] h-[15px]" />
                            </button>
                        </div>
                    </div>

                    {/* Click outside to close dropdowns */}
                    {activeDropdown && (
                        <div
                            className="fixed inset-0 z-0"
                            onClick={() => setActiveDropdown(null)}
                        />
                    )}
                </div>
            </section>

            {/* More Filters Sliding Panel */}
            {showMoreFilters && (
                <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <div
                        className="flex-1 backdrop-blur-sm"
                        onClick={() => setShowMoreFilters(false)}
                    />

                    {/* Sliding Panel */}
                    <div
                        className={`w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showMoreFilters ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-900">More Filters</h2>
                                <button
                                    onClick={() => setShowMoreFilters(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Location</label>
                                    <select
                                        value={moreFiltersData.location}
                                        onChange={(e) => handleMoreFiltersChange('location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Location</option>
                                        {locationOptions.map((location, index) => (
                                            <option key={index} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Car Brand / Model */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Brand / Model</label>
                                    <select
                                        value={moreFiltersData.carBrand}
                                        onChange={(e) => handleMoreFiltersChange('carBrand', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Brand</option>
                                        {carBrands.map((brand, index) => (
                                            <option key={index} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Model Year */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Model Year</label>
                                    <select
                                        value={moreFiltersData.modelYear}
                                        onChange={(e) => handleMoreFiltersChange('modelYear', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Year</option>
                                        {modelYears.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* No. of Seats */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">No. of Seats</label>
                                    <select
                                        value={moreFiltersData.seats}
                                        onChange={(e) => handleMoreFiltersChange('seats', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Seats</option>
                                        {seatOptions.map((seat, index) => (
                                            <option key={index} value={seat}>{seat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vehicle Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Vehicle Type</label>
                                    <select
                                        value={moreFiltersData.vehicleType}
                                        onChange={(e) => handleMoreFiltersChange('vehicleType', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Type</option>
                                        {vehicleTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Price Range (AED)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={moreFiltersData.priceRange.min}
                                            onChange={(e) => handleMoreFiltersChange('priceRange', { ...moreFiltersData.priceRange, min: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={moreFiltersData.priceRange.max}
                                            onChange={(e) => handleMoreFiltersChange('priceRange', { ...moreFiltersData.priceRange, max: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Rental Period */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Rental Period</label>
                                    <select
                                        value={moreFiltersData.rentalPeriod}
                                        onChange={(e) => handleMoreFiltersChange('rentalPeriod', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Period</option>
                                        {rentalPeriods.map((period, index) => (
                                            <option key={index} value={period}>{period}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Car Features */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Features</label>
                                    <div className="space-y-2 max-h-32 lg:max-h-40 overflow-y-auto">
                                        {carFeatures.map((feature, index) => (
                                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={moreFiltersData.carFeatures.includes(feature)}
                                                    onChange={() => handleFeatureToggle(feature)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 hover:border-[#155dfc] transition-colors"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Mode */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Payment Mode</label>
                                    <select
                                        value={moreFiltersData.paymentMode}
                                        onChange={(e) => handleMoreFiltersChange('paymentMode', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Payment Mode</option>
                                        {paymentModes.map((mode, index) => (
                                            <option key={index} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Transmission */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Transmission</label>
                                    <select
                                        value={moreFiltersData.transmission}
                                        onChange={(e) => handleMoreFiltersChange('transmission', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Transmission</option>
                                        {transmissionTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Fuel Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Fuel Type</label>
                                    <select
                                        value={moreFiltersData.fuelType}
                                        onChange={(e) => handleMoreFiltersChange('fuelType', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Fuel Type</option>
                                        {fuelTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Car Colors */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Colors</label>
                                    <select
                                        value={moreFiltersData.carColor}
                                        onChange={(e) => handleMoreFiltersChange('carColor', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Color</option>
                                        {carColors.map((color, index) => (
                                            <option key={index} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Minimum Required Age */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Minimum Required Age</label>
                                    <select
                                        value={moreFiltersData.minAge}
                                        onChange={(e) => handleMoreFiltersChange('minAge', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Age</option>
                                        {minAges.map((age, index) => (
                                            <option key={index} value={age}>{age}+ years</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Sort By</label>
                                    <select
                                        value={moreFiltersData.sortBy}
                                        onChange={(e) => handleMoreFiltersChange('sortBy', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        <option value="">Select Sort Option</option>
                                        {sortByOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleMoreFiltersReset}
                                        className="flex-1 px-4 py-2.5 lg:py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-[#155dfc] transition-colors text-sm"
                                    >
                                        Reset All
                                    </button>
                                    <button
                                        onClick={handleMoreFiltersApply}
                                        className="flex-1 px-4 py-2.5 lg:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:border-[#155dfc] transition-colors border border-blue-600 text-sm"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarFilterSection;