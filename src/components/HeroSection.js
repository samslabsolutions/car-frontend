"use client";
import React, { useState } from 'react';
import { Search, Car, Gem, ShoppingCart } from 'lucide-react';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeService, setActiveService] = useState('Rent A Car');

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
        { title: 'Luxury Cars', icon: <Gem className="w-4 h-4" /> },
        { title: 'SUV Cars', icon: <Car className="w-4 h-4" /> },
        { title: 'Buy A Car', icon: <ShoppingCart className="w-4 h-4" /> },
    ];

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
                        <div className="max-w-3xl mx-auto"> {/* Changed from max-w-4xl to max-w-3xl */}
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

                            {/* Search Bar - Narrower version */}
                            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <div className="relative flex-1">
                                        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#155dfc] focus-within:border-[#155dfc] transition-all duration-300">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center justify-between pl-4 pr-3 py-3 w-32 text-sm text-gray-900 font-medium border-r border-gray-200 focus:outline-none hover:bg-[#155dfc]/10 hover:text-[#155dfc] transition-colors duration-200"
                                            >
                                                <span>{selectedEmirate}</span>
                                                <svg className="w-4 h-4 text-gray-500 group-hover:text-[#155dfc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-[#155dfc] w-5 h-5" />
                                                <input
                                                    type="text"
                                                    placeholder="Rent A Car In Dubai"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:outline-none focus:ring-0 text-sm placeholder-gray-400 rounded-r-lg group-hover:placeholder-[#155dfc]/50"
                                                />
                                            </div>
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 w-40 mt-1 top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                    {emirates.map((emirate) => (
                                                        <div
                                                            key={emirate}
                                                            onClick={() => {
                                                                setSelectedEmirate(emirate);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-2 text-sm text-gray-900 hover:bg-[#155dfc]/10 hover:text-[#155dfc] cursor-pointer transition-colors duration-200"
                                                        >
                                                            {emirate}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-[#155dfc] hover:bg-[#0f4fd4] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;