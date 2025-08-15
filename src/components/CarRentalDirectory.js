"use client";
import React, { useState } from "react";
import {
    Search,
    Phone,
    MapPin,
    ArrowRight,
    Building2,
    Car,
    Star,
    Clock,
    Shield,
    Users
} from "lucide-react";

const CarRentalDirectory = () => {
    const [searchTerm, searchValue] = useState('');

    const rentalCompanies = [
        {
            id: 1,
            name: "Xcar Rental",
            category: "Car rental",
            address: "Marza Plaza North, 24/1, Festival Boulevard",
            phone: "+971566299...",
            rating: 4.5,
            reviews: 234,
            services: ["Economy Cars", "Luxury Cars", "SUVs"],
            verified: true
        },
        {
            id: 2,
            name: "West Point Rent A Car LLC",
            category: "Car rental",
            description: "Luxury car with chauffeur Economy car with chauffeur Pick and Drop services",
            address: "Danat Al Mamzar Building, 1, 9 Street",
            phone: "+971544353...",
            rating: 4.8,
            reviews: 156,
            services: ["Luxury with Chauffeur", "Economy with Chauffeur", "Pick & Drop"],
            verified: true
        },
        {
            id: 3,
            name: "Dubai Premium Rentals",
            category: "Car rental",
            address: "Sheikh Zayed Road, Business Bay",
            phone: "+971501234...",
            rating: 4.6,
            reviews: 189,
            services: ["Premium Cars", "Sports Cars", "Monthly Rental"],
            verified: true
        },
        {
            id: 4,
            name: "City Car Rental",
            category: "Car rental",
            address: "Al Karama Street, Downtown Dubai",
            phone: "+971507890...",
            rating: 4.3,
            reviews: 98,
            services: ["Budget Cars", "Compact Cars", "Weekly Rental"],
            verified: false
        }
    ];

    const filteredCompanies = rentalCompanies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className=" min-h-screen font-sans">
            <div className="relative py-16 sm:py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')]"></div>
                </div>
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-left">
                        <h1 className="text-5xl lg:text-[36px] font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">
                            Car Rental Companies Directory
                        </h1>
                        <p className="text-base text-left font-regular text-gray-600 leading-relaxed   max-w-3xl ">
                            Explore our exclusive selection of luxury and performance vehicles from the world's most prestigious manufacturers.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            {/* <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder="Search your favorite brands..."
                                            className="w-full px-6 py-4 pl-14 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
                                        />
                                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                                        </div>
                                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-normal transition-all duration-300 hover:shadow-lg active:scale-95">
                                            Search
                                        </button>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[-118px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Company Listings */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredCompanies.map((company, index) => (
                            <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                                <div className="p-6">
                                    {/* Company Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                                                    {company.name}
                                                </h2>
                                                {company.verified && (
                                                    <Shield className="w-5 h-5 text-green-500" />
                                                )}
                                            </div>

                                            {/* Category */}
                                            <div className="flex items-center text-black-50 mb-2">
                                                <Building2 className="w-4 h-4 mr-2" />
                                                <span className="text-sm font-medium">Category: {company.category}</span>
                                            </div>

                                            {/* Description (for companies that have it) */}
                                            {company.description && (
                                                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                                                    {company.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        <div className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">
                                            Verified Provider
                                        </div>
                                    </div>

                                    {/* Services Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {company.services.map((service, idx) => (
                                            <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                                {service}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Address and Contact */}
                                    <div className="space-y-3">
                                        <div className="flex items-start text-black-50">
                                            <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                                            <span className="text-sm">{company.address}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-blue-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <span className="text-sm font-medium">{company.phone}</span>
                                            </div>

                                            <button className="inline-flex items-center text-blue-600 hover:text-blue-600 font-medium text-sm transition-colors">
                                                more info
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredCompanies.length === 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                                <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                                <p className="text-gray-500">Try adjusting your search terms to find what you're looking for.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Call to Action */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Featured CTA Card */}
                            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-xl overflow-hidden shadow-lg text-white">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative p-8">
                                    {/* Car rental imagery or simple content */}
                                    <div className="text-center">
                                        <Car className="w-16 h-16 mx-auto mb-4 opacity-80" />
                                        <h3 className="text-xl font-bold mb-4">Premium Car Rentals in Dubai</h3>
                                        <p className="text-sm opacity-90 mb-6">
                                            Discover the best car rental deals from verified providers across Dubai
                                        </p>
                                    </div>
                                </div>

                                {/* Background decoration */}
                                <div className="absolute -bottom-10 -right-10 opacity-20">
                                    <div className="w-32 h-32 rounded-full bg-white/30"></div>
                                </div>
                                <div className="absolute -top-6 -left-6 opacity-10">
                                    <div className="w-20 h-20 rounded-full bg-white/40"></div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Dubai Car Rental Stats</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Active Companies</span>
                                        <span className="font-semibold text-blue-600">{rentalCompanies.length}+</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Verified Providers</span>
                                        <span className="font-semibold text-green-600">{rentalCompanies.filter(c => c.verified).length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Total Locations</span>
                                        <span className="font-semibold text-gray-900">15+</span>
                                    </div>
                                </div>
                            </div>

                            {/* List Your Business CTA */}
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6 mt-6 text-center">
                                <Users className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-900 mb-2">Own a Car Rental Business?</h4>
                                <p className="text-sm text-gray-600 mb-4">Join our directory and reach thousands of customers</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    List Your Business
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CarRentalDirectory;