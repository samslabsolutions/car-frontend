"use client";
import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, FileText, ChevronRight, AlertTriangle, Flag, CheckCircle, Shield, Clock, Car, CreditCard, Settings, Users, Package, Fuel, DoorOpen } from 'lucide-react';

const FerrariRentalListing = () => {
    const [isHoursOpen, setIsHoursOpen] = useState(false);

    const toggleHours = () => {
        setIsHoursOpen(!isHoursOpen);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div className="border-b border-gray-100 pb-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-[26px] font-semibold text-gray-900 mb-3">Book the Ferrari Purosangue 2025</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0015.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                                            </svg>
                                            Free Delivery
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            Minimum 1 day rental
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Shield className="w-4 h-4" />
                                            Insurance Included
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 mt-[-19px]">
                                    <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-blue-500/20">
                                        <Phone className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
                                        Call
                                    </button>

                                    <button className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-[#25D366]/20">
                                        <svg
                                            className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                                        </svg>
                                        WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Car Overview */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">CAR OVERVIEW</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Car className="w-5 h-5 text-gray-500" />
                                            Body Type
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <span className="font-medium">SUV</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <AlertTriangle className="w-5 h-5 text-gray-500" />
                                            Salik / Toll Charges
                                        </div>
                                        <span className="font-medium text-gray-900">AED 7</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <FileText className="w-5 h-5 text-gray-500" />
                                            Model
                                        </div>
                                        <span className="font-medium text-gray-900">Purosangue</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Users className="w-5 h-5 text-gray-500" />
                                            Seating Capacity
                                        </div>
                                        <span className="font-medium text-gray-900">4 passengers</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Package className="w-5 h-5 text-gray-500" />
                                            Fits No. of Bags
                                        </div>
                                        <span className="font-medium text-gray-900">3</span>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <CreditCard className="w-5 h-5 text-gray-500" />
                                            Payment Modes
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <span className="font-medium">Credit Card</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Shield className="w-5 h-5 text-gray-500" />
                                            Make
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <span className="font-medium">Ferrari</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Settings className="w-5 h-5 text-gray-500" />
                                            Gearbox
                                        </div>
                                        <span className="font-medium text-gray-900">Auto</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-300">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <DoorOpen className="w-5 h-5 text-gray-500" />
                                            No. of Doors
                                        </div>
                                        <span className="font-medium text-gray-900">4</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3 text-gray-700">
                                            <Fuel className="w-5 h-5 text-gray-500" />
                                            Fuel Type
                                        </div>
                                        <span className="font-medium text-gray-900">Petrol</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features & Specs */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mt-12 mb-6">FEATURES & SPECS</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-base font-medium text-gray-800 mb-4">Technical Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Blind Spot Warning</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Touchscreen LCD</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Premium Audio</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Power Windows</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Seat Belt Reminder</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Apple CarPlay</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Android Auto</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-800 mb-4">Other Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">3D Surround Camera</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Memory Front Seats</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Parking Assist</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Temperature Controlled Seats</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Panoramic Sunroof</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Parking Sensors</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700">Tinted Windows</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mt-12 mb-6">PRICING</h2>
                            <div className="flex flex-col md:flex-row mb-8 gap-6">
                                <div className="border border-gray-200 rounded-lg p-4 w-[150px] text-center bg-[#155DFC] border-blue-200">
                                    <div className="text-xs text-white line-through mb-1">AED 9999</div>
                                    <div className="text-xl font-bold text-white mb-1">AED 7499</div>
                                    <div className="text-xs text-white">/ day</div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 w-[150px] text-center">
                                    <div className="text-lg font-medium text-gray-600 mb-1">UNAVAILABLE</div>
                                    <div className="text-sm text-gray-600">/ week</div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 w-[150px] text-center">
                                    <div className="text-lg font-medium text-gray-600 mb-1">UNAVAILABLE</div>
                                    <div className="text-sm text-gray-600">/ month</div>
                                </div>
                            </div>


                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-700">Included mileage limit</span>
                                    <span className="font-medium text-gray-900">250 km</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-gray-700">Additional mileage charge</span>
                                    <span className="font-medium text-gray-900">AED 50 / km</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center">
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-gray-800">1 day rental available</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-gray-800">Insurance included</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Business Hours */}
                        <div className="border border-gray-200 rounded-lg p-3 mt-2 hover:bg-gray-100">
                            <button
                                onClick={toggleHours}
                                className="flex items-center justify-between w-full mb-4 focus:outline-none"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="font-semibold text-gray-900">Open Now</div>
                                        <div className="text-sm text-gray-600">Today Open 24hrs</div>
                                    </div>
                                </div>
                                <ChevronRight
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isHoursOpen ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {isHoursOpen && (
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Sunday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Monday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Tuesday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Wednesday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Thursday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Friday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-700">Saturday</span>
                                        <span className="text-gray-900">Open 24 hours</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dealer Card */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden ">
                            <div className="bg-gray-50 px-6 py-4 text-center border-b border-gray-200">
                                <div className="text-sm text-gray-600 mb-2">MKV Car Rental</div>
                                <div className="w-16 h-10 mx-auto bg-orange-500 rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">MKV</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 text-center">Book Directly from the Dealer</h3>
                                <div className="flex gap-5 mb-6 justify-center">
                                    <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-blue-500/20">
                                        <Phone className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
                                        Call
                                    </button>

                                    <button className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-[#25D366]/20">
                                        <svg
                                            className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                                        </svg>
                                        WhatsApp
                                    </button>
                                </div>
                                <div className="rounded-lg p-4 mb-6 bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-blue-600">
                                    <div className="flex items-start gap-3">
                                        <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium text-blue mb-1">Dealer Note</div>
                                            <div className="text-sm text-blue">+ 5% VAT applicable. Free Delivery&Pickup in Dubai...</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-800">Dealer's Info & Location</span>
                                        </div>
                                    </button>
                                    <button className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                        <span className="text-gray-800">More Ads by the Dealer</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
                                    <AlertTriangle className="w-4 h-4" />
                                    Disclaimer
                                </button>
                                <button className="bg-gray-100 hover:bgg-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
                                    <Flag className="w-4 h-4" />
                                    Report Listing
                                </button>
                            </div>

                        </div>

                    </div>


                </div>

                <div className="border-gray-100 mt-12 pb-6 w-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Description & Highlights</h2>
                    <p className="text-gray-600 mb-2">Rent and Drive this Ferrari Purosangue 2025-model in Dubai, UAE for AED 7499/day. Rental cost includes basic comprehensive insurance and standard mileage limit of 250 km/day (AED 50 per additional km applicable). Security deposit of AED 10000 is required. Contact MKV Car Rental directly for bookings and inquiries...</p>
                </div>
                <div className="border-gray-100 pb-6 w-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Why hire the Ferrari Purosangue?</h2>
                    <p className="text-gray-600 mb-2">Rent and Drive this Ferrari Purosangue 2025-model in Dubai, UAE for AED 7499/day. Rental cost includes basic comprehensive insurance and standard mileage limit of 250 km/day (AED 50 per additional km applicable). Security deposit of AED 10000 is required. Contact MKV Car Rental directly for bookings and inquiries...</p>
                </div>
            </div>


        </div >
    );
};

export default FerrariRentalListing;