'use client';
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, ShieldCheck, CarFront } from "lucide-react";

const categories = [
    {
        name: "HERIT LUXURY",
        count: 993,
        image: "/sam.png",
        features: ["Chauffeur Service", "24/7 Support", "Lounge Access"]
    },
    {
        name: "HEAT SPORTS",
        count: 219,
        image: "/sam.png",
        features: ["Supercar Experience", "Track Day Options"]
    },
    {
        name: "HEAT SUN",
        count: 734,
        image: "/sam.png",
        features: ["Convertible Models", "Beach Delivery"]
    },
    {
        name: "HEAT MONTHLY",
        count: 1610,
        image: "/sam.png",
        features: ["Long-Term Discounts", "Free Maintenance"]
    },
    {
        name: "ECONOMY RENTALS",
        count: 361,
        image: "/sam.png",
        features: ["From AED 99/day", "Fuel Efficient"]
    },
    {
        name: "HEAT SUPERCARS",
        count: 106,
        image: "/sam.png",
        features: ["Limited Editions", "VIP Treatment"]
    },
    {
        name: "LUXURY SUVS",
        count: 287,
        image: "/sam.png",
        features: ["7-Seater Options", "Family Packages"]
    },
    {
        name: "VINTAGE CLASSICS",
        count: 42,
        image: "/sam.png",
        features: ["Photo Shoots", "Special Events"]
    }
];

const CarCategories = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const showAll = visibleCount === categories.length;

    const toggleShowAll = () => {
        setVisibleCount(showAll ? 6 : categories.length);
    };

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Left-Aligned Header */}
                <div className="mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Browse Car Rentals in {" "}
                        <span className="text-[#155dfc] animate-pulse">
                            Dubai
                        </span>
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Select from 2,000+ verified luxury vehicles
                    </p>
                    <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                </div>

                {/* Enhanced Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {categories.slice(0, visibleCount).map((category) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="
                                    flex flex-col h-full
                                    bg-white rounded-2xl shadow-sm
                                    hover:shadow-md hover:border-blue-200
                                    transition-all duration-300
                                    border border-gray-100
                                ">
                                    {/* Image */}
                                    <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-sm">
                                            {category.count}+ Available
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {category.name}
                                        </h3>

                                        {/* Features */}
                                        <ul className="mt-3 space-y-2">
                                            {category.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-600">
                                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                                                        <CarFront className="w-3 h-3 text-blue-600" />
                                                    </div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 pb-6">
                                        <button className="
                                            w-full inline-flex items-center justify-center
                                            px-4 py-2 text-sm font-medium rounded-lg
                                            border border-blue-600 text-blue-600
                                            hover:bg-blue-50 hover:text-blue-700
                                            transition-all duration-200
                                        ">
                                            View Fleet
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More/Less Button - Now Working Properly */}
                {categories.length > 6 && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={toggleShowAll}
                            className="
                                inline-flex items-center gap-2
                                px-5 py-2.5 text-sm font-semibold text-blue-600
                                border border-blue-600 rounded-full
                                hover:bg-blue-50 hover:text-blue-700
                                transition-all duration-200
                            "
                        >
                            {showAll ? "Show Less" : "Show More"}
                            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                )}

                {/* Trust Badge */}
                <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600" /> Verified Rentals
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span>All vehicles inspected and certified</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span>24/7 roadside assistance included</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CarCategories;