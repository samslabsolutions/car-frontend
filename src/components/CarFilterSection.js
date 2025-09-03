'use client';
import React, { useState, useContext, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FilterContext } from '../app/rent/page';
import { useRouter, useSearchParams } from 'next/navigation';

const CarFilterSection = () => {
    const { filters, setFilters } = useContext(FilterContext);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [tempSelectedRental, setTempSelectedRental] = useState(filters.selectedRental);
    const [tempMinPrice, setTempMinPrice] = useState(filters.minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState(filters.maxPrice);
    const [tempSelectedSort, setTempSelectedSort] = useState(filters.selectedSort);
    const [tempSelectedCarType, setTempSelectedCarType] = useState(filters.selectedCarType);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Filter options
    const locationOptions = [
        "Abu Dhabi",
        "Al Ain",
        "Madinat Zayed",
        "Ruwais",
        "Ghayathi",
        "Liwa Oasis",
        "Dubai",
        "Sharjah",
        "Khor Fakkan",
        "Kalba",
        "Dibba Al-Hisn",
        "Ajman",
        "Umm Al-Quwain",
        "Ras Al Khaimah",
        "Fujairah",
        "Dibba Al-Fujairah"
    ];

    const rentalOptions = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
    ];

    const sortOptions = [
        { label: 'Low to High', value: 'low-to-high' },
        { label: 'High to Low', value: 'high-to-low' },
        { label: 'Newest First', value: 'newest' },
    ];

    const carTypeOptions = [
        { label: 'SUV', value: 'SUV' },
        { label: 'Crossover', value: 'Crossover' },
        { label: 'Sedan', value: 'Sedan' },
        { label: 'Convertible', value: 'Convertible' },
        { label: 'Compact', value: 'Compact' },
        { label: 'Van', value: 'Van' },
        { label: 'Hatchback', value: 'Hatchback' },
        { label: 'Coupe', value: 'Coupe' },
        { label: 'Special Needs', value: 'Special Needs' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Pickup Truck', value: 'Pickup Truck' },
        { label: 'Bus', value: 'Bus' },
    ];

    const carBrands = [
        'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Nissan', 'Hyundai',
        'Kia', 'Ford', 'Chevrolet', 'Volkswagen', 'Mazda', 'Subaru', 'Infiniti', 'Acura',
    ];

    const modelYears = Array.from({ length: 15 }, (_, i) => (2024 - i).toString());
    const seatOptions = ['2 Seats', '4 Seats', '5 Seats', '7 Seats', '8+ Seats'];

    const vehicleTypes = [
        'SUV', 'Crossover', 'Sedan', 'Convertible', 'Compact', 'Van',
        'Hatchback', 'Coupe', 'Special Needs', 'Hybrid', 'Pickup Truck', 'Bus'
    ];

    const rentalPeriods = ['Daily', 'Weekly', 'Monthly', 'Long Term'];
    const carFeatures = [
        'Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Charging', 'Leather Seats',
        'Sunroof', 'Backup Camera', 'Parking Sensors', 'Cruise Control', 'Apple CarPlay',
        'Android Auto', 'Heated Seats', 'Premium Sound System',
    ];
    const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'];
    const transmissionTypes = ['Automatic', 'Manual', 'CVT'];
    const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
    const carColors = [
        'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Brown', 'Green', 'Gold', 'Yellow',
    ];
    const minAges = ['18', '21', '25', '30'];
    const sortByOptions = [
        'Price: Low to High', 'Price: High to Low', 'Newest First', 'Rating: High to Low', 'Distance: Nearest First',
    ];

    // Set category filter from URL parameters
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            const categoryMapping = {
                'economy-cars': 'Economy Cars',
                'luxury-car-rental-dubai': 'Luxury Car Rental Dubai',
                'sports-car-rental-dubai': 'Sports Car Rental Dubai',
                'special-edition': 'Special Edition',
                'muscle-cars': 'Muscle Cars',
                'no-deposit-cars': 'No Deposit Cars',
                'electric-cars': 'Electric Cars'
            };
            const exactCategoryName = categoryMapping[category] || category.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            setFilters((prev) => ({ ...prev, category: exactCategoryName }));
        }
    }, [searchParams, setFilters]);

    // Toggle dropdown
    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    // Apply filter functions
    const handleApplyRentalFilter = () => {
        setFilters((prev) => ({ ...prev, selectedRental: tempSelectedRental }));
        setActiveDropdown(null);
    };

    const handleApplyPriceFilter = () => {
        setFilters((prev) => ({
            ...prev,
            minPrice: tempMinPrice,
            maxPrice: tempMaxPrice,
            selectedPrice: tempMinPrice || tempMaxPrice ? `${tempMinPrice || '0'} - ${tempMaxPrice || '∞'}` : '',
            moreFilters: {
                ...prev.moreFilters,
                priceRange: {
                    min: tempMinPrice,
                    max: tempMaxPrice,
                },
            },
        }));
        setActiveDropdown(null);
    };

    const handleApplySortFilter = () => {
        setFilters((prev) => ({ ...prev, selectedSort: tempSelectedSort }));
        setActiveDropdown(null);
    };

    const handleApplyCarTypeFilter = () => {
        setFilters((prev) => ({ ...prev, selectedCarType: tempSelectedCarType }));
        setActiveDropdown(null);
    };

    // Reset functions
    const handleResetRental = () => {
        setTempSelectedRental('');
        setFilters((prev) => ({ ...prev, selectedRental: '' }));
        setActiveDropdown(null);
    };

    const handleResetPrice = () => {
        setTempMinPrice('');
        setTempMaxPrice('');
        setFilters((prev) => ({
            ...prev,
            minPrice: '',
            maxPrice: '',
            selectedPrice: '',
            moreFilters: {
                ...prev.moreFilters,
                priceRange: { min: '', max: '' },
            },
        }));
        setActiveDropdown(null);
    };

    const handleResetSort = () => {
        setTempSelectedSort('');
        setFilters((prev) => ({ ...prev, selectedSort: '' }));
        setActiveDropdown(null);
    };

    const handleResetCarType = () => {
        setTempSelectedCarType('');
        setFilters((prev) => ({
            ...prev,
            selectedCarType: '',
            moreFilters: {
                ...prev.moreFilters,
                vehicleType: ''
            }
        }));
        setActiveDropdown(null);
    };

    const handleMoreFiltersChange = (field, value) => {
        if (field === 'priceRange') {
            // Update both moreFilters and main price filters
            setFilters((prev) => ({
                ...prev,
                minPrice: value.min || '',
                maxPrice: value.max || '',
                selectedPrice: (value.min || value.max) ? `${value.min || '0'} - ${value.max || '∞'}` : '',
                moreFilters: {
                    ...prev.moreFilters,
                    priceRange: {
                        min: value.min || '',
                        max: value.max || '',
                    },
                },
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                moreFilters: { ...prev.moreFilters, [field]: value },
            }));
        }
    };

    const handleFeatureToggle = (feature) => {
        setFilters((prev) => ({
            ...prev,
            moreFilters: {
                ...prev.moreFilters,
                carFeatures: prev.moreFilters.carFeatures.includes(feature)
                    ? prev.moreFilters.carFeatures.filter((f) => f !== feature)
                    : [...prev.moreFilters.carFeatures, feature],
            },
        }));
    };

    const handleMoreFiltersReset = () => {
        setFilters((prev) => ({
            ...prev,
            selectedCarType: '',
            category: '',
            minPrice: '', // Also reset main price filters
            maxPrice: '',
            selectedPrice: '',
            moreFilters: {
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
                sortBy: '',
            },
        }));
    };


    const handleMoreFiltersApply = () => {
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
                                <span className="font-semibold">{filters.transactionType || 'Rent'}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`w-[12px] h-[7px] transition-transform duration-200 ${activeDropdown === 'buy' ? 'rotate-180' : ''}`}
                                >
                                    <path className="fill-gray-500" d="M12 7L6 0 0 7h12z" />
                                </svg>
                            </button>
                        </div>

                        {/* Search Input for Car Name/Description */}
                        <div className="relative flex-1 min-w-[215px] max-w-[530px]">
                            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#dedede] hover:border-[#155dfc] transition-colors">
                                <Search className="w-[17px] h-[17px] text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search the car name"
                                    value={filters.search || ''}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
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
                                    {filters.selectedRental ? rentalOptions.find((opt) => opt.value === filters.selectedRental)?.label : 'Rental Options'}
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
                                <span className="font-semibold">{filters.selectedPrice || 'Price Range'}</span>
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
                                    {filters.selectedSort ? sortOptions.find((opt) => opt.value === filters.selectedSort)?.label : 'Sort By'}
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
                                    {filters.selectedCarType || 'Car Type'}
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
                                        <div className="grid grid-cols-2 gap-2 mb-4 max-h-60 overflow-y-auto">
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
                    {activeDropdown && <div className="fixed inset-0 z-0" onClick={() => setActiveDropdown(null)} />}
                </div>

                {/* More Filters Sliding Panel */}
                {showMoreFilters && (
                    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
                        <div className="flex-1 backdrop-blur-sm" onClick={() => setShowMoreFilters(false)} />
                        <div
                            className={`w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showMoreFilters ? 'translate-x-0' : 'translate-x-full'
                                }`}
                        >
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
                                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">More Filters</h2>
                                    <button
                                        onClick={() => setShowMoreFilters(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Location</label>
                                        <select
                                            value={filters.moreFilters.location}

                                            onChange={(e) => handleMoreFiltersChange('location', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Location</option>
                                            {locationOptions.map((location, index) => (
                                                <option key={index} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Brand / Model</label>
                                        <select
                                            value={filters.moreFilters.carBrand}
                                            onChange={(e) => handleMoreFiltersChange('carBrand', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Brand</option>
                                            {carBrands.map((brand, index) => (
                                                <option key={index} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Model Year</label>
                                        <select
                                            value={filters.moreFilters.modelYear}
                                            onChange={(e) => handleMoreFiltersChange('modelYear', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Year</option>
                                            {modelYears.map((year, index) => (
                                                <option key={index} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">No. of Seats</label>
                                        <select
                                            value={filters.moreFilters.seats}
                                            onChange={(e) => handleMoreFiltersChange('seats', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Seats</option>
                                            {seatOptions.map((seat, index) => (
                                                <option key={index} value={seat}>{seat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Vehicle Type</label>
                                        <select
                                            value={filters.moreFilters.vehicleType}
                                            onChange={(e) => handleMoreFiltersChange('vehicleType', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Type</option>
                                            {vehicleTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Price Range (AED)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={filters.moreFilters.priceRange.min || ''}
                                                onChange={(e) => handleMoreFiltersChange('priceRange', { min: e.target.value, max: filters.moreFilters.priceRange.max || '' })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={filters.moreFilters.priceRange.max || ''}
                                                onChange={(e) => handleMoreFiltersChange('priceRange', { min: filters.moreFilters.priceRange.min || '', max: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Rental Period</label>
                                        <select
                                            value={filters.moreFilters.rentalPeriod}
                                            onChange={(e) => handleMoreFiltersChange('rentalPeriod', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Period</option>
                                            {rentalPeriods.map((period, index) => (
                                                <option key={index} value={period}>{period}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Features</label>
                                        <div className="space-y-2 max-h-32 lg:max-h-40 overflow-y-auto">
                                            {carFeatures.map((feature, index) => (
                                                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.moreFilters.carFeatures.includes(feature)}
                                                        onChange={() => handleFeatureToggle(feature)}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 hover:border-[#155dfc] transition-colors"
                                                    />
                                                    <span className="text-sm text-gray-700">{feature}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Payment Mode</label>
                                        <select
                                            value={filters.moreFilters.paymentMode}
                                            onChange={(e) => handleMoreFiltersChange('paymentMode', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Payment Mode</option>
                                            {paymentModes.map((mode, index) => (
                                                <option key={index} value={mode}>{mode}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Transmission</label>
                                        <select
                                            value={filters.moreFilters.transmission}
                                            onChange={(e) => handleMoreFiltersChange('transmission', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Transmission</option>
                                            {transmissionTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Fuel Type</label>
                                        <select
                                            value={filters.moreFilters.fuelType}
                                            onChange={(e) => handleMoreFiltersChange('fuelType', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Fuel Type</option>
                                            {fuelTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Car Color</label>
                                        <select
                                            value={filters.moreFilters.carColor}
                                            onChange={(e) => handleMoreFiltersChange('carColor', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Color</option>
                                            {carColors.map((color, index) => (
                                                <option key={index} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Minimum Required Age</label>
                                        <select
                                            value={filters.moreFilters.minAge}
                                            onChange={(e) => handleMoreFiltersChange('minAge', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-[#155dfc] transition-colors text-sm"
                                        >
                                            <option value="">Select Age</option>
                                            {minAges.map((age, index) => (
                                                <option key={index} value={age}>{age}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2 lg:mb-3">Sort By</label>
                                        <select
                                            value={filters.moreFilters.sortBy}
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
                                <div className="p-4 lg:p-6 border-t border-gray-200">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleMoreFiltersReset}
                                            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors border border-gray-200 hover:border-[#155dfc]"
                                        >
                                            Reset All
                                        </button>
                                        <button
                                            onClick={handleMoreFiltersApply}
                                            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-black transition-colors border border-gray-900 hover:border-[#155dfc]"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default CarFilterSection;