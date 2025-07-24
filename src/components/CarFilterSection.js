'use client';
import React, { useState } from 'react';
import { ChevronDown, Search, Heart } from 'lucide-react';

const FilterSection = () => {
    const [selectedCity, setSelectedCity] = useState('Dubai');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedRental, setSelectedRental] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedKms, setSelectedKms] = useState('');
    const [selectedFilters, setSelectedFilters] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showMakeDropdown, setShowMakeDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showRentalDropdown, setShowRentalDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showKmsDropdown, setShowKmsDropdown] = useState(false);
    const [tempSelectedCity, setTempSelectedCity] = useState('Dubai');
    const [tempSelectedMake, setTempSelectedMake] = useState('');
    const [tempSelectedPrice, setTempSelectedPrice] = useState('');
    const [tempSelectedRental, setTempSelectedRental] = useState('');
    const [tempSelectedYear, setTempSelectedYear] = useState('');
    const [tempSelectedKms, setTempSelectedKms] = useState('');
    const [searchMakeQuery, setSearchMakeQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [yearRange, setYearRange] = useState([2021, 2024]);
    const [kmsRange, setKmsRange] = useState([0, 100000]);

    const cities = ['Dubai', 'All Cities', 'Abu Dhabi', 'Ras Al Khaimah', 'Sharjah', 'Fujairah', 'Ajman', 'Umm Al Quwain', 'Al Ain'];

    const makes = [
        { name: 'BMW', count: 118 },
        { name: 'Mercedes', count: 213 },
        { name: 'Nissan', count: 137 },
        { name: 'Audi', count: 79 },
        { name: 'Land Rover', count: 102 },
        { name: 'Hyundai', count: 97 },
    ];

    const priceRanges = [
        { label: '0-100 AED', value: '0-100' },
        { label: '100-200 AED', value: '100-200' },
        { label: '200-500 AED', value: '200-500' },
        { label: '500-1000 AED', value: '500-1000' },
        { label: '1000+ AED', value: '1000+' }
    ];

    const rentalOptions = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' }
    ];

    const years = ['2021', '2022', '2023', '2024'];

    const kms = [
        { label: '0-10,000 km', value: '0-10000' },
        { label: '10,000-50,000 km', value: '10000-50000' },
        { label: '50,000-100,000 km', value: '50000-100000' }
    ];

    const carBrands = [
        { name: 'Mercedes-Benz', count: 213 },
        { name: 'Nissan', count: 137 },
        { name: 'BMW', count: 118 },
        { name: 'Land Rover', count: 102 },
        { name: 'Hyundai', count: 97 },
        { name: 'Kia', count: 88 },
        { name: 'Audi', count: 79 },
        { name: 'Chevrolet', count: 79 }
    ];

    // Function to close all dropdowns
    const closeAllDropdowns = () => {
        setShowCityDropdown(false);
        setShowMakeDropdown(false);
        setShowPriceDropdown(false);
        setShowRentalDropdown(false);
        setShowYearDropdown(false);
        setShowKmsDropdown(false);
    };

    // Modified dropdown toggle functions
    const toggleCityDropdown = () => {
        closeAllDropdowns();
        setShowCityDropdown(!showCityDropdown);
    };

    const toggleMakeDropdown = () => {
        closeAllDropdowns();
        setShowMakeDropdown(!showMakeDropdown);
    };

    const togglePriceDropdown = () => {
        closeAllDropdowns();
        setShowPriceDropdown(!showPriceDropdown);
    };

    const toggleRentalDropdown = () => {
        closeAllDropdowns();
        setShowRentalDropdown(!showRentalDropdown);
    };

    const toggleYearDropdown = () => {
        closeAllDropdowns();
        setShowYearDropdown(!showYearDropdown);
    };

    const toggleKmsDropdown = () => {
        closeAllDropdowns();
        setShowKmsDropdown(!showKmsDropdown);
    };

    const handleApplyFilters = () => {
        setSelectedCity(tempSelectedCity);
        setShowCityDropdown(false);
    };

    const handleApplyMakeFilter = () => {
        setSelectedMake(tempSelectedMake);
        setShowMakeDropdown(false);
        setSearchMakeQuery('');
    };

    const handleApplyPriceFilter = () => {
        if (tempSelectedPrice) {
            setSelectedPrice(tempSelectedPrice);
        } else {
            setSelectedPrice(`${priceRange[0]}-${priceRange[1]}`);
        }
        setShowPriceDropdown(false);
    };

    const handleApplyRentalFilter = () => {
        setSelectedRental(tempSelectedRental);
        setShowRentalDropdown(false);
    };

    const handleApplyYearFilter = () => {
        if (tempSelectedYear) {
            setSelectedYear(tempSelectedYear);
        } else {
            setSelectedYear(`${yearRange[0]}-${yearRange[1]}`);
        }
        setShowYearDropdown(false);
    };

    const handleApplyKmsFilter = () => {
        if (tempSelectedKms) {
            setSelectedKms(tempSelectedKms);
        } else {
            setSelectedKms(`${kmsRange[0]}-${kmsRange[1]}`);
        }
        setShowKmsDropdown(false);
    };

    const handlePriceRangeChange = (e, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = parseInt(e.target.value);
        setPriceRange(newPriceRange);
        setTempSelectedPrice('');
    };

    const handleYearRangeChange = (e, index) => {
        const newYearRange = [...yearRange];
        newYearRange[index] = parseInt(e.target.value);
        setYearRange(newYearRange);
        setTempSelectedYear('');
    };

    const handleKmsRangeChange = (e, index) => {
        const newKmsRange = [...kmsRange];
        newKmsRange[index] = parseInt(e.target.value);
        setKmsRange(newKmsRange);
        setTempSelectedKms('');
    };

    const filteredMakes = makes.filter(make =>
        make.name.toLowerCase().includes(searchMakeQuery.toLowerCase())
    );

    return (
        <div className="w-full bg-white relative mt-28">
            {/* Sticky Filter Bar */}
            <div className="">
                <div className="w-full max-w-[1200px] ml-7 border border-gray-400 px-4 py-2 rounded-2xl bg-white shadow-lg shadow-black-600">

                    <div className="flex items-center gap-0">
                        {/* City Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">City</span>
                            </div>
                            <button
                                onClick={toggleCityDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedCity || 'Select'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showCityDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select City</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {cities.map((city) => (
                                                <button
                                                    key={city}
                                                    onClick={() => setTempSelectedCity(city)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedCity === city
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {city}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowCityDropdown(false);
                                                    setTempSelectedCity('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyFilters}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Make Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Make</span>
                            </div>
                            <button
                                onClick={toggleMakeDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedMake || 'Search'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showMakeDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select Make</h3>
                                        <div className="relative mb-4">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search makes..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                value={searchMakeQuery}
                                                onChange={(e) => setSearchMakeQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {filteredMakes.map((make) => (
                                                <button
                                                    key={make.name}
                                                    onClick={() => setTempSelectedMake(make.name)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedMake === make.name
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {make.name} ({make.count})
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowMakeDropdown(false);
                                                    setSearchMakeQuery('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyMakeFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Price (AED)</span>
                            </div>
                            <button
                                onClick={togglePriceDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedPrice || 'Select'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showPriceDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select Price Range</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {priceRanges.map((range) => (
                                                <button
                                                    key={range.value}
                                                    onClick={() => setTempSelectedPrice(range.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedPrice === range.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs font-medium">Min: {priceRange[0]} AED</span>
                                                <span className="text-xs font-medium">Max: {priceRange[1]} AED</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1000"
                                                    value={priceRange[0]}
                                                    onChange={(e) => handlePriceRangeChange(e, 0)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1000"
                                                    value={priceRange[1]}
                                                    onChange={(e) => handlePriceRangeChange(e, 1)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowPriceDropdown(false);
                                                    setTempSelectedPrice('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyPriceFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rental Options Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Rental Options</span>
                            </div>
                            <button
                                onClick={toggleRentalDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedRental ? rentalOptions.find(opt => opt.value === selectedRental)?.label : 'Select'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showRentalDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select Rental Option</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {rentalOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTempSelectedRental(option.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedRental === option.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowRentalDropdown(false);
                                                    setTempSelectedRental('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyRentalFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Year</span>
                            </div>
                            <button
                                onClick={toggleYearDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedYear || 'Select'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showYearDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select Year Range</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {years.map((year) => (
                                                <button
                                                    key={year}
                                                    onClick={() => setTempSelectedYear(year)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedYear === year
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs font-medium">Min: {yearRange[0]}</span>
                                                <span className="text-xs font-medium">Max: {yearRange[1]}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="range"
                                                    min="2021"
                                                    max="2024"
                                                    value={yearRange[0]}
                                                    onChange={(e) => handleYearRangeChange(e, 0)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <input
                                                    type="range"
                                                    min="2021"
                                                    max="2024"
                                                    value={yearRange[1]}
                                                    onChange={(e) => handleYearRangeChange(e, 1)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowYearDropdown(false);
                                                    setTempSelectedYear('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyYearFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Kilometers Dropdown */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Kilometers</span>
                            </div>
                            <button
                                onClick={toggleKmsDropdown}
                                className="appearance-none bg-transparent border-r border-gray-300 pl-3 pr-8 py-2 text-gray-800 text-sm font-medium focus:outline-none w-full h-10 text-left truncate"
                            >
                                {selectedKms ? kms.find(km => km.value === selectedKms)?.label : 'Select'}
                            </button>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                            {showKmsDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[320px]">
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">Select Kilometers Range</h3>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {kms.map((km) => (
                                                <button
                                                    key={km.value}
                                                    onClick={() => setTempSelectedKms(km.value)}
                                                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${tempSelectedKms === km.value
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {km.label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs font-medium">Min: {kmsRange[0]} km</span>
                                                <span className="text-xs font-medium">Max: {kmsRange[1]} km</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100000"
                                                    value={kmsRange[0]}
                                                    onChange={(e) => handleKmsRangeChange(e, 0)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100000"
                                                    value={kmsRange[1]}
                                                    onChange={(e) => handleKmsRangeChange(e, 1)}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setShowKmsDropdown(false);
                                                    setTempSelectedKms('');
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-medium text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleApplyKmsFilter}
                                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-xs hover:bg-black transition-colors"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Filters */}
                        <div className="relative w-40">
                            <div className="absolute -top-4 left-2 bg-white px-1 text-xs text-gray-700 font-medium z-10">
                                <span className="relative top-[1px]">Filters</span>
                            </div>
                            <select
                                value={selectedFilters}
                                onChange={(e) => setSelectedFilters(e.target.value)}
                                className="appearance-none bg-transparent px-3 py-2 pr-8 text-gray-600 text-sm focus:outline-none w-full h-10"
                            >
                                <option value="">Year, Body Type, etc</option>
                                <option value="2024">2024</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-6">
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <a href="#" className="text-blue-600 hover:underline">Home</a>
                    <span className="text-gray-400">›</span>
                    <a href="#" className="text-blue-600 hover:underline">Dubai</a>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-600">Economy Cars</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Cars for Rent in Dubai <span className="text-gray-500 font-normal">• 1,651 Ads</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Sort:</span>
                            <button className="text-gray-900 font-medium">Default</button>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Heart className="w-4 h-4" />
                            Save Search
                        </button>
                    </div>
                </div>

                {/* Car Brands Section */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {carBrands.map((brand) => (
                        <button
                            key={brand.name}
                            className="
                                inline-flex items-center gap-2
                                px-4 py-2 text-xs font-semibold text-blue-600
                                border border-blue-600 rounded-full
                                hover:bg-blue-50 hover:text-blue-700
                                transition-all duration-200
                            "
                            onClick={() => setTempSelectedMake(brand.name)}
                        >
                            {brand.name} ({brand.count})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSection;