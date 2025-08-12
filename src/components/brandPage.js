"use client";
import React, { useState } from 'react';
import { ArrowUpRight, Car, Search } from 'lucide-react';

const VehicleJourneySection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const carBrands = [
        { name: 'Audi', cars: 10, slug: 'audi' },
        { name: 'Alfa Romeo', cars: 11, slug: 'alfa_romeo' },
        { name: 'Aston Martin', cars: 9, slug: 'aston_martin' },
        { name: 'Bentley', cars: 7, slug: 'bentley' },
        { name: 'BMW', cars: 19, slug: 'bmw' },
        { name: 'Cadillac', cars: 16, slug: 'cadillac' },
        { name: 'Chevrolet', cars: 15, slug: 'chevrolet' },
        { name: 'Dodge', cars: 11, slug: 'dodge' },
        { name: 'Ferrari', cars: 9, slug: 'ferrari' },
        { name: 'Fiat', cars: 11, slug: 'fiat' },
        { name: 'Ford', cars: 18, slug: 'ford' },
        { name: 'GMC', cars: 12, slug: 'gmc' },
        { name: 'Honda', cars: 14, slug: 'honda' },
        { name: 'Hyundai', cars: 16, slug: 'hyundai' },
        { name: 'Infiniti', cars: 8, slug: 'infiniti' },
        { name: 'Jaguar', cars: 6, slug: 'jaguar' },
        { name: 'Jeep', cars: 13, slug: 'jeep' },
        { name: 'Lamborghini', cars: 5, slug: 'lamborghini' },
        { name: 'Land Rover', cars: 12, slug: 'land_rover' },
        { name: 'Lexus', cars: 11, slug: 'lexus' },
        { name: 'Maserati', cars: 4, slug: 'maserati' },
        { name: 'McLaren', cars: 3, slug: 'mclaren' },
        { name: 'Mercedes', cars: 22, slug: 'mercedes' },
        { name: 'MINI', cars: 7, slug: 'mini' },
        { name: 'Nissan', cars: 17, slug: 'nissan' },
        { name: 'Porsche', cars: 14, slug: 'porsche' },
        { name: 'Rolls Royce', cars: 3, slug: 'rolls_royce' },
        { name: 'Tesla', cars: 8, slug: 'tesla' },
        { name: 'Toyota', cars: 21, slug: 'toyota' },
        { name: 'Volvo', cars: 9, slug: 'volvo' }
    ];

    const handleCardClick = (brand) => {
        console.log(`Clicked on ${brand.name}`);
        // Add your navigation logic here
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Car Brands Section */}
            <div className="py-15">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header - Centered */}
                    <div className="py-8 sm:py-10 lg:py-12">
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[600] text-gray-900 mb-4 sm:mb-5 tracking-tight">
                                Premium Car Brands
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
                                Explore our curated collection of automotive excellence
                            </p>

                            {/* Beautiful Search Bar */}
                            <div className="max-w-md mx-auto">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder="Search your favorite brands..."
                                            className="w-full px-6 py-4 pl-14 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500 text-base shadow-lg hover:shadow-xl"
                                        />
                                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                                        </div>
                                        {/* Search button */}
                                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brands Grid - Fully Responsive */}
                    <div className="py-6 lg:py-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
                            {carBrands.map((brand, index) => (
                                <div
                                    key={brand.slug}
                                    className={`
                                        relative group shadow-md rounded-xl cursor-pointer bg-white border border-gray-200 hover:border-blue-600
                                        transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1
                                        w-full h-[140px] sm:h-[160px] lg:h-[180px]
                                        ${hoveredCard === index ? 'border-blue-600 shadow-lg -translate-y-1' : ''}
                                    `}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => handleCardClick(brand)}
                                >
                                    {/* Card Content - Responsive Padding and Sizes */}
                                    <div className="p-3 sm:p-4 text-center flex flex-col justify-center h-full">
                                        {/* Logo - Responsive Size */}
                                        <div className="mb-1 sm:mb-2 flex justify-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                                                <img
                                                    src={`https://www.oneclickdrive.com/application/views/img/brands_png/v1_${brand.slug}.png?o=2.17`}
                                                    alt={`${brand.name} logo`}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 items-center justify-center">
                                                    <Car className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Brand Info - Responsive Text */}
                                        <div className="space-y-0.5 sm:space-y-1">
                                            <h3 className="text-xs sm:text-sm lg:text-base font-[500] text-gray-900 leading-tight">
                                                {brand.name}
                                            </h3>
                                            <p className="text-gray-600 text-xs sm:text-xs lg:text-xs">
                                                {brand.cars} vehicles
                                            </p>
                                        </div>

                                        {/* Hover Arrow - Responsive Position and Size */}
                                        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-2">
                {/* A Vehicle for Every Journey */}
                <div className="mb-10 sm:mb-10">
                    <h2 className="text-[26px] font-[600] text-gray-900 mb-3 sm:mb-3 tracking-tight">
                        A Vehicle for Every Journey
                    </h2>
                    <div className="max-w-4xl">
                        <p className="text-base text-gray-600 leading-relaxed mb-6">
                            Whether you're a resident embarking on a daily commute, a business traveler on a brief visit, or a tourist exploring the vastness of Dubai, we have a car that fits your style and purpose. All our users, hailing from nearby Arab countries or the expanse of Europe, find in us a trusted partner who understands their need for a seamless rental experience.
                        </p>
                    </div>
                </div>

                {/* Driven by Trends and Preferences */}
                <div className="mb-10 sm:mb-10">
                    <h2 className="text-[26px] font-[600] text-gray-900 mb-3 sm:mb-3 tracking-tight">
                        Driven by Trends and Preferences
                    </h2>
                    <div className="max-w-4xl">
                        <p className="text-base text-gray-600 leading-relaxed">
                            Our insights into rental trends in Dubai reveal distinct patterns: adrenaline enthusiasts and luxury seekers tend to opt for high-end rentals for short-term exhilaration, while those seeking value in economy rentals choose longer-term hires. No matter the brand you cherish, we have the keys ready for you.
                        </p>
                    </div>
                </div>

                {/* Your Favorite Brands at Competitive Prices */}
                <div className="mb-10 sm:mb-10">
                    <h2 className="text-[26px] font-[600] text-gray-900 mb-3 sm:mb-3 tracking-tight">
                        Your Favorite Brands at Competitive Prices
                    </h2>
                    <div className="max-w-4xl">
                        <p className="text-base text-gray-600 leading-relaxed">
                            Discover the finest cars from BMW, Mercedes-Benz, Audi, and more, all available at competitive rates. Whether you're seeking a sophisticated sedan for business, a robust SUV for adventure, or an eco-friendly compact for city driving, our platform connects you with the perfect match.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleJourneySection;