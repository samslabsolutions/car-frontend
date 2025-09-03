"use client";

import React, { useState } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import UserDropdown from "./UserDropdown";

const MobileNav = ({
    navItems,
    isMenuOpen,
    setIsMenuOpen,
    isAuthenticated,
    handleLogout,
    setIsSignupOpen,
    setIsLoginOpen,
    router,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);

    const categories = [
        "Economy Cars",
        "Luxury Car Rental Dubai",
        "Sports Car Rental Dubai",
        "Special Edition",
        "Muscle Cars",
        "No Deposit Cars",
        "Electric Cars",
    ];

    const bodyTypes = [
        "SUV",
        "Crossover",
        "Sedan",
        "Convertible",
        "Compact",
        "Van",
        "Hatchback",
        "Coupe",
        "Special Needs",
        "Hybrid",
        "Pickup Truck",
        "Bus",
    ];

    const joinOneClickDrive = ["List Your Cars", "Directory"];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Menu Content */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-[55] max-h-[85vh] overflow-y-auto">
                    <div className="px-4 py-4 space-y-4">
                        {/* Navigation Items */}
                        {navItems.map((item) =>
                            item.name === "Rent a Car" ? (
                                <div key={item.name} className="border rounded-lg">
                                    <button
                                        onClick={() => toggleSection("rent")}
                                        className="flex w-full items-center justify-between px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${expandedSection === "rent" ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Expandable Rent a Car Section */}
                                    {expandedSection === "rent" && (
                                        <div className="px-3 pb-3 space-y-4">
                                            {/* Categories */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                    Categories
                                                </h3>
                                                <div className="space-y-1">
                                                    {categories.map((category, index) => (
                                                        <a
                                                            key={index}
                                                            href="#"
                                                            className="block px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {category}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t"></div>

                                            {/* Body Types */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                    Body Types
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {bodyTypes.map((type, index) => (
                                                        <a
                                                            key={index}
                                                            href="#"
                                                            className="px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {type}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t"></div>

                                            {/* Join OneClickDrive */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                    Join OneClickDrive
                                                </h3>
                                                <div className="space-y-1">
                                                    {joinOneClickDrive.map((item, index) => (
                                                        <a
                                                            key={index}
                                                            href="#"
                                                            className="block px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {item}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${item.active
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            )
                        )}

                        {/* Footer Section */}
                        <div className="border-t pt-4 mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Dubai
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">USD</span>
                            </div>
                            <div className="flex justify-center">
                                <UserDropdown
                                    isAuthenticated={isAuthenticated}
                                    isDropdownOpen={isDropdownOpen}
                                    setIsDropdownOpen={setIsDropdownOpen}
                                    handleLogout={handleLogout}
                                    setIsSignupOpen={setIsSignupOpen}
                                    setIsLoginOpen={setIsLoginOpen}
                                    router={router}
                                    setIsMenuOpen={setIsMenuOpen}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNav;
