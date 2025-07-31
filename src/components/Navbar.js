"use client";

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, MapPin, Calendar, Clock, Star, Shield, Award, Users } from 'lucide-react';

// Navbar Component
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Rent a Car', href: '#rent', active: true },
        { name: 'Car Brands', href: '#brands' },
        { name: 'Services', href: '#services' },
        { name: 'Lease to Own', href: '#lease' },
        { name: 'Luxury Fleet', href: '#luxury' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
            }`}>
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Sameel
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${item.active
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                                    } group`}
                            >
                                {item.name}
                                {item.active && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                                )}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200"></div>
                            </a>
                        ))}
                    </div>

                    {/* Location & Language */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Dubai</span>
                        </div>
                        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">USD</span>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
                    <div className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${item.active
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="border-t pt-3 mt-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">Dubai</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">USD</span>
                            </div>
                            <button className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;