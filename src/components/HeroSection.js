"use client";
import React, { useState } from 'react';
import { Search, Shield, Star, Award, Users } from 'lucide-react';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const emirates = [
        'Dubai',
        'Abu Dhabi',
        'Sharjah',
        'Ajman',
        'Ras Al Khaimah',
        'Fujairah',
        'Umm Al Quwain',
    ];

    const features = [
        // { icon: <Shield className="w-5 h-5" />, text: 'Full Insurance Coverage' },
        // { icon: <Star className="w-5 h-5" />, text: '24/7 Premium Support' },
        // { icon: <Award className="w-5 h-5" />, text: 'Best Price Guarantee' },
        // { icon: <Users className="w-5 h-5" />, text: '50K+ Happy Customers' },
    ];

    const services = [
        { title: 'Rent a Car', subtitle: 'No Deposit Required' },
        { title: 'Car with Driver', subtitle: 'Professional Service' },
        { title: 'Lease to Own', subtitle: 'Monthly Plans Available' },
        { title: 'Yacht Rentals', subtitle: 'Luxury Experience' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="relative pt-20 lg:pt-24 pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-12">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                <span>🎉</span>
                                <span>Special Offer: 20% Off First Rental</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Premium Car Rental in{' '}
                                <span className="text-[#155dfc] animate-pulse">
                                    {selectedEmirate}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Experience luxury and comfort with our premium fleet. From exotic supercars to reliable economy vehicles, find your perfect ride in seconds.
                            </p>
                        </div>

                        {/* Search Section */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                {/* Search Bar */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="relative flex-1">
                                        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center justify-between pl-4 pr-3 py-3 w-40 text-base text-gray-900 font-medium border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <span>{selectedEmirate}</span>
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    placeholder="Search by brand, model, or type..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:outline-none focus:ring-0 text-base placeholder-gray-400 rounded-r-lg"
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
                                                            className="px-4 py-3 text-base text-gray-900 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                                                        >
                                                            {emirate}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-[#155dfc] hover:bg-[#0f4fd4] text-white px-8 py-3 rounded-lg font-medium text-base transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                                        Search
                                    </button>
                                </div>

                                {/* Service Options */}
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {services.map((service, index) => (
                                            <button
                                                key={index}
                                                className="group text-left p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-100 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                                            >
                                                <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-700 transition-colors duration-300">
                                                    {service.title}
                                                </div>
                                                <div className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                                                    {service.subtitle}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center space-y-3 text-center p-4 transition-all duration-300 hover:shadow-lg hover:bg-blue-50/50 hover:rounded-2xl hover:py-6"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600 border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:bg-blue-100 group-hover:scale-110">
                                        {feature.icon}
                                    </div>
                                    <span className="font-medium text-gray-700 text-sm group-hover:text-blue-700 transition-colors duration-300">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;