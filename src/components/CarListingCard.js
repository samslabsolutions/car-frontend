'use client';
import React, { useState } from 'react';
import { Heart, Phone, CheckCircle, MessageCircle, Users, Settings, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '../components/Pagination';

// Car Listing Card Component
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
        <article className="rounded-lg border mr-5 mt-0 border-gray-200 overflow-hidden transition-all duration-300 mb-6 w-[780px] h-[316px]">
            <div className="flex">
                {/* Image Section */}
                <div className="relative w-[360px] h-[322px] flex-shrink-0 group">
                    <div className="relative h-full w-full overflow-hidden">
                        <img
                            src={car.images[currentImageIndex]}
                            alt={car.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Badges Container */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {car.featured && (
                            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                                FEATURED
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    {car.images.length > 1 && (
                        <>
                            <button
                                onClick={() => handleImageChange('prev')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => handleImageChange('next')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        </>
                    )}

                    {/* Heart Button */}
                    <button
                        onClick={toggleLike}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
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
                <div className="flex-1 p-5 flex flex-col w-[464px]">
                    {/* Price Section */}
                    <div className="mb-3 flex gap-6 items-center">
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
                                <span className="text-sm text-gray-500">/monthly</span>
                            </div>
                        )}
                    </div>

                    {/* Car Details */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                        <div className="flex items-center">
                            <span className="text-gray-600 font-medium">{car.category}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">{car.specs.seats}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">{car.specs.doors}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600 ml-1">{car.specs.fuel}L</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                        {car.title}
                    </h2>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <h3 className="text-gray-600 text-sm">{car.location}</h3>
                    </div>

                    {/* Features */}
                    <div className="mb-4 space-y-1 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-600 w-4 h-4" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-600 w-4 h-4" />
                            <span>2 days rental available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-600 w-4 h-4" />
                            <span>Insurance included</span>
                        </div>
                    </div>

                    {/* Action Buttons and Agency */}
                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            {/* Buttons */}
                            <div className="flex gap-4">
                                {/* Call Button */}
                                <button className="flex items-center justify-center gap-2 bg-[#155dfc] hover:bg-[#003fcc] text-white px-3 py-2 rounded text-sm font-medium h-[40px] min-w-[90px] transition-colors duration-200">
                                    <Phone className="w-4 h-4" />
                                    Call
                                </button>

                                {/* WhatsApp Button */}
                                <button className="flex items-center justify-center bg-[#25D366] hover:bg-[#1da851] text-white px-3 py-2 rounded text-sm font-medium h-[40px] min-w-[90px] transition-colors duration-200">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Agency Logo */}
                            <div className="flex items-center">
                                <div className="w-16 h-12 bg-gray-100  flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/sae.webp"
                                        alt="Agency Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

// Sample car data
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
        dealer: { name: "ARADA" },
        location: 'Akala Hotels and Residences, DIFC, Dubai'
    },
    ...Array.from({ length: 9 }, (_, i) => ({
        id: i + 2,
        images: [
            "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        ],
        featured: i % 3 === 0,
        category: ["SUV", "Sedan", "Hatchback", "Luxury"][i % 4],
        title: `Car Model ${i + 2}`,
        specs: { seats: 5, doors: 4, fuel: 4 },
        pricing: {
            daily: 345,
            monthly: 790,
        },
        dealer: { name: ["ARADA", "EMAAR", "DAMAC", "SOBHA"][i % 4] },
        location: 'Dubai, UAE'
    }))
];

// Main component with pagination
const CarListingGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = sampleCars.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCars = sampleCars.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen py-12">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <style>{`
                h2, h3, h4, p, span, button, div {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex gap-8">
                    {/* Car Listings - Left Side */}
                    <div className="flex-1">
                        <div className="space-y-6">
                            {currentCars.map((car) => (
                                <div key={car.id} className="flex justify-center">
                                    <CarListingCard car={car} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    {/* Sticky Sidebar - Right Side (Premium version) */}
                    <div className="w-[360px] flex-shrink-0">
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-8 text-white h-[500px] flex flex-col justify-center">
                                <h3 className="text-2xl font-medium mb-4">Exclusive Member Benefits</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Priority vehicle reservations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Complimentary delivery and pickup</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Exclusive member discounts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>24/7 VIP concierge service</span>
                                    </li>
                                </ul>
                                <button className="mt-8 px-6 py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 w-full">
                                    List your car
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Need Assistance?</h3>
                                <p className="text-gray-600 mb-4">Our luxury vehicle specialists are available 24/7 to help you find the perfect rental.</p>
                                <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                                    <Phone className="w-4 h-4" />
                                    Contact Concierge
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListingGrid;