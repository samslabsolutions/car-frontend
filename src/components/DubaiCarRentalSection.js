"use client";

import { MapPin, Calendar, Clock, Star, Shield, Award, Users } from 'lucide-react';

const DubaiCarRentalSection = () => {
    const carData = [
        {
            name: "Chevrolet Captiva (Black, 2023)",
            daily: "AED 130",
            weekly: "AED 899",
            monthly: "AED 2,400"
        },
        {
            name: "Hyundai Creta (Blue, 2024)",
            daily: "AED 99",
            weekly: "AED 599",
            monthly: "AED 1,799"
        },
        {
            name: "Mazda CX-5 (Golden, 2025)",
            daily: "AED 139",
            weekly: "AED 959",
            monthly: "AED 2,489"
        },
        {
            name: "MG 3 (White, 2025)",
            daily: "AED 49",
            weekly: "AED 340",
            monthly: "AED 1,225"
        },
        {
            name: "BMW X5 (Silver, 2024)",
            daily: "AED 299",
            weekly: "AED 2,090",
            monthly: "AED 7,999"
        }
    ];

    return (
        <section className="pt-10 pb-16 bg-white font-poppins">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-[26px] font-semibold text-gray-900 mb-4 leading-tight text-left">
                        Economy Vehicle Rentals in <span className="text-blue-600">Dubai</span>
                    </h2>
                    <p className="text-[16px] font-normal text-gray-600  text-left">
                        Experience unmatched comfort and value with our curated collection of premium economy vehicles. Our fleet is designed to offer a perfect blend of affordability, reliability, and style, ensuring you explore Dubai with ease and confidence. Whether you're here for business or leisure, our vehicles provide top-tier features, exceptional fuel efficiency, and a seamless driving experience tailored to your needs.
                    </p>

                </div>

                {/* Availability Section */}
                <div className="mb-16">
                    <div className="mb-8">
                        <h3 className="text-[26px] font-semibold text-gray-900 mb-2 text-left">
                            Current <span className="text-blue-600">Availability</span>
                        </h3>
                        <p className="text-[16px] font-normal text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Updated inventory as of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <div className="mt-4 border-b border-gray-200"></div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Vehicle
                                    </th>
                                    <th className="px-8 py-5 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Daily
                                    </th>
                                    <th className="px-8 py-5 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Weekly
                                    </th>
                                    <th className="px-8 py-5 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Monthly
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {carData.map((car, index) => (
                                    <tr key={index} className="hover:bg-gray-25 transition-colors duration-150">
                                        <td className="px-8 py-6">
                                            <div className="text-[15px] font-medium text-gray-900">
                                                {car.name}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-[16px]  text-gray-900">
                                                {car.daily}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-[16px]  text-gray-900">
                                                {car.weekly}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-[16px]  text-gray-900">
                                                {car.monthly}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {carData.map((car, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-[15px] font-medium text-gray-900 mb-4">
                                    {car.name}
                                </h3>
                                <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-3 rounded-lg">
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Daily</div>
                                        <div className="text-[16px] font-bold text-gray-900">{car.daily}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Weekly</div>
                                        <div className="text-[16px] font-bold text-gray-900">{car.weekly}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monthly</div>
                                        <div className="text-[16px] font-bold text-gray-900">{car.monthly}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-16">
                    {/* Why Choose Section */}
                    <section className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-[26px] font-semibold text-gray-900 mb-6 leading-tight text-left">
                                Why choose our <span className="text-blue-600">premium economy</span> collection
                            </h2>
                            <div className="space-y-4 text-[16px] font-normal text-gray-600 leading-relaxed">
                                <p>
                                    Our premium economy vehicles bridge the gap between standard rentals and luxury cars, offering exceptional comfort and features at accessible price points.
                                </p>
                                <p>
                                    Each vehicle in our collection is hand-selected based on reliability, comfort, and driving experience to ensure you get the best value for your investment.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                            <h3 className="text-[20px] font-semibold text-gray-900 mb-6">What's Included</h3>
                            <div className="space-y-4 text-[16px] font-normal">
                                {[
                                    "Basic insurance coverage",
                                    "24/7 roadside assistance",
                                    "Free airport pickup/drop-off",
                                    "Unlimited mileage"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center font-normal">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <div className="border-b border-gray-200"></div>

                    {/* Process Section */}
                    <section>
                        <div className="mb-12">
                            <h2 className="text-[26px] font-semibold text-gray-900 mb-4 leading-tight text-left">
                                Simple <span className="text-blue-600">booking process</span>
                            </h2>
                            <p className="text-[16px] font-normal text-gray-600  text-left">
                                Get your perfect rental in just three easy steps. Our streamlined booking process is designed for convenience, allowing you to reserve your vehicle quickly and securely from anywhere. With real-time availability, transparent pricing, and dedicated customer support, we make renting a premium economy vehicle in Dubai hassle-free and reliable.
                            </p>

                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Choose Your Vehicle",
                                    description: "Browse our premium collection and select the perfect car for your needs"
                                },
                                {
                                    title: "Book Online",
                                    description: "Complete your reservation with our secure booking system"
                                },
                                {
                                    title: "Enjoy Your Ride",
                                    description: "Pick up your vehicle and start exploring Dubai in comfort"
                                }
                            ].map((step, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-gray-900 mb-3 text-center">{step.title}</h3>
                                    <p className="text-[16px] font-normal text-gray-600 text-center">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section >
    );
};

export default DubaiCarRentalSection;