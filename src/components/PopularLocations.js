'use client';
import React, { useState } from 'react';

const PopularLocations = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showAll, setShowAll] = useState(false);

    // Organized locations by categories
    const locationCategories = {
        all: [
            {
                title: 'Major Cities',
                locations: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Fujairah', 'Umm Al Quwain', 'Al Ain']
            },
            {
                title: 'Dubai Areas',
                locations: ['Dubai Marina', 'Business Bay', 'JLT', 'Al Barsha', 'Deira', 'Al Karama', 'Bur Dubai']
            },
            {
                title: 'Shopping & Landmarks',
                locations: ['Mall of the Emirates', 'Dubai Mall', 'Sheikh Zayed Road', 'JBR', 'Palm Jumeirah', 'Dubai Airport']
            },
            {
                title: 'Residential Communities',
                locations: ['International City', 'Al Quoz', 'Al Qusais', 'Al Nahda', 'Discovery Gardens', 'Silicon Oasis', 'Abu Hail', 'Satwa']
            }
        ],
        cities: [
            {
                title: 'Major Cities',
                locations: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Fujairah', 'Umm Al Quwain', 'Al Ain']
            }
        ],
        dubai: [
            {
                title: 'Dubai Districts',
                locations: ['Dubai Marina', 'Business Bay', 'JLT', 'Al Barsha', 'Deira', 'Al Karama', 'Bur Dubai', 'Al Quoz', 'Al Qusais', 'Al Nahda', 'Discovery Gardens', 'Silicon Oasis', 'Abu Hail', 'Satwa']
            }
        ],
        shopping: [
            {
                title: 'Shopping & Landmarks',
                locations: ['Mall of the Emirates', 'Dubai Mall', 'Sheikh Zayed Road', 'JBR', 'Palm Jumeirah', 'Dubai Airport']
            }
        ]
    };

    const tabs = [
        { id: 'all', label: 'All Areas' },
        { id: 'cities', label: 'Major Cities' },
        { id: 'dubai', label: 'Dubai Districts' },
        { id: 'shopping', label: 'Shopping Areas' }
    ];

    // Reset showAll when switching tabs
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (tabId !== 'all') {
            setShowAll(true); // Always show all content for non-"All Areas" tabs
        } else {
            setShowAll(false); // Reset to collapsed state for "All Areas"
        }
    };

    const getDisplayedCategories = () => {
        const categories = locationCategories[activeTab];

        if (activeTab === 'all') {
            return showAll ? categories : categories.slice(0, 2); // Show first 2 categories when collapsed
        }

        return categories; // For other tabs, always show all
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Popular <span className="font-extrabold">Locations</span>
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Partnered with top car rental companies across all major areas
                    </p>
                    <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id
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

                {/* Location Categories Grid */}
                <div className="space-y-8">
                    {getDisplayedCategories().map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {category.locations.map((location, index) => (
                                    <button
                                        key={index}
                                        className="text-left p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 group border border-transparent hover:border-blue-200"
                                    >
                                        <div className="font-medium text-gray-700 group-hover:text-blue-600 text-sm">
                                            {location}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            UAE
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More/Less Button - Only for "All Areas" tab */}
                {activeTab === 'all' && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        >
                            {showAll ? 'Show less' : 'Show more'}
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularLocations;