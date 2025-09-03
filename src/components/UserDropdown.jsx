"use client";

import React from 'react';
import { User, LogOut } from 'lucide-react';

const UserDropdown = ({ isAuthenticated, isDropdownOpen, setIsDropdownOpen, handleLogout, setIsSignupOpen, setIsLoginOpen, router, setIsMenuOpen }) => {
    return (
        <div className="relative dropdown-container">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
            >
                <User className="w-5 h-5 text-white" />
            </button>
            {isDropdownOpen && (
                <div className={`absolute ${setIsMenuOpen ? 'top-full left-1/2 transform -translate-x-1/2' : 'top-full right-0'} mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] transform transition-all duration-200 ease-out opacity-100 scale-100 ${setIsMenuOpen ? 'origin-top' : 'origin-top-right'}`}>
                    {isAuthenticated ? (
                        <>
                            <a
                                href="/agency"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-150"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsDropdownOpen(false);
                                    if (setIsMenuOpen) setIsMenuOpen(false);
                                    router.push('/agency');
                                }}
                            >
                                Profile
                            </a>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsDropdownOpen(false);
                                    if (setIsMenuOpen) setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-150"
                            >
                                <LogOut className="w-4 h-4 inline mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href="#signup"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-150"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsDropdownOpen(false);
                                    if (setIsMenuOpen) setIsMenuOpen(false);
                                    setIsSignupOpen(true);
                                }}
                            >
                                Sign Up
                            </a>
                            <a
                                href="#login"
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-150"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsDropdownOpen(false);
                                    if (setIsMenuOpen) setIsMenuOpen(false);
                                    setIsLoginOpen(true);
                                }}
                            >
                                Login
                            </a>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDropdown;