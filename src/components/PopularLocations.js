'use client';
import React from 'react';
import { MapPin } from 'lucide-react';

const PopularLocations = () => {
    const locations = [
        'Abu Dhabi', 'Sharjah', 'Dubai Marina', 'Mall of the Emirates',
        'Dubai Mall', 'International City', 'Business Bay', 'JLT',
        'Al Barsha', 'Deira', 'Al Karama', 'Bur Dubai', 'Ras Al Khaimah',
        'Ajman', 'Al Quoz', 'Al Qusais', 'Al Nahda', 'Discovery Gardens',
        'Silicon Oasis', 'Abu Hail', 'Sheikh Zayed Road', 'JBR',
        'Palm Jumeirah', 'Satwa', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
        'Dubai Airport'
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Aligned Left */}
                <div className="mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Popular <span className="font-extrabold">Locations</span>
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Partnered with top car rental companies across all major areas
                    </p>
                    <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                </div>

                {/* Clean Location Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="p-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-600">
                                    {location}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Styled CTA Button */}
                <div className="text-center mt-12">
                    <button className="
                        inline-flex items-center gap-2
                        px-5 py-2.5 text-sm font-semibold text-blue-600
                        border border-blue-600 rounded-full
                        hover:bg-blue-50 hover:text-blue-700
                        transition-all duration-200
                    ">
                        View All Locations

                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularLocations;