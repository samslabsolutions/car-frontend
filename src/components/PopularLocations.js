'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AirbnbGetawaySection = () => {
    const [activeTab, setActiveTab] = useState('major-cities');
    const [showMore, setShowMore] = useState(false);

    const locationCategories = {
        'major-cities': [
            'Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman',
            'Fujairah', 'Umm Al Quwain', 'Al Ain'
        ],
        'dubai-districts': [
            'Dubai Marina', 'Business Bay', 'JLT', 'Al Barsha', 'Deira',
            'Al Karama', 'Bur Dubai', 'Al Quoz', 'Al Qusais', 'Al Nahda',
            'Discovery Gardens', 'Silicon Oasis', 'Abu Hail', 'Satwa',
            'Mall of the Emirates', 'Dubai Mall', 'Sheikh Zayed Road',
            'JBR', 'Palm Jumeirah', 'Dubai Airport'
        ]
    };

    const tabs = [
        { id: 'major-cities', label: 'All Cities' },
        { id: 'dubai-districts', label: 'All Locations' }
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setShowMore(false);
    };

    const getDisplayedLocations = () => {
        const locations = locationCategories[activeTab] || [];
        return showMore ? locations : locations.slice(0, 8);
    };

    const displayedLocations = getDisplayedLocations();

    return (
        <section className="py-16 bg-white mt:112px">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-[26px] font-bold text-gray-900">
                        Popular Locations
                    </h2>
                    <p className="mt-2 text-[16px] text-gray-600">
                        Discover unique places to stay across the UAE
                    </p>
                    <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Locations */}
                <div className="flex flex-wrap gap-4">
                    {displayedLocations.map((location, index) => (
                        <button
                            key={index}
                            className="
                                text-left px-4 py-2 bg-gray-50
                                hover:bg-blue-50 rounded border border-transparent
                                hover:border-blue-200 transition-colors duration-200
                                text-sm font-medium text-gray-900 hover:text-blue-600
                            "
                        >
                            {location}
                        </button>
                    ))}

                    {locationCategories[activeTab].length > 8 && (
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline px-4 py-2"
                        >
                            <span>{showMore ? 'Show less' : 'Show more'}</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
                            />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AirbnbGetawaySection;
