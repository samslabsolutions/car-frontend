'use client';
import React, { useState } from 'react';
import { Heart, Phone, CheckCircle, Check, MessageCircle, Users, Settings, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '../components/Pagination';

// Car Listing Card Component
const CarListingCard = ({ car }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
        } else {
            setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    return (
        <article className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-300  w-full max-w-[775px] h-[316px] mb-6">
            <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative lg:w-[360px] lg:h-[316px] w-full h-64 flex-shrink-0 group">
                    <div className="relative h-full w-full overflow-hidden">
                        <img
                            src={car.images[currentImageIndex]}
                            alt={car.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    {/* Badges */}
                    {car.featured && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                            FEATURED
                        </div>
                    )}

                    {/* Navigation Arrows */}
                    {car.images.length > 1 && (
                        <>
                            <button
                                onClick={() => handleImageChange('prev')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => handleImageChange('next')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        </>
                    )}

                    {/* Heart Button */}
                    <button
                        onClick={toggleLike}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                        aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                    </button>

                    {/* Image Dots */}
                    {car.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                            {car.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 flex flex-col">
                    {/* Price Section */}
                    <div className="mb-3 flex flex-wrap gap-4 items-center">
                        {car.pricing.daily && (
                            <div className="flex items-baseline gap-1">
                                <h4 className="text-lg font-semibold text-gray-900">
                                    <span className="text-sm">AED</span> {formatPrice(car.pricing.daily)}
                                </h4>
                                <span className="text-sm text-gray-500">/day</span>
                            </div>
                        )}
                        {car.pricing.monthly && (
                            <div className="flex items-baseline gap-1">
                                <h4 className="text-lg font-semibold text-gray-900">
                                    <span className="text-sm">AED</span> {formatPrice(car.pricing.monthly)}
                                </h4>
                                <span className="text-sm text-gray-500">/month</span>
                            </div>
                        )}
                    </div>

                    {/* Car Details */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                        <span className="text-gray-600 font-medium">{car.category}</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span>{car.specs.seats} seats</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span>{car.specs.doors} doors</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span>{car.specs.fuel}L</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                        {car.title}
                    </h2>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 text-sm">{car.location}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4 space-y-2 text-sm text-gray-700">
                        {['Free Delivery', '2 days rental available', 'Insurance included'].map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <CheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-blue-500/20">
                                    <Phone className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
                                    Call
                                </button>

                                <button className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-[#25D366]/20">
                                    <svg
                                        className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>
                            <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                                <img
                                    src="/sae.webp"
                                    alt="Agency Logo"
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

// Sample Car Data
const sampleCars = [
    {
        id: 1,
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        category: "Sedan",
        title: "Honda Accord 2024",
        specs: { seats: 5, doors: 4, fuel: 3 },
        pricing: {
            daily: 3945000,
            monthly: 7900000,
        },
        location: 'Akala Hotels and Residences, DIFC, Dubai'
    },
    {
        id: 2,
        images: [
            "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: false,
        category: "SUV",
        title: "Toyota Land Cruiser 2023",
        specs: { seats: 7, doors: 4, fuel: 5 },
        pricing: {
            daily: 1200,
            monthly: 25000,
        },
        location: 'Dubai Marina, Dubai'
    },
    {
        id: 3,
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        category: "Luxury",
        title: "Mercedes S-Class 2023",
        specs: { seats: 4, doors: 4, fuel: 4 },
        pricing: {
            daily: 2500,
            monthly: 50000,
        },
        location: 'Palm Jumeirah, Dubai'
    },
    {
        id: 4,
        images: [
            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: false,
        category: "Sports",
        title: "Porsche 911 Carrera",
        specs: { seats: 2, doors: 2, fuel: 3 },
        pricing: {
            daily: 3500,
            monthly: 70000,
        },
        location: 'Downtown Dubai, Dubai'
    },
    {
        id: 5,
        images: [
            "https://images.unsplash.com/photo-1547038577-da80abbc4f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: true,
        category: "Electric",
        title: "Tesla Model X",
        specs: { seats: 5, doors: 4, fuel: 0 },
        pricing: {
            daily: 1800,
            monthly: 35000,
        },
        location: 'Business Bay, Dubai'
    }
];

// Main Car Listing Grid Component
const CarListingGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = sampleCars.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCars = sampleCars.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="space-y-6">
                            {currentCars.map((car) => (
                                <CarListingCard key={car.id} car={car} />
                            ))}
                        </div>

                        {/* Pagination using code 2 import style */}
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-[360px] flex-shrink-0">
                        <div className="sticky top-4 space-y-6">
                            {/* Membership Card */}
                            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white">
                                <h3 className="text-xl font-medium mb-4">Exclusive Member Benefits</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Priority vehicle reservations',
                                        'Complimentary delivery',
                                        'Exclusive discounts',
                                        '24/7 VIP concierge'
                                    ].map((benefit) => (
                                        <li key={benefit} className="flex items-start">
                                            <CheckCircle className="text-blue-300 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-6 w-full py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    Join Now
                                </button>
                            </div>

                            {/* Help Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-medium mb-3">Need Help?</h3>
                                <p className="text-gray-600 mb-4">Our specialists are available 24/7.</p>
                                <button className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <Phone className="w-4 h-4" />
                                    Contact Us
                                </button>
                            </div>

                        </div>


                    </div>

                </div>
                <div className="mt-16 border-b border-gray-200"></div>
            </div>

        </div>
    );
};

export default CarListingGrid;