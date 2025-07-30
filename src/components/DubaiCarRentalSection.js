import React from 'react';

const DubaiCarRentalSection = () => {
    const carData = [
        {
            name: "Chevrolet Captiva (Black, 2023)",
            daily: "AED 130",
            weekly: "-",
            monthly: "AED 2,400",
            features: ["5 Seats", "Automatic", "Premium Sound"],
            badge: "Most Popular"
        },
        {
            name: "Hyundai Creta (Blue, 2024)",
            daily: "AED 99",
            weekly: "AED 599",
            monthly: "AED 1,799",
            features: ["5 Seats", "Sunroof", "Keyless Entry"]
        },
        {
            name: "Mazda CX-5 (Golden, 2025)",
            daily: "AED 139",
            weekly: "-",
            monthly: "AED 2,489",
            features: ["Leather Seats", "Heads-Up Display", "Bose Audio"],
            badge: "New Model"
        },
        {
            name: "MG 3 (White, 2025)",
            daily: "AED 49",
            weekly: "AED 340",
            monthly: "AED 1,225",
            features: ["Fuel Efficient", "Compact", "City Package"]
        }
    ];

    return (
        <div className="w-full px-9 py-14 bg-white">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
                h2, h3, p, span, blockquote {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            {/* Premium Header */}
            <div className="mb-16 border-b border-gray-100 pb-10">
                {/* <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4 inline-block">
                    Exclusive Selection
                </span> */}
                <h2 className="text-[26px] font-light text-gray-900 mb-6 leading-tight">
                    Premium <span className="font-medium">Economy Vehicle</span><br />
                    Rentals in <span className="font-medium">Dubai</span>
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                    Experience unmatched comfort and value with our curated collection of premium economy vehicles,
                    available for short-term and extended rentals.
                </p>
            </div>

            {/* Luxury Pricing Table */}
            <div className="mb-24">
                <div className="mb-8">
                    <h2 className="text-[26px] font-light text-gray-900 mb-2">
                        Current <span className="font-medium">Availability</span>
                    </h2>
                    <p className="text-base text-gray-600">
                        Updated inventory as of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Premium Table */}
                <div className="max-w-4xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-6 px-4 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">
                                    Vehicle Details
                                </th>
                                <th className="pb-6 px-4 text-right font-medium text-gray-500 uppercase tracking-wider text-xs">
                                    Daily
                                </th>
                                <th className="pb-6 px-4 text-right font-medium text-gray-500 uppercase tracking-wider text-xs">
                                    Weekly
                                </th>
                                <th className="pb-6 px-4 text-right font-medium text-gray-500 uppercase tracking-wider text-xs">
                                    Monthly
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {carData.map((car, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-8 px-4">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="text-[20px] font-medium text-gray-900">
                                                        {car.name}
                                                    </h3>
                                                    {car.badge && (
                                                        <span className={`ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${car.badge.includes("Popular") ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                                                            {car.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {car.features.map((feature, i) => (
                                                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4 text-right">
                                        <div className="text-gray-900 font-medium">{car.daily}</div>
                                        <div className="text-gray-500 text-xs mt-1">per day</div>
                                    </td>
                                    <td className="py-8 px-4 text-right">
                                        {car.weekly !== "-" ? (
                                            <>
                                                <div className="text-gray-900 font-medium">{car.weekly}</div>
                                                <div className="text-gray-500 text-xs mt-1">per week</div>
                                            </>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="py-8 px-4 text-right">
                                        <div className="text-gray-900 font-medium">{car.monthly}</div>
                                        <div className="text-gray-500 text-xs mt-1">per month</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Editorial Content - Left Aligned */}
            <div className="space-y-16">
                {/* Experience Section */}
                <section>
                    {/* <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4 inline-block">
                        The Experience
                    </span> */}
                    <h2 className="text-[26px] font-light text-gray-900 mb-6">
                        Why choose our <span className="font-medium">premium economy</span> collection
                    </h2>
                    <div className="prose text-base text-gray-600">
                        <p>
                            Our premium economy vehicles bridge the gap between standard rentals and luxury cars, offering
                            exceptional comfort and features at accessible price points. Each vehicle in our collection is
                            hand-selected based on reliability, comfort, and driving experience.
                        </p>
                        <p>
                            We understand that discerning clients expect more than just transportation - they seek an
                            experience that begins the moment they make their reservation and continues through every
                            kilometer of their journey.
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section>
                    <div className="space-y-8">
                        <div className="border-l border-gray-300 pl-6">
                            <h3 className="text-[20px] font-medium text-gray-900 mb-4">Included Benefits</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">Complimentary airport meet & greet</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">24/7 VIP concierge support</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">Premium insurance coverage</span>
                                </li>
                            </ul>
                        </div>
                        <div className="border-l border-gray-300 pl-6">
                            <h3 className="text-[20px] font-medium text-gray-900 mb-4">Optional Upgrades</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">Unlimited mileage package</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">Child safety seats</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">GPS navigation systems</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="bg-gray-50 p-8 rounded-xl">
                    <div className="flex items-start">
                        <svg className="w-8 h-8 text-gray-400 mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <blockquote className="text-base text-gray-700 italic mb-6">
                                "The attention to detail in both vehicle preparation and customer service sets this service apart. My premium economy rental felt like a luxury experience from start to finish."
                            </blockquote>
                            <div className="font-medium">
                                <p className="text-base text-gray-900">Sarah Al-Farsi</p>
                                <p className="text-sm text-gray-500">Corporate Client</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section>
                    {/* <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4 inline-block">
                        Our Process
                    </span> */}
                    <h2 className="text-[26px] font-light text-gray-900 mb-12">
                        Seamless <span className="font-medium">rental experience</span>
                    </h2>

                    <div className="space-y-12">
                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                    1
                                </div>
                                <div className="w-px h-full bg-gray-300 mt-2"></div>
                            </div>
                            <div className="pb-12">
                                <h3 className="text-[20px] font-medium text-gray-900 mb-3">Personal Consultation</h3>
                                <p className="text-base text-gray-700">
                                    Our specialists will guide you through vehicle selection based on your specific needs,
                                    preferences, and itinerary to ensure the perfect match.
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                    2
                                </div>
                                <div className="w-px h-full bg-gray-300 mt-2"></div>
                            </div>
                            <div className="pb-12">
                                <h3 className="text-[20px] font-medium text-gray-900 mb-3">Paperless Documentation</h3>
                                <p className="text-base text-gray-700">
                                    Complete all paperwork electronically prior to arrival. We verify all documents in advance
                                    to ensure a quick and efficient collection process.
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                    3
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[20px] font-medium text-gray-900 mb-3">White Glove Delivery</h3>
                                <p className="text-base text-gray-700">
                                    Choose your preferred delivery location and time. Our representative will personally
                                    introduce you to your vehicle and all its features.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DubaiCarRentalSection;