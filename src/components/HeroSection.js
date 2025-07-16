"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Shield, Star, Award, Users } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);

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
        { icon: <Shield className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-700" />, text: 'Full Insurance Coverage' },
        { icon: <Star className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-700" />, text: '24/7 Premium Support' },
        { icon: <Award className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-700" />, text: 'Best Price Guarantee' },
        { icon: <Users className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-700" />, text: '50K+ Happy Customers' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            <div className="relative pt-20 lg:pt-24 pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                <span>🎉</span>
                                <span>Special Offer: 20% Off First Rental</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Premium Car Rental in{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Dubai
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Experience luxury and comfort with our premium fleet. From exotic supercars to reliable economy vehicles, find your perfect ride in seconds.
                            </p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 backdrop-blur-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center justify-between pl-3 pr-2 py-2.5 w-40 text-base text-gray-900 font-medium border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <span>{selectedEmirate}</span>
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Search by brand, model, or type..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="flex-1 pl-3 pr-4 py-2.5 bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base placeholder-gray-400 rounded-r-lg"
                                            />
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 w-40 mt-12 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                    {emirates.map((emirate) => (
                                                        <div
                                                            key={emirate}
                                                            onClick={() => {
                                                                setSelectedEmirate(emirate);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="px-3 py-2 text-base text-gray-900 hover:bg-blue-50 cursor-pointer"
                                                        >
                                                            {emirate}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-102 shadow-md">
                                        Find Your Car
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div ref={imageRef}>
                            <Image
                                src="/sam.png"
                                alt="Premium Car"
                                width={800}
                                height={400}
                                className={`mx-auto rounded-lg -mt-20 mb-0 transition-all duration-1000 ease-in-out ${isVisible
                                    ? 'opacity-100 translate-x-0 translate-y-0'
                                    : 'opacity-0 translate-x-20 -translate-y-20'
                                    }`}
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center space-y-3 text-center transition-all duration-300 hover:shadow-lg hover:bg-blue-50/50 hover:rounded-2xl hover:py-4"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600 border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:bg-blue-100">
                                        {feature.icon}
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">{feature.text}</span>
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