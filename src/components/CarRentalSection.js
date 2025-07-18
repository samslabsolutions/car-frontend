"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    { name: "HERIT LUXURY", count: 993, image: "/sam.png" },
    { name: "HEAT SPORTS", count: 219, image: "/sam.png" },
    { name: "HEAT SUN", count: 734, image: "/sam.png" },
    { name: "HEAT MONTHLY", count: 1610, image: "/sam.png" },
    { name: "CHEAP RENT A CAR", count: 361, image: "/sam.png" },
    { name: "HEAT SUPERCARS", count: 106, image: "/sam.png" },
    { name: "HEAT CONVERTIBLE", count: 160, image: "/sam.png" },
    { name: "HEAT ELECTRIC", count: 18, image: "/sam.png" },
    { name: "CAR WITH DRIVER", count: 59, image: "/sam.png" },
    { name: "ACHI RENTALS", count: 58, image: "/sam.png", suffix: "Boats" }
];

const CarCategories = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleCategories = showAll ? categories : categories.slice(0, 6);

    // Animation variants for category items
    const categoryVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
    };

    return (
        <section className="py-10 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-13">
                    Browse Car Rentals in{" "}
                    <span className="text-[#155dfc] animate-pulse">
                        Dubai
                    </span>
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {visibleCategories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                variants={categoryVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col items-center"
                            >
                                {/* Image with hover effect */}
                                <div className="relative w-full h-40 mb-2 rounded-md overflow-hidden group">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text */}
                                <div className="text-center w-full">
                                    <h3 className="text-base font-semibold text-black">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-black">
                                        {category.count} {category.suffix || "Cars"}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-[#155dfc] hover:bg-[#0f4fd4] text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    >
                        {showAll ? "See Less" : "See More"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CarCategories;