"use client";
import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, FileText, ChevronRight, AlertTriangle, Flag, CheckCircle, Shield, Clock, Car, CreditCard, Settings, Users, Package, Fuel, DoorOpen, Star, Heart, X, Bluetooth, Wifi, Navigation, Music, Camera, Snowflake, Sun, Zap, Lock, Wind } from 'lucide-react';

const AirbnbStyleRental = () => {
    const [isHoursOpen, setIsHoursOpen] = useState(false);
    const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);

    const toggleHours = () => {
        setIsHoursOpen(!isHoursOpen);
    };

    const toggleFeaturesModal = () => {
        setIsFeaturesModalOpen(!isFeaturesModalOpen);
    };

    const allFeatures = [
        { icon: Shield, name: "Blind Spot Warning", category: "Safety & Security" },
        { icon: Camera, name: "Touchscreen LCD", category: "Entertainment & Tech" },
        { icon: Music, name: "Premium Audio System", category: "Entertainment & Tech" },
        { icon: Bluetooth, name: "Apple CarPlay", category: "Entertainment & Tech" },
        { icon: Sun, name: "Panoramic Sunroof", category: "Comfort & Convenience" },
        { icon: Camera, name: "3D Surround Camera", category: "Safety & Security" },
        { icon: Snowflake, name: "Temperature Controlled Seats", category: "Comfort & Convenience" },
        { icon: Navigation, name: "GPS Navigation System", category: "Entertainment & Tech" },
        { icon: Wifi, name: "Wi-Fi Hotspot", category: "Entertainment & Tech" },
        { icon: Lock, name: "Keyless Entry & Start", category: "Safety & Security" },
        { icon: Wind, name: "Dual Zone Climate Control", category: "Comfort & Convenience" },
        { icon: Zap, name: "Wireless Charging Pad", category: "Entertainment & Tech" },
        { icon: Shield, name: "Lane Departure Warning", category: "Safety & Security" },
        { icon: Camera, name: "Parking Sensors (Front & Rear)", category: "Safety & Security" },
        { icon: Sun, name: "Ambient Interior Lighting", category: "Comfort & Convenience" }
    ];

    const visibleFeatures = allFeatures.slice(0, 6);

    const groupedFeatures = allFeatures.reduce((acc, feature) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
    }, {});

    const specifications = [
        { label: "Body Type", value: "SUV" },
        { label: "Seating Capacity", value: "4 passengers" },
        { label: "Transmission", value: "Automatic" },
        { label: "Fuel Type", value: "Petrol" },
        { label: "Doors", value: "4" },
        { label: "Luggage Capacity", value: "3 bags" },
        { label: "Daily Mileage", value: "250 km" },
        { label: "Extra Mileage", value: "AED 50/km" }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Side - Main Info */}
                        <div className="flex-1">
                            <h1 className="text-[22px] md:text-[22px] font-[500] text-gray-900 mb-2">
                                Ferrari Purosangue 2025 in Dubai, UAE
                            </h1>
                            <div className="text-black-400 mb-3">
                                SUV • 4 passengers • Auto transmission
                            </div>

                            {/* Rating and Awards */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 flex items-center justify-center">
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Price Card */}
                        <div className="lg:w-96">
                            <div className="border border-gray-300 rounded-xl shadow-lg p-6 sticky top-6">
                                {/* Price Options - Fixed spacing */}
                                <div className="mb-6">
                                    <div className="flex gap-3 mb-4">
                                        <div className="border-2 border-black rounded-lg py-2 px-3 flex-1 text-center bg-gray-900 text-white">
                                            <div className="text-[10px] text-gray-300 line-through mb-0.5">AED 9,999</div>
                                            <div className="text-sm font-semibold">AED 7,499</div>
                                            <div className="text-[10px]">per day</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-lg py-2 px-3 flex-1 text-center bg-gray-100">
                                            <div className="text-xs font-medium text-gray-500">UNAVAILABLE</div>
                                            <div className="text-[10px] text-gray-500">per week</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-lg py-2 px-3 flex-1 text-center bg-gray-100">
                                            <div className="text-xs font-medium text-gray-500">UNAVAILABLE</div>
                                            <div className="text-[10px] text-gray-500">per month</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-sm text-gray-600 mb-4">
                                    You won't be charged yet
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 py-4 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Included mileage limit</span>
                                        <span className="text-gray-900">250 km</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Additional mileage charge</span>
                                        <span className="text-gray-900">AED 50/km</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Security deposit</span>
                                        <span className="text-gray-900">AED 10,000</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold">
                                        <span>Insurance</span>
                                        <span className="text-green-600">Included</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Single Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Main Content */}
                    <div className="flex-1 space-y-8">

                        {/* Host Information */}
                        <div className="py-6 border-b  mt-[-320px] border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">MKV</span>
                                </div>
                                <div>
                                    <h2 className="text-[16px] font-[500] text-gray-900">Rental by MKV Car Rental</h2>
                                    <div className="text-gray-600 text-[14px]">3 years hosting</div>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="py-8 border-b border-gray-200">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Car className="w-6 h-6 text-black mt-1" />
                                    <div>
                                        <div className="font-[500] text-black">Self pickup</div>
                                        <div className="text-gray-600">Check yourself in with the keypad.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Shield className="w-6 h-6 text-black mt-1" />
                                    <div>
                                        <div className="font-[500] text-black">Full insurance coverage</div>
                                        <div className="text-gray-600">Recent customers gave MKV a 5-star rating for service.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-black mt-1" />
                                    <div>
                                        <div className="font-[500] text-black">Available 24/7</div>
                                        <div className="text-gray-600">Flexible pickup and return times to suit your schedule.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="py-8 border-b border-gray-200">
                            <p className="text-black leading-relaxed">
                                Experience the ultimate luxury with our Ferrari Purosangue 2025. This stunning SUV combines Ferrari's legendary performance with practical everyday usability. Perfect for exploring Dubai in style, this vehicle offers an unforgettable driving experience with comprehensive insurance coverage and flexible rental terms.
                            </p>
                        </div>

                        {/* Vehicle Features */}
                        <div className="py-6 border-b border-gray-200">
                            <h2 className="text-xl font-[500] text-gray-900 mb-6">What this car offers</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {visibleFeatures.map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-4 py-3">
                                            <IconComponent className="w-6 h-6 text-black" />
                                            <span className="text-black">{feature.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                onClick={toggleFeaturesModal}
                                className="mt-6 px-6 py-2 bg-[#f2f2f2] rounded-lg text-gray-900 font-medium hover:bg-gray-200 transition-colors"
                            >
                                Show all {allFeatures.length} features
                            </button>
                        </div>

                        {/* Vehicle Specifications - Redesigned */}
                        <div className="py-8 border-b border-gray-200">
                            <h2 className="text-xl font-[500] text-gray-900 mb-6">Vehicle specifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-gray-700 font-medium">{spec.label}</span>
                                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & Actions */}
                    <div className="lg:w-96 space-y-6">
                        {/* Contact Buttons */}
                        <div className="border border-gray-200 rounded-lg p-6 shadow-lg">
                            <h3 className="font-semibold text-gray-900 mb-4 text-center">Contact MKV Car Rental</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </button>

                                <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <div className="text-sm text-blue-700">
                                        <div className="font-medium">Dealer Note</div>
                                        <div>+ 5% VAT applicable. Free Delivery & Pickup in Dubai</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="border border-gray-200 rounded-lg shadow-lg">
                            <button
                                onClick={toggleHours}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">Open Now</div>
                                        <div className="text-sm text-gray-600">Available 24 hours</div>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isHoursOpen ? 'rotate-90' : ''}`} />
                            </button>

                            {isHoursOpen && (
                                <div className="px-4 pb-4 space-y-2 text-sm border-t border-gray-200 pt-4">
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                        <div key={day} className="flex justify-between">
                                            <span className="text-gray-700">{day}</span>
                                            <span className="text-gray-900">Open 24 hours</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Report Listing */}
                        <div className="text-center">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 underline mx-auto">
                                <Flag className="w-4 h-4" />
                                Report this listing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Modal - Improved Background */}
                {isFeaturesModalOpen && (
                    <div className="fixed inset-0 z-50">
                        {/* Professional backdrop with better blur */}
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={toggleFeaturesModal}
                        />

                        {/* Modal container */}
                        <div className="relative flex items-center justify-center min-h-full p-4">
                            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-gray-200 overflow-hidden">
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">What this car offers</h2>
                                    <button
                                        onClick={toggleFeaturesModal}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                                    {Object.entries(groupedFeatures).map(([category, features]) => (
                                        <div key={category} className="mb-8 last:mb-0">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                                {category}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {features.map((feature, index) => {
                                                    const IconComponent = feature.icon;
                                                    return (
                                                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <IconComponent className="w-6 h-6 text-gray-700 flex-shrink-0" />
                                                            <span className="text-gray-900">{feature.name}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AirbnbStyleRental;