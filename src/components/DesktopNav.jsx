"use client";

import React, { useState, useEffect } from "react";
import { MapPin, User, ChevronDown, Car } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useRouter } from "next/navigation";

/* ------------------- Car Brands Dropdown ------------------- */
const CarBrandsDropdown = ({ isOpen, onClose }) => {
    const router = useRouter();

    const carBrands = [
        { name: 'Audi', cars: 10, slug: 'audi', popular: true, luxury: true },
        { name: 'Alfa Romeo', cars: 11, slug: 'alfa_romeo', popular: false, luxury: false },
        { name: 'Aston Martin', cars: 9, slug: 'aston_martin', popular: false, luxury: true },
        { name: 'Bentley', cars: 7, slug: 'bentley', popular: false, luxury: true },
        { name: 'BMW', cars: 19, slug: 'bmw', popular: true, luxury: true },
        { name: 'Cadillac', cars: 16, slug: 'cadillac', popular: false, luxury: true },
        { name: 'Chevrolet', cars: 15, slug: 'chevrolet', popular: true, luxury: false },
        { name: 'Dodge', cars: 11, slug: 'dodge', popular: true, luxury: false },
        { name: 'Ferrari', cars: 9, slug: 'ferrari', popular: false, luxury: true },
        { name: 'Fiat', cars: 11, slug: 'fiat', popular: false, luxury: false },
        { name: 'Ford', cars: 18, slug: 'ford', popular: true, luxury: false },
        { name: 'GMC', cars: 12, slug: 'gmc', popular: false, luxury: false },
        { name: 'Honda', cars: 14, slug: 'honda', popular: true, luxury: false },
        { name: 'Hyundai', cars: 16, slug: 'hyundai', popular: true, luxury: false },
        { name: 'Infiniti', cars: 8, slug: 'infiniti', popular: false, luxury: true },
        { name: 'Jaguar', cars: 6, slug: 'jaguar', popular: false, luxury: true },
        { name: 'Jeep', cars: 13, slug: 'jeep', popular: true, luxury: false },
        { name: 'Lamborghini', cars: 5, slug: 'lamborghini', popular: false, luxury: true },
        { name: 'Land Rover', cars: 12, slug: 'land_rover', popular: true, luxury: true },
        { name: 'Lexus', cars: 11, slug: 'lexus', popular: true, luxury: true },
        { name: 'Maserati', cars: 4, slug: 'maserati', popular: false, luxury: true },
        { name: 'McLaren', cars: 3, slug: 'mclaren', popular: false, luxury: true },
        { name: 'Mercedes', cars: 22, slug: 'mercedes', popular: true, luxury: true },
        { name: 'MINI', cars: 7, slug: 'mini', popular: false, luxury: false },
        { name: 'Nissan', cars: 17, slug: 'nissan', popular: true, luxury: false },
        { name: 'Porsche', cars: 14, slug: 'porsche', popular: true, luxury: true },
        { name: 'Rolls Royce', cars: 3, slug: 'rolls_royce', popular: false, luxury: true },
        { name: 'Tesla', cars: 8, slug: 'tesla', popular: true, luxury: false },
        { name: 'Toyota', cars: 21, slug: 'toyota', popular: true, luxury: false },
        { name: 'Volvo', cars: 9, slug: 'volvo', popular: false, luxury: true },
    ];

    // Sort brands: popular first, then alphabetically
    const sortedBrands = carBrands.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return a.name.localeCompare(b.name);
    });

    // Split into two columns
    const midpoint = Math.ceil(sortedBrands.length / 2);
    const leftColumnBrands = sortedBrands.slice(0, midpoint);
    const rightColumnBrands = sortedBrands.slice(midpoint);

    // Handle brand click
    const handleBrandClick = (brand) => {
        router.push(`/brands/${brand.slug}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 w-[780px] max-h-[80vh] overflow-y-auto bg-white shadow-2xl border border-gray-100 rounded-2xl mt-2 z-50">
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Available Car Brands
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-1.5">
                        {leftColumnBrands.map((brand, index) => (
                            <button
                                key={index}
                                onClick={() => handleBrandClick(brand)}
                                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 w-full text-left group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <img
                                            src={`https://www.oneclickdrive.com/application/views/img/brands_png/v1_${brand.slug}.png?o=2.17`}
                                            alt={`${brand.name} logo`}
                                            className="w-6 h-6 object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden w-6 h-6 items-center justify-center">
                                            <Car className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <span className="font-medium">{brand.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">{brand.cars} cars</span>
                                    {brand.popular && (
                                        <span className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full font-semibold">
                                            Popular
                                        </span>
                                    )}
                                    {brand.luxury && (
                                        <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded-full font-semibold">
                                            Luxury
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-1.5">
                        {rightColumnBrands.map((brand, index) => (
                            <button
                                key={index}
                                onClick={() => handleBrandClick(brand)}
                                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 w-full text-left group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <img
                                            src={`https://www.oneclickdrive.com/application/views/img/brands_png/v1_${brand.slug}.png?o=2.17`}
                                            alt={`${brand.name} logo`}
                                            className="w-6 h-6 object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden w-6 h-6 items-center justify-center">
                                            <Car className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <span className="font-medium">{brand.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">{brand.cars} cars</span>
                                    {brand.popular && (
                                        <span className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full font-semibold">
                                            Popular
                                        </span>
                                    )}
                                    {brand.luxury && (
                                        <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded-full font-semibold">
                                            Luxury
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* View All Brands Link */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => {
                            router.push('/brands');
                            onClose();
                        }}
                        className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                    >
                        View All Car Brands →
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ------------------- Redesigned RentCarDropdown ------------------- */
const RentCarDropdown = ({ isOpen, onClose }) => {
    const router = useRouter();

    const categories = [
        "Economy Cars",
        "Luxury Car Rental Dubai",
        "Sports Car Rental Dubai",
        "Special Edition",
        "Muscle Cars",
        "No Deposit Cars",
        "Electric Cars",
    ];

    const joinOneClickDrive = ["List Your Cars", "Directory"];

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

    // Handle category click
    const handleCategoryClick = (category) => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
        router.push(`/category/${categorySlug}`);
        onClose();
    };

    // Handle body type click
    const handleBodyTypeClick = (bodyType) => {
        const bodyTypeSlug = bodyType.toLowerCase().replace(/\s+/g, '-');
        router.push(`/body-type/${bodyTypeSlug}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 w-[780px] max-h-[80vh] overflow-y-auto bg-white shadow-2xl border border-gray-100 rounded-2xl mt-2 z-50">
            <div className="p-6 grid grid-cols-2 gap-8">
                {/* Left Side: Categories + Join OneClickDrive */}
                <div className="space-y-6 pr-6 border-r border-gray-200">
                    {/* Categories */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                            Categories
                        </h3>
                        <div className="grid grid-cols-1 gap-1.5">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 w-full text-left"
                                >
                                    <span>{category}</span>
                                    {category === "Special Edition" && (
                                        <span className="ml-2 px-2 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-full font-semibold">
                                            New
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Join OneClickDrive */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                            Join OneClickDrive
                        </h3>
                        <div className="space-y-1.5">
                            {joinOneClickDrive.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                    onClick={onClose}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Body Types */}
                <div className="pl-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Body Types
                    </h3>
                    <div className="grid grid-cols-2 gap-1.5">
                        {bodyTypes.map((type, index) => (
                            <button
                                key={index}
                                onClick={() => handleBodyTypeClick(type)}
                                className="px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 w-full text-left"
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ------------------- Main Desktop Navigation ------------------- */
const DesktopNav = ({
    navItems,
    isAuthenticated,
    handleLogout,
    setIsSignupOpen,
    setIsLoginOpen,
    router,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isRentCarOpen, setIsRentCarOpen] = useState(false);
    const [isCarBrandsOpen, setIsCarBrandsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
                setIsDropdownOpen(false);
            }
            if (isRentCarOpen && !event.target.closest(".rent-car-dropdown")) {
                setIsRentCarOpen(false);
            }
            if (isCarBrandsOpen && !event.target.closest(".car-brands-dropdown")) {
                setIsCarBrandsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isRentCarOpen) {
                setIsRentCarOpen(false);
            }
            if (isCarBrandsOpen) {
                setIsCarBrandsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isDropdownOpen, isRentCarOpen, isCarBrandsOpen]);

    return (
        <>
            <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                    <div key={item.name} className="relative rent-car-dropdown car-brands-dropdown">
                        {item.name === "Rent a Car" ? (
                            <button
                                onClick={() => setIsRentCarOpen(!isRentCarOpen)}
                                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 ${item.active || isRentCarOpen
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                                    } group`}
                            >
                                <span>{item.name}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isRentCarOpen ? "rotate-180" : ""
                                        }`}
                                />
                                {(item.active || isRentCarOpen) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                                )}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200"></div>
                            </button>
                        ) : item.name === "Car Brands" ? (
                            <button
                                onClick={() => setIsCarBrandsOpen(!isCarBrandsOpen)}
                                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 ${item.active || isCarBrandsOpen
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                                    } group`}
                            >
                                <span>{item.name}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isCarBrandsOpen ? "rotate-180" : ""
                                        }`}
                                />
                                {(item.active || isCarBrandsOpen) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                                )}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200"></div>
                            </button>
                        ) : (
                            <a
                                href={item.href}
                                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${item.active
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                                    } group`}
                            >
                                {item.name}
                                {item.active && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                                )}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200"></div>
                            </a>
                        )}

                        {item.name === "Rent a Car" && (
                            <RentCarDropdown
                                isOpen={isRentCarOpen}
                                onClose={() => setIsRentCarOpen(false)}
                            />
                        )}

                        {item.name === "Car Brands" && (
                            <CarBrandsDropdown
                                isOpen={isCarBrandsOpen}
                                onClose={() => setIsCarBrandsOpen(false)}
                            />
                        )}
                    </div>
                ))}

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Dubai</span>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">USD</span>
                    </div>
                    <UserDropdown
                        isAuthenticated={isAuthenticated}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        handleLogout={handleLogout}
                        setIsSignupOpen={setIsSignupOpen}
                        setIsLoginOpen={setIsLoginOpen}
                        router={router}
                    />
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
        .rent-car-dropdown,
        .car-brands-dropdown {
          position: relative;
        }
      `}</style>
        </>
    );
};

export default DesktopNav;