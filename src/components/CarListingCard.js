'use client';
import React, { useState } from 'react';
import { Heart, Phone, CheckCircle, MessageCircle, Users, Settings, MapPin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
// Import the separate pagination component
import Pagination from '../components/Pagination'; // Adjust path as needed

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
        <article className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 mb-6">
            <div className="flex">
                {/* Image Section */}
                <div className="relative w-[360px] h-[343px] flex-shrink-0 group">
                    <div className="relative h-full w-full overflow-hidden">
                        <img
                            src={car.images[currentImageIndex]}
                            alt={car.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Badges Container */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {car.featured && (
                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                FEATURED
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    {car.images.length > 1 && (
                        <>
                            <button
                                onClick={() => handleImageChange('prev')}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleImageChange('next')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {/* Heart Button */}
                    <button
                        onClick={toggleLike}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
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
                <div className="flex-1 p-6 flex flex-col">
                    {/* Price Section */}
                    <div className="mb-4 flex gap-8 items-center">
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
                    <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                            <span className=" text-black-500 font-medium">{car.category}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4  text-black-500" />
                            <span className=" text-black-500">{car.specs.seats}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4  text-black-500" />
                            <span className=" text-black-500">{car.specs.doors}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center">
                            <Settings className="w-4 h-4  text-black-500" />
                            <span className=" text-black-500 ml-1">{car.specs.fuel}L</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-medium text-gray-900 mb-3 ">
                        {car.title}
                    </h2>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-black-500" />
                        <h3 className=" text-black-500 text-[15px]  ">{car.location}</h3>
                    </div>

                    <div className="mb-5 space-y-1 text-sm text-gray-700">
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
                            {/* Updated Buttons with exact styling from image */}
                            <div className="flex gap-2 mt-2">
                                {/* Call Button with hover */}
                                <button className="flex items-center justify-center gap-2 bg-[#155dfc] hover:bg-[#003fcc] text-white px-3 py-2 rounded-sm text-sm font-medium h-[40px] min-w-[90px] transition-colors duration-200">
                                    <Phone className="w-4 h-4" />
                                    Call
                                </button>

                                {/* WhatsApp Button with hover */}
                                <button className="flex items-center justify-center bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-2 rounded-sm text-sm font-medium h-[40px] min-w-[90px] transition-colors duration-200">
                                    <MessageCircle className="w-6 h-6" />
                                </button>
                            </div>



                            {/* Agency Logo */}
                            <div className="flex items-center mt-2">
                                <div className="w-12 h-9 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                    <span className="text-xs font-bold text-gray-600">{car.dealer.name}</span>
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
            monthly: 7900000, // ✅ Added monthly price
        },
        dealer: { name: "ARADA" },
        location: 'Akala Hotels and Residences, DIFC, Dubai'
    },
    // Add more cars here...
    ...Array.from({ length: 25 }, (_, i) => ({
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
            monthly: 790, // ✅ Added monthly price
        },
        dealer: { name: ["ARADA", "EMAAR", "DAMAC", "SOBHA"][i % 4] },
        location: 'Dubai, UAE'
    }))
];

// Main component with pagination
const CarListingGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = sampleCars.length;

    // Calculate current items to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCars = sampleCars.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mr-5 pr-6 py-6 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto flex gap-6">
                {/* Car Listings - Left Side */}
                <div className="flex-1">
                    <div className="space-y-4">
                        {currentCars.map((car) => (
                            <div key={car.id} className="max-w-full w-[800px] mx-auto">
                                <CarListingCard car={car} />
                            </div>
                        ))}
                    </div>

                    {/* Using the imported Pagination component */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* Sticky Sidebar - Right Side */}
                <div className="w-[360px]  flex-shrink-0 ml-3">
                    <div className="sticky top-6">
                        <img
                            src="https://auto-deal-rho.vercel.app/assets/images/section/Vertical-Banner.jpg"
                            alt="Vertical Banner"
                            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListingGrid;