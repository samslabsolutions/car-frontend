"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Phone, MessageCircle, Users, Fuel, Settings, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

// Memoized car card component to prevent unnecessary re-renders
const CarCard = React.memo(({
    car,
    currentImageIndex,
    wishlist,
    onImageChange,
    onToggleWishlist
}) => {
    const formatPrice = useCallback((price) => price.toLocaleString(), []);

    return (
        <div className="snap-start flex-shrink-0 w-[340px] mx-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500">
                <div className="relative group">
                    <div className="relative h-59 overflow-hidden">
                        <img
                            src={car.images[currentImageIndex || 0]}
                            alt={car.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <button
                        onClick={() => onImageChange(car.id, 'prev')}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onImageChange(car.id, 'next')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => onToggleWishlist(car.id)}
                        className={`absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center transition-colors shadow-sm ${wishlist.includes(car.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                            }`}
                        aria-label={wishlist.includes(car.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart className="w-5 h-5" fill={wishlist.includes(car.id) ? 'currentColor' : 'none'} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                        {car.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-5">
                    <div className="text-blue-600 text-sm font-medium mb-1">{car.category}</div>
                    <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-tight">{car.title}</h3>

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
                            <span className="text-xl font-bold text-blue-600">AED {formatPrice(car.pricing.daily)}</span>
                            <span className="text-gray-500 text-sm">/day</span>
                        </div>
                        <div className="text-right">
                            <span className="text-base font-semibold text-gray-900">AED {formatPrice(car.pricing.weekly)}</span>
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
                            <span className="text-[14px] font-medium text-gray-900">{car.dealer.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

CarCard.displayName = 'CarCard';

export default function LuxuryCarSection() {
    const [cars, setCars] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [authChecked, setAuthChecked] = useState(false);
    const containerRef = useRef(null);
    const fetchController = useRef(null);

    // Memoize API base URL
    const API_BASE_URL = useMemo(() =>
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
        []
    );

    // Optimized car transformation with memoization
    const transformCars = useCallback((apiCars) => {
        return apiCars.map(car => ({
            id: car._id,
            images: car.images.length > 0
                ? car.images.map(img => img.url ? `${API_BASE_URL}${img.url}` : '/placeholder.jpg')
                : ['/placeholder.jpg'],
            featured: car.featured || false,
            year: car.year,
            category: car.category,
            title: `${car.make} ${car.model} ${car.year}`,
            specs: {
                seats: car.seatingCapacity || 'N/A',
                doors: car.doors || 'N/A',
                fuel: car.fuelType || 'N/A',
            },
            pricing: {
                daily: car.pricing?.daily?.discountedPrice || 0,
                weekly: car.pricing?.weekly?.discountedPrice || 0,
            },
            dealer: {
                name: car.agency?.agencyName || 'Car Rental',
                logo: '/dollar-logo.png',
                rating: car.averageRating || 4.5,
                reviews: car.totalReviews || 0,
            },
        }));
    }, [API_BASE_URL]);

    // Optimized fetch with abort controller and error handling
    const fetchLuxuryCars = useCallback(async () => {
        // Cancel previous request if still pending
        if (fetchController.current) {
            fetchController.current.abort();
        }

        fetchController.current = new AbortController();
        setIsLoading(true);
        setError('');

        try {
            const categorySlug = 'luxury-car-rental-dubai';
            const apiUrl = `${API_BASE_URL}/api/cars/public/category/${categorySlug}?limit=10`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: fetchController.current.signal,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch luxury cars');
            }

            if (data.cars && Array.isArray(data.cars)) {
                const transformedCars = transformCars(data.cars);
                setCars(transformedCars);
            } else {
                setCars([]);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message || 'An error occurred while fetching luxury cars');
                console.error('Failed to fetch cars:', err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [API_BASE_URL, transformCars]);

    // Optimized auth check with caching
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            setUser(null);
            setWishlist([]);
            setAuthChecked(true);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok && data.user) {
                setUser({ token, ...data.user });
                setWishlist(data.user.wishlist || []);
            } else {
                localStorage.removeItem('jwt');
                setUser(null);
                setWishlist([]);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('jwt');
            setUser(null);
            setWishlist([]);
        } finally {
            setAuthChecked(true);
        }
    }, [API_BASE_URL]);

    // Load data on mount
    useEffect(() => {
        fetchLuxuryCars();
        checkAuth();

        // Listen for storage changes
        const handleStorageChange = () => checkAuth();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            if (fetchController.current) {
                fetchController.current.abort();
            }
        };
    }, [fetchLuxuryCars, checkAuth]);

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

    // Optimized wishlist toggle with debouncing
    const toggleWishlist = useCallback(async (carId) => {
        if (!user) {
            toast.error('Please log in to add cars to your wishlist.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
            return;
        }

        const isWishlisted = wishlist.includes(carId);
        const method = isWishlisted ? 'DELETE' : 'POST';

        // Optimistic update
        setWishlist(prev =>
            isWishlisted
                ? prev.filter(id => id !== carId)
                : [...prev, carId]
        );

        try {
            const response = await fetch(`${API_BASE_URL}/api/cars/wishlist/${carId}`, {
                method,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
            } else {
                // Revert optimistic update on failure
                setWishlist(prev =>
                    isWishlisted
                        ? [...prev, carId]
                        : prev.filter(id => id !== carId)
                );
                throw new Error(data.message || 'Failed to update wishlist');
            }
        } catch (error) {
            console.error('Wishlist toggle failed:', error);
            // Revert optimistic update on error
            setWishlist(prev =>
                isWishlisted
                    ? [...prev, carId]
                    : prev.filter(id => id !== carId)
            );
            toast.error(error.message || 'An error occurred while updating wishlist', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        }
    }, [user, wishlist, API_BASE_URL]);

    // Show loading until both cars and auth are loaded
    if (isLoading || !authChecked) {
        return (
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-600">Loading luxury cars...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
                            Luxury Cars
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Discover our handpicked selection of premium vehicles, each verified and ready for your next adventure.
                        </p>
                        <hr className="mt-4 w-48 border-t-2 border-blue-600" />
                    </div>

                    <button className="mt-6 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm" role="alert">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && cars.length === 0 && (
                    <div className="text-center text-gray-600">No luxury cars found.</div>
                )}

                {/* Cars Slider */}
                {!error && cars.length > 0 && (
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto pb-6 pl-8 pr-4 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {cars.map(car => (
                            <CarCard
                                key={car.id}
                                car={car}
                                currentImageIndex={currentImageIndex[car.id] || 0}
                                wishlist={wishlist}
                                onImageChange={handleImageChange}
                                onToggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}