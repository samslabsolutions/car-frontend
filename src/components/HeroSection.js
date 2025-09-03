"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Car, Gem, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
    const [isEmirateDropdownOpen, setIsEmirateDropdownOpen] = useState(false);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [activeService, setActiveService] = useState('Rent A Car');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchContainerRef = useRef(null);

    const emirates = [
        'Dubai',
        'Abu Dhabi',
        'Sharjah',
        'Ajman',
        'Ras Al Khaimah',
        'Fujairah',
        'Umm Al Quwain',
    ];

    const services = [
        { title: 'Rent A Car', icon: <Car className="w-4 h-4" /> },
        { title: 'Luxury Cars', icon: <Gem className="w-4 h-4" />, category: 'Luxury Car Rental Dubai' },
        { title: 'SUV Cars', icon: <Car className="w-4 h-4" />, category: 'SUV Car Rental Dubai' },
        { title: 'Buy A Car', icon: <ShoppingCart className="w-4 h-4" />, category: null },
    ];

    // Fetch suggestions for autocomplete
    const fetchSuggestions = useCallback(
        debounce(async (query, emirate, category) => {
            if (!query || query.trim().length < 2) {
                setSuggestions([]);
                setIsSuggestionsOpen(false);
                return;
            }

            setIsLoadingSuggestions(true);
            setError('');
            try {
                const queryParams = new URLSearchParams();
                if (query) queryParams.append('search', query);
                if (emirate) {
                    const cities = emirates.map(e => e.toLowerCase());
                    if (cities.includes(emirate.toLowerCase())) {
                        queryParams.append('city', emirate);
                    } else {
                        queryParams.append('location', emirate);
                    }
                }
                if (category && category !== 'Buy A Car') {
                    queryParams.append('category', category);
                }
                queryParams.append('limit', '8');

                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public?${queryParams.toString()}`;
                console.log('Suggestions API URL:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('Suggestions API Response:', data);

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch suggestions');
                }

                const transformedSuggestions = data.cars.map(car => ({
                    id: car._id,
                    title: `${car.make} ${car.model} ${car.year}`,
                    price: car.pricing?.daily?.discountedPrice || 0,
                    city: car.city,
                    location: car.location,
                    make: car.make,
                    model: car.model,
                    year: car.year,
                }));

                setSuggestions(transformedSuggestions);
                setIsSuggestionsOpen(transformedSuggestions.length > 0);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'An error occurred while fetching suggestions');
                setSuggestions([]);
                setIsSuggestionsOpen(false);
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 300),
        []
    );

    // Fetch suggestions when searchQuery, selectedEmirate, or activeService changes
    useEffect(() => {
        const selectedService = services.find(s => s.title === activeService);
        const category = selectedService?.category || '';

        if (searchQuery.trim()) {
            fetchSuggestions(searchQuery, selectedEmirate, category);
        } else {
            setSuggestions([]);
            setIsSuggestionsOpen(false);
        }
    }, [searchQuery, selectedEmirate, activeService, fetchSuggestions]);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSuggestionsOpen(false);
                setIsEmirateDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        const selectedService = services.find(s => s.title === activeService);
        const category = selectedService?.category || '';
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (selectedEmirate) {
            const cities = emirates.map(e => e.toLowerCase());
            if (cities.includes(selectedEmirate.toLowerCase())) {
                queryParams.append('city', selectedEmirate);
            } else {
                queryParams.append('location', selectedEmirate);
            }
        }
        if (category && category !== 'Buy A Car') {
            queryParams.append('category', category);
        }
        setIsSuggestionsOpen(false);
        router.push(`/rent?${queryParams.toString()}`);
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        const selectedService = services.find(s => s.title === activeService);
        const category = selectedService?.category || '';
        const queryParams = new URLSearchParams();
        queryParams.append('search', suggestion.title);
        if (suggestion.city || selectedEmirate) {
            const emirate = suggestion.city || selectedEmirate;
            const cities = emirates.map(e => e.toLowerCase());
            if (cities.includes(emirate.toLowerCase())) {
                queryParams.append('city', emirate);
            } else {
                queryParams.append('location', emirate);
            }
        }
        if (category && category !== 'Buy A Car') {
            queryParams.append('category', category);
        }
        setSearchQuery(suggestion.title);
        setIsSuggestionsOpen(false);
        router.push(`/rent?${queryParams.toString()}`);
    };

    return (
        <div className="relative bg-white">
            <div className="relative pt-20 lg:pt-24 pb-18">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-12">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <h1 className="text-[40px] font-bold text-gray-900 leading-tight mt-4">
                                Premium Car Rental in{' '}
                                <span className="text-[#155dfc] hover:text-[#0f4fd4] transition-colors duration-200">{selectedEmirate}</span>
                            </h1>
                            <p className="text-[18px] font-normal text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                Experience luxury and comfort with our premium fleet. From exotic supercars to reliable economy vehicles, find your perfect ride in seconds.
                            </p>
                        </div>

                        {/* Search Section */}
                        <div className="max-w-3xl mx-auto">
                            {/* Service Options with Icons */}
                            <div className="flex justify-center mb-4">
                                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                                    {services.map((service, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveService(service.title)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
                                                ${activeService === service.title
                                                    ? 'bg-[#155dfc] text-white shadow-md hover:bg-[#0f4fd4]'
                                                    : 'text-gray-600 hover:bg-[#155dfc]/10 hover:text-[#155dfc]'}`}
                                        >
                                            {service.icon}
                                            {service.title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="bg-white rounded-xl p-4 border border-gray-200 search-container" ref={searchContainerRef}>
                                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                    <div className="relative flex-1">
                                        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                                            <button
                                                type="button"
                                                onClick={() => setIsEmirateDropdownOpen(!isEmirateDropdownOpen)}
                                                className="flex items-center justify-between pl-4 pr-3 py-3 w-32 text-sm text-gray-900 font-medium border-r border-gray-200 focus:outline-none hover:bg-[#155dfc]/10 hover:text-[#155dfc] transition-colors duration-200"
                                            >
                                                <span>{selectedEmirate}</span>
                                                <svg className="w-4 h-4 text-gray-500 group-hover:text-[#155dfc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {isEmirateDropdownOpen && (
                                                <div className="absolute z-20 w-40 mt-1 top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                    {emirates.map((emirate) => (
                                                        <div
                                                            key={emirate}
                                                            onClick={() => {
                                                                setSelectedEmirate(emirate);
                                                                setIsEmirateDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-2 text-sm text-gray-900 hover:bg-[#155dfc]/10 hover:text-[#155dfc] cursor-pointer transition-colors duration-200"
                                                        >
                                                            {emirate}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-[#155dfc] w-5 h-5" />
                                                <input
                                                    type="text"
                                                    placeholder={`Search ${activeService} in ${selectedEmirate}`}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onFocus={() => {
                                                        if (searchQuery.trim() && suggestions.length > 0) {
                                                            setIsSuggestionsOpen(true);
                                                        }
                                                    }}
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:outline-none focus:ring-0 text-sm placeholder-gray-400 rounded-r-lg"
                                                />

                                                {/* Loading indicator for suggestions */}
                                                {isLoadingSuggestions && (
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#155dfc]"></div>
                                                    </div>
                                                )}

                                                {/* Suggestions Dropdown */}
                                                {isSuggestionsOpen && suggestions.length > 0 && !isLoadingSuggestions && (
                                                    <div className="absolute z-30 w-full mt-1 top-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                                                        <ul className="divide-y divide-gray-100">
                                                            {suggestions.map((suggestion) => (
                                                                <li
                                                                    key={suggestion.id}
                                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                                    className="px-4 py-3 hover:bg-[#155dfc]/5 transition-colors duration-200 cursor-pointer group"
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">

                                                                            <div>
                                                                                <span className="font-medium text-gray-900 group-hover:text-[#155dfc] text-sm">
                                                                                    {suggestion.title}
                                                                                </span>
                                                                                {suggestion.city && (
                                                                                    <div className="text-xs text-gray-500 mt-1">
                                                                                        {suggestion.city}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <div className="font-semibold text-[#155dfc] text-sm">
                                                                                AED {suggestion.price.toLocaleString()}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500">per day</div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* No results message */}
                                                {searchQuery.trim().length >= 2 && !isLoadingSuggestions && suggestions.length === 0 && (
                                                    <div className="absolute z-30 w-full mt-1 top-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                                                        <div className="text-center text-gray-500 text-sm">
                                                            No cars found matching "{searchQuery}"
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#155dfc] hover:bg-[#0f4fd4] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
                                    >
                                        Search
                                    </button>
                                </form>

                                {/* Error message */}
                                {error && (
                                    <div className="mt-2 text-red-600 text-sm text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;