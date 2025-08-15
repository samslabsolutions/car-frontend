"use client";
import React, { useState, useEffect } from "react";
import {
    Star,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Calendar,
    ThumbsUp,
    Quote,
    Verified,
    TrendingUp
} from "lucide-react";

const ReviewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [hoveredReview, setHoveredReview] = useState(null);

    const reviews = [
        {
            id: 1,
            name: "Ahmed Al Mansouri",
            title: "Owner & CEO",
            company: "Dubai Elite Car Rentals",
            location: "Dubai, UAE",
            rating: 5,
            date: "2 weeks ago",
            review: "Outstanding platform! OneClickDrive has completely transformed how we reach customers. The leads are high quality and the booking process is seamless. Our occupancy rate has never been better.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 12,
            verified: true,
            growth: "+85%"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            title: "General Manager",
            company: "Premium Car Hire",
            location: "Abu Dhabi, UAE",
            rating: 5,
            date: "1 month ago",
            review: "Excellent service and support. The team at OneClickDrive really understands the car rental business. Marketing reach is incredible and we're getting customers from all over the world.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 8,
            verified: true,
            growth: "+78%"
        },
        {
            id: 3,
            name: "Mohammad Hassan",
            title: "Sales Manager",
            company: "Sharjah Auto Rentals",
            location: "Sharjah, UAE",
            rating: 5,
            date: "3 weeks ago",
            review: "Best decision we made for our business. Easy to use platform with great customer support. Zero commission model is fantastic and we keep all our earnings.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 15,
            verified: true,
            growth: "+92%"
        },
        {
            id: 4,
            name: "Fatima Al Zahra",
            title: "Marketing Director",
            company: "Luxury Rides UAE",
            location: "Dubai, UAE",
            rating: 5,
            date: "1 week ago",
            review: "Professional platform with excellent analytics. Helps us optimize pricing and manage inventory effectively. The dedicated account manager is always helpful.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 9,
            verified: true,
            growth: "+88%"
        },
        {
            id: 5,
            name: "Carlos Rodriguez",
            title: "Owner",
            company: "International Car Rentals",
            location: "Abu Dhabi, UAE",
            rating: 5,
            date: "2 months ago",
            review: "Great platform for growing our rental business. User-friendly interface and excellent customer quality. Highly recommend to any car rental company looking to expand.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 11,
            verified: true,
            growth: "+81%"
        },
        {
            id: 6,
            name: "Layla Al Hashemi",
            title: "Operations Manager",
            company: "Gulf Car Rentals",
            location: "Ajman, UAE",
            rating: 5,
            date: "3 days ago",
            review: "Amazing results since joining OneClickDrive. The booking system is smooth and customer service is top-notch. Our revenue has grown significantly.",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
            helpful: 6,
            verified: true,
            growth: "+95%"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.ceil(reviews.length / 3));
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, reviews.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
        setIsAutoPlaying(false);
    };

    const getCurrentReviews = () => {
        const startIndex = currentSlide * 3;
        return reviews.slice(startIndex, startIndex + 3);
    };

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <div className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-30">
                    {/* <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
                        <Star className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Trusted by 500+ Companies</span>
                    </div> */}

                    <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                        Why Join OneClickDrive?
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                        Partner up with one of the world's biggest car rental marketplaces. Our car rental website and app, available on Android and iOS devices, is marketed specifically to renters planning a trip to your city.
                    </p>

                    {/* Enhanced Rating Summary */}
                    <div className="mt-10 inline-flex items-center bg-white rounded-2xl px-8 py-6 shadow-xl border border-gray-100 backdrop-blur-sm">
                        <div className="text-center mr-8">
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex items-center justify-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 mx-0.5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-2 font-medium">Perfect Rating</div>
                        </div>
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent mr-8"></div>
                        <div className="text-center mr-8">
                            <div className="text-3xl font-bold text-gray-900">{reviews.length}+</div>
                            <div className="text-sm text-gray-500 font-medium">Verified Reviews</div>
                        </div>
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent mr-8"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">500+</div>
                            <div className="text-sm text-gray-500 font-medium">Happy Partners</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Reviews Grid */}
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {getCurrentReviews().map((review, index) => (
                            <div
                                key={review.id}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white"
                                onMouseEnter={() => setHoveredReview(review.id)}
                                onMouseLeave={() => setHoveredReview(null)}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0  rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Quote Icon */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Quote className="w-4 h-4 text-white" />
                                </div>

                                {/* Growth Badge */}
                                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {review.growth}
                                </div>

                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                                            />
                                            {review.verified && (
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <Verified className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                                            <p className="text-blue-600 font-medium text-sm">{review.title}</p>
                                            <p className="text-gray-500 text-xs">{review.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {review.date}
                                    </div>
                                </div>

                                {/* Enhanced Rating */}
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 text-yellow-400 fill-current transition-transform duration-200 ${hoveredReview === review.id ? 'scale-110' : 'scale-100'
                                                    }`}
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-600">Excellent</span>
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                                    {review.review}
                                </p>

                                {/* Enhanced Footer */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                            <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                                            {review.location}
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                                            <ThumbsUp className="w-4 h-4 mr-1" />
                                            {review.helpful} helpful
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Navigation */}
                    {Math.ceil(reviews.length / 3) > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 w-14 h-14 rounded-full shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 w-14 h-14 rounded-full shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-600" />
                            </button>
                        </>
                    )}
                </div>

                {/* Enhanced Slide Indicators */}
                {Math.ceil(reviews.length / 3) > 1 && (
                    <div className="flex items-center justify-center mt-12 space-x-3">
                        {[...Array(Math.ceil(reviews.length / 3))].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                    setIsAutoPlaying(false);
                                }}
                                className={`transition-all duration-300 ${index === currentSlide
                                    ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Enhanced CTA */}
                <div className="mt-20 relative">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>

                        <div className="relative">
                            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                                <Star className="w-4 h-4 text-yellow-300 mr-2" />
                                <span className="text-sm font-medium">Join 500+ Success Stories</span>
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Business?</h3>
                            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                                Join hundreds of car rental companies already achieving incredible growth with OneClickDrive.
                                Your success story could be next.
                            </p>

                            <button className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
                                Start Your Success Story
                                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewsSection;