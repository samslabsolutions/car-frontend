"use client";
import React, { useState } from "react";
import {
    ArrowUpRight,
    Car,
    Search,
    Star,
    ShieldCheck,
    TrendingUp,
    Zap,
    Calendar,
    MapPin,
    Users,
    BadgeCheck,
} from "lucide-react";

const VehicleJourneySection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const carBrands = [
        { name: "Audi", cars: 10, slug: "audi", popular: true, luxury: true },
        { name: "Alfa Romeo", cars: 11, slug: "alfa_romeo", popular: false, luxury: false },
        { name: "Aston Martin", cars: 9, slug: "aston_martin", popular: false, luxury: true },
        { name: "Bentley", cars: 7, slug: "bentley", popular: false, luxury: true },
        { name: "BMW", cars: 19, slug: "bmw", popular: true, luxury: true },
        { name: "Cadillac", cars: 16, slug: "cadillac", popular: false, luxury: true },
        { name: "Chevrolet", cars: 15, slug: "chevrolet", popular: true, luxury: false },
        { name: "Dodge", cars: 11, slug: "dodge", popular: true, luxury: false },
        { name: "Ferrari", cars: 9, slug: "ferrari", popular: false, luxury: true },
        { name: "Fiat", cars: 11, slug: "fiat", popular: false, luxury: false },
        { name: "Ford", cars: 18, slug: "ford", popular: true, luxury: false },
        { name: "GMC", cars: 12, slug: "gmc", popular: false, luxury: false },
        { name: "Honda", cars: 14, slug: "honda", popular: true, luxury: false },
        { name: "Hyundai", cars: 16, slug: "hyundai", popular: true, luxury: false },
        { name: "Infiniti", cars: 8, slug: "infiniti", popular: false, luxury: true },
        { name: "Jaguar", cars: 6, slug: "jaguar", popular: false, luxury: true },
        { name: "Jeep", cars: 13, slug: "jeep", popular: true, luxury: false },
        { name: "Lamborghini", cars: 5, slug: "lamborghini", popular: false, luxury: true },
        { name: "Land Rover", cars: 12, slug: "land_rover", popular: true, luxury: true },
        { name: "Lexus", cars: 11, slug: "lexus", popular: true, luxury: true },
        { name: "Maserati", cars: 4, slug: "maserati", popular: false, luxury: true },
        { name: "McLaren", cars: 3, slug: "mclaren", popular: false, luxury: true },
        { name: "Mercedes", cars: 22, slug: "mercedes", popular: true, luxury: true },
        { name: "MINI", cars: 7, slug: "mini", popular: false, luxury: false },
        { name: "Nissan", cars: 17, slug: "nissan", popular: true, luxury: false },
        { name: "Porsche", cars: 14, slug: "porsche", popular: true, luxury: true },
        { name: "Rolls Royce", cars: 3, slug: "rolls_royce", popular: false, luxury: true },
        { name: "Tesla", cars: 8, slug: "tesla", popular: true, luxury: false },
        { name: "Toyota", cars: 21, slug: "toyota", popular: true, luxury: false },
        { name: "Volvo", cars: 9, slug: "volvo", popular: false, luxury: true },
    ];

    const handleCardClick = (brand) => {
        console.log(`Clicked on ${brand.name}`);
        // Add your navigation logic here
    };

    const filteredBrands = carBrands
        .filter((brand) => brand.name.toLowerCase().includes(searchValue.toLowerCase()))
        .sort((a, b) => {
            if (a.popular && !b.popular) return -1;
            if (!a.popular && b.popular) return 1;
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative py-16 sm:py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')]"></div>
                </div>
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-[36px] font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">
                            Premium Car Brands Collection
                        </h1>
                        <p className="text-base font-regular text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                            Explore our exclusive selection of luxury and performance vehicles from the world's most prestigious manufacturers.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative group">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Car Brands Section */}
            <div className="mt-[-68px]">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8"></div>

                    {/* Brands Grid */}
                    <div className="py-6 lg:py-1">
                        {filteredBrands.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                                <p className="text-base font-regular text-gray-500 max-w-md mx-auto">
                                    We couldn't find any brands matching your search. Try a different term.
                                </p>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-normal"
                                    onClick={() => setSearchValue("")}
                                >
                                    Reset Search
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
                                {filteredBrands.map((brand, index) => (
                                    <div
                                        key={brand.slug}
                                        className={`
                      relative group shadow-md rounded-xl cursor-pointer bg-white border border-gray-200 hover:border-blue-600
                      transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1
                      w-full h-[140px] sm:h-[160px] lg:h-[180px]
                      ${hoveredCard === index ? "border-blue-600 shadow-lg -translate-y-1" : ""}
                    `}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        onClick={() => handleCardClick(brand)}
                                    >
                                        <div className="p-3 sm:p-4 text-center flex flex-col justify-center h-full">
                                            <div className="mb-1 sm:mb-2 flex justify-center">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                                                    <img
                                                        src={`https://www.oneclickdrive.com/application/views/img/brands_png/v1_${brand.slug}.png?o=2.17`}
                                                        alt={`${brand.name} logo`}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                            e.target.nextElementSibling.style.display = "flex";
                                                        }}
                                                    />
                                                    <div className="hidden w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 items-center justify-center">
                                                        <Car className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-0.5 sm:space-y-1">
                                                <h3 className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 leading-tight">
                                                    {brand.name}
                                                </h3>
                                                <p className="text-sm font-normal text-gray-600">{brand.cars} vehicles</p>
                                            </div>

                                            <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
                            Why Choose Our Car Rental Service
                        </h2>
                        <p className="text-base font-regular text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            We provide exceptional service with a fleet of premium vehicles to meet all your transportation needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Booking</h3>
                            <p className="text-base font-regular text-gray-600">
                                Reserve your vehicle in seconds with our streamlined booking process.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Flexible Rental Periods</h3>
                            <p className="text-base font-regular text-gray-600">
                                Rent by the hour, day, week, or month - whatever suits your schedule.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-green-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Full Insurance Coverage</h3>
                            <p className="text-base font-regular text-gray-600">
                                Comprehensive protection for complete peace of mind during your rental.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
                            A Vehicle for Every Journey
                        </h2>
                        <div className="max-w-4xl">
                            <p className="text-base font-regular text-gray-600 leading-relaxed mb-6">
                                Whether you're a resident embarking on a daily commute, a business traveler on a brief visit, or a tourist exploring the vastness of Dubai, we have a car that fits your style and purpose. All our users, hailing from nearby Arab countries or the expanse of Europe, find in us a trusted partner who understands their need for a seamless rental experience.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    Customer Satisfaction
                                </h4>
                                <p className="text-sm font-normal text-blue-700">
                                    98% of our customers rate their experience as excellent, with particular praise for our vehicle condition and customer service.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl overflow-hidden h-64 sm:h-80 lg:h-96">
                        <img
                            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww"
                            alt="Luxury cars"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
                            Driven by Trends and Preferences
                        </h2>
                        <div className="max-w-4xl">
                            <p className="text-base font-light text-gray-600 leading-relaxed mb-6">
                                Our insights into rental trends in Dubai reveal distinct patterns: adrenaline enthusiasts and luxury seekers tend to opt for high-end rentals for short-term exhilaration, while those seeking value in economy rentals choose longer-term hires. No matter the brand you cherish, we have the keys ready for you.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                                        <TrendingUp className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-normal text-gray-700">Luxury rentals up 35% year-over-year</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                                        <TrendingUp className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-normal text-gray-700">Electric vehicle demand growing at 50% annually</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-sm font-normal text-gray-700">90% customer retention rate for corporate clients</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="order-2 md:order-1 bg-gray-100 rounded-xl overflow-hidden h-64 sm:h-80 lg:h-96">
                        <img
                            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Car trends"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
                        Your Favorite Brands at Competitive Prices
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-base font-regular text-gray-600 leading-relaxed mb-8">
                            Discover the finest cars from BMW, Mercedes-Benz, Audi, and more, all available at competitive rates. Whether you're seeking a sophisticated sedan for business, a robust SUV for adventure, or an eco-friendly compact for city driving, our platform connects you with the perfect match.
                        </p>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-normal transition-all duration-300 hover:shadow-lg active:scale-95 inline-flex items-center">
                            Explore All Vehicles
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleJourneySection;