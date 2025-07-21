// components/CarListings.js
"use client";
import React, { useState, useRef } from 'react';
import { Phone, MessageCircle, Users, Fuel, Settings, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const cars = [
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
        dealer: { name: "Car Rental", logo: "/dollar-logo.png", rating: 4.8, reviews: 324 }
    },
    {
        id: 2,
        images: [
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
            "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        year: 2017,
        category: "Hatchback",
        title: "Honda Civic 1.5 Turbo",
        specs: { seats: 4, doors: 2, fuel: 4 },
        pricing: { daily: 27701.5, weekly: 55403 },
        dealer: { name: "Car Rental", logo: "/dollar-logo.png", rating: 4.9, reviews: 189 }
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
        dealer: { name: "Car Rental", logo: "/dollar-logo.png", rating: 4.7, reviews: 267 }
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
        dealer: { name: "Car Rental", logo: "/dollar-logo.png", rating: 4.6, reviews: 215 }
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
        dealer: { name: "Car Rental", logo: "/dollar-logo.png", rating: 4.9, reviews: 412 }
    }
];

export default function SportCar() {
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const containerRef = useRef(null);

    const formatPrice = (price) => price.toLocaleString();

    const handleImageChange = (carId, direction) => {
        setCurrentImageIndex(prev => {
            const car = cars.find(c => c.id === carId);
            const currentIdx = prev[carId] || 0;
            const nextIdx = direction === 'next'
                ? (currentIdx + 1) % car.images.length
                : currentIdx === 0
                    ? car.images.length - 1
                    : currentIdx - 1;
            return { ...prev, [carId]: nextIdx };
        });
    };

    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Sport Cars
                        </h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Discover our handpicked selection of premium vehicles, each verified and ready for your next adventure.
                        </p>
                        <hr className="mt-4 w-48 border-t-2 border-blue-600" />
                    </div>

                    {/* PNG-style "View all" button */}
                    <button className="mt-6 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Slider */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto pb-6 pl-8 pr-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {cars.map(car => (
                        <div
                            key={car.id}
                            className="snap-start flex-shrink-0 w-[340px] mx-2"
                        >
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500">
                                {/* image carousel */}
                                <div className="relative group">
                                    <div className="relative h-59 overflow-hidden">
                                        <img
                                            src={car.images[currentImageIndex[car.id] || 0]}
                                            alt={car.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleImageChange(car.id, 'prev')}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleImageChange(car.id, 'next')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                        <Heart className="w-5 h-5" />
                                    </button>

                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                                        {car.images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-all ${(currentImageIndex[car.id] || 0) === idx ? 'bg-white' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* content */}
                                <div className="p-5">
                                    <div className="text-blue-600 text-sm font-medium mb-1">{car.category}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{car.title}</h3>

                                    <div className="flex items-center space-x-4 mb-4">
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
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-xl font-bold text-blue-600">${formatPrice(car.pricing.daily)}</span>
                                            <span className="text-gray-500 text-sm">/day</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-base font-semibold text-gray-900">${formatPrice(car.pricing.weekly)}</span>
                                            <span className="text-gray-500 text-sm">/week</span>
                                        </div>
                                    </div>

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
                                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">T</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{car.dealer.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}