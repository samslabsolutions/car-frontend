'use client';
import React, { useState } from 'react';
import { Heart, Phone, MessageCircle, Users, Settings, Fuel, ChevronLeft, ChevronRight, MapPin, CheckCircle } from 'lucide-react';

const CarListingCard = ({ car }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
        } else {
            setCurrentImageIndex((prev) => prev === 0 ? car.images.length - 1 : prev - 1);
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const formatPrice = (price) => price.toLocaleString();

    return (
        <div className="bg-white rounded-2xl h-62 shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 mb-6">
            <div className="flex">
                {/* Image Section */}
                <div className="relative w-80 h-62 flex-shrink-0 group">
                    <div className="relative h-full overflow-hidden">
                        <img
                            src={car.images[currentImageIndex]}
                            alt={car.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Featured Badge */}
                    {car.featured && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            FEATURED
                        </div>
                    )}

                    {/* Navigation Arrows */}
                    {car.images.length > 1 && (
                        <>
                            <button
                                onClick={() => handleImageChange('prev')}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleImageChange('next')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Heart Button */}
                    <button
                        onClick={toggleLike}
                        className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                    </button>

                    {/* Image Dots */}
                    {car.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                            {car.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            {/* Category and Title */}
                            <div className="text-blue-600 text-sm font-medium mb-1">{car.category}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{car.title}</h3>

                            {/* Car Specs */}
                            <div className="flex items-center space-x-6 mb-4">
                                <div className="flex items-center space-x-1.5 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">{car.specs.seats}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 text-gray-600">
                                    <Settings className="w-4 h-4" />
                                    <span className="text-sm">{car.specs.doors}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 text-gray-600">
                                    <Fuel className="w-4 h-4" />
                                    <span className="text-sm">{car.specs.fuel}</span>
                                </div>
                                <div className="text-sm text-gray-600">{car.year}</div>
                            </div>

                            {/* Features */}
                            <div className="flex items-center gap-6 mb-4 text-sm">
                                <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="whitespace-nowrap">{car.availability}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="whitespace-nowrap">{car.insurance}</span>
                                </div>
                            </div>


                            {/* Location */}
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                                <MapPin className="w-4 h-4" />
                                {car.location}
                            </div>

                            {/* Action Buttons and Dealer */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg flex items-center justify-center transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">{car.dealer.name.charAt(0)}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{car.dealer.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="ml-6 text-right">
                            <div className="mb-4">
                                <div className="mb-2">
                                    <span className="text-2xl font-bold text-blue-600">AED {formatPrice(car.pricing.daily)}</span>
                                    <span className="text-gray-500 text-sm">/day</span>
                                </div>
                                <div>
                                    <span className="text-lg font-semibold text-gray-900">AED {formatPrice(car.pricing.weekly)}</span>
                                    <span className="text-gray-500 text-sm">/week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sample car data adapted to your structure
const sampleCars = [
    {
        id: 1,
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2024,
        category: "Sedan",
        title: "Honda Accord 2.0 Turbo",
        specs: { seats: 5, doors: 4, fuel: 3 },
        pricing: { daily: 34402, weekly: 68804 },
        dealer: { name: "MS", logo: "/dollar-logo.png", rating: 4.8, reviews: 324 },
        availability: '1 day rental available',
        insurance: 'Basic Insurance',
        location: 'Palm Jumeirah, Dubai'
    },
    {
        id: 2,
        images: [
            "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2017,
        category: "Hatchback",
        title: "Honda Civic 1.5 Turbo",
        specs: { seats: 4, doors: 2, fuel: 4 },
        pricing: { daily: 27701, weekly: 55403 },
        dealer: { name: "RC", logo: "/dollar-logo.png", rating: 4.9, reviews: 189 },
        availability: 'Available now',
        insurance: 'Full Insurance',
        location: 'Dubai Marina, Dubai'
    },
    {
        id: 3,
        images: [
            "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2018,
        category: "SUV",
        title: "Jeep Wrangler 2024",
        specs: { seats: 7, doors: 4, fuel: 4 },
        pricing: { daily: 28740, weekly: 57480 },
        dealer: { name: "LX", logo: "/dollar-logo.png", rating: 4.7, reviews: 267 },
        availability: '2 day rental available',
        insurance: 'Comprehensive Insurance',
        location: 'Business Bay, Dubai'
    },
    {
        id: 4,
        images: [
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1541348263662-e068671d90af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2022,
        category: "SUV",
        title: "Toyota RAV4 Hybrid",
        specs: { seats: 5, doors: 4, fuel: 5 },
        pricing: { daily: 32000, weekly: 64000 },
        dealer: { name: "TR", logo: "/dollar-logo.png", rating: 4.6, reviews: 215 },
        availability: 'Available now',
        insurance: 'Basic Insurance',
        location: 'Jumeirah, Dubai'
    },
    {
        id: 5,
        images: [
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
            "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2023,
        category: "Luxury",
        title: "BMW 3 Series",
        specs: { seats: 5, doors: 4, fuel: 4 },
        pricing: { daily: 45000, weekly: 90000 },
        dealer: { name: "BM", logo: "/dollar-logo.png", rating: 4.9, reviews: 412 },
        availability: 'Available now',
        insurance: 'Premium Insurance',
        location: 'Downtown Dubai'
    }
];

// Main component to display cards with sticky sidebar
const CarListingGrid = () => {
    const formatPrice = (price) => price.toLocaleString();

    return (
        <div className="p-8  min-h-screen">
            <div className="max-w-7xl mx-auto flex gap-12">
                {/* Car Listings - Left Side */}
                <div className="flex-1">

                    <div className="space-y-0">
                        {sampleCars.map((car) => (
                            <CarListingCard key={car.id} car={car} />
                        ))}
                    </div>
                </div>

                {/* Sticky Sidebar - Right Side */}
                <div className="w-74 flex-shrink-0">
                    <div className="sticky top-8">
                        <img
                            src="https://auto-deal-rho.vercel.app/assets/images/section/Vertical-Banner.jpg"
                            alt="Vertical Banner"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListingGrid;