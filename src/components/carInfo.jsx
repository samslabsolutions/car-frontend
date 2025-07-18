"use client";
import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Users, Fuel, Settings, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const CarListings = () => {
    const cars = [
        {
            id: 1,
            images: [
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ],
            featured: true,
            year: 2024,
            category: "Sedan",
            title: "Honda Accord 2.0 Turbo",
            specs: {
                seats: 5,
                doors: 4,
                fuel: 3
            },
            pricing: {
                daily: 34402,
                weekly: 68804
            },
            dealer: {
                name: "Car Rental",
                logo: "/dollar-logo.png",
                rating: 4.8,
                reviews: 324
            }
        },
        {
            id: 2,
            images: [
                "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
                "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1520986606214-8b456906c284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ],
            featured: true,
            year: 2017,
            category: "Hatchback",
            title: "Honda Civic 1.5 Turbo",
            specs: {
                seats: 4,
                doors: 2,
                fuel: 4
            },
            pricing: {
                daily: 27701.5,
                weekly: 55403
            },
            dealer: {
                name: "Car Rental",
                logo: "/dollar-logo.png",
                rating: 4.9,
                reviews: 189
            }
        },
        {
            id: 3,
            images: [
                "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1508974239320-0a029497e820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ],
            featured: true,
            year: 2018,
            category: "Hatchback",
            title: "Toyota Yaris 1.5",
            specs: {
                seats: 7,
                doors: 4,
                fuel: 4
            },
            pricing: {
                daily: 28740,
                weekly: 57480
            },
            dealer: {
                name: "Car Rental",
                logo: "/dollar-logo.png",
                rating: 4.7,
                reviews: 267
            }
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => {
                const newIndex = {};
                cars.forEach(car => {
                    newIndex[car.id] = ((prev[car.id] || 0) + 1) % car.images.length;
                });
                return newIndex;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [cars]);

    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    const handleImageChange = (carId, direction) => {
        setCurrentImageIndex(prev => {
            const car = cars.find(c => c.id === carId);
            const currentIndex = prev[carId] || 0;
            let newIndex;

            if (direction === 'next') {
                newIndex = (currentIndex + 1) % car.images.length;
            } else {
                newIndex = currentIndex === 0 ? car.images.length - 1 : currentIndex - 1;
            }

            return { ...prev, [carId]: newIndex };
        });
    };

    return (
        <section className="py-12 lg:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
                        Featured Vehicles{" "}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base">
                        Discover our handpicked selection of premium vehicles, each verified and ready for your next adventure.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Image Section with Slider */}
                            <div className="relative group">
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={car.images[currentImageIndex[car.id] || 0]}
                                        alt={car.title}
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                    />
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => handleImageChange(car.id, 'prev')}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleImageChange(car.id, 'next')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                    {car.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(prev => ({ ...prev, [car.id]: index }))}
                                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === (currentImageIndex[car.id] || 0)
                                                ? 'bg-white'
                                                : 'bg-white bg-opacity-50'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Badges */}
                                {/* <div className="absolute top-3 left-3 flex items-center space-x-2">
                                    <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                                        Featured
                                    </span>
                                    <span className="bg-gray-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                                        {car.year}
                                    </span>
                                </div> */}

                                {/* Heart Icon */}
                                <button className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors duration-200 shadow-sm">
                                    <Heart className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-4">
                                {/* Category */}
                                <div className="text-blue-600 text-sm font-medium mb-1">
                                    {car.category}
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-gray-900 mb-3 leading-tight">
                                    {car.title}
                                </h3>

                                {/* Specs */}
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

                                {/* Pricing */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-xl font-bold text-blue-600">
                                            ${formatPrice(car.pricing.daily)}
                                        </span>
                                        <span className="text-gray-500 text-sm">/day</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-base font-semibold text-gray-900">
                                            ${formatPrice(car.pricing.weekly)}
                                        </span>
                                        <span className="text-gray-500 text-sm">/week</span>
                                    </div>
                                </div>

                                {/* Dealer Info */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">D</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm">
                                                {car.dealer.name}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-xs text-gray-600">
                                                    {car.dealer.rating} ({car.dealer.reviews})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-[#155dfc] hover:bg-[#0f4fd4] text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-1.5">
                                        <Phone className="w-4 h-4" />
                                        <span>Call</span>
                                    </button>
                                    <button className="flex-1 bg-[#25D366] text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-[#1ebe5d] flex items-center justify-center space-x-1.5">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                        View All Vehicles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CarListings;