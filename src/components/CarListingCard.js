'use client';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Heart, Phone, CheckCircle, Users, Settings, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Pagination from './Pagination';
import { FilterContext } from '@/app/rent/page';
import debounce from 'lodash/debounce';

// Function to slugify the car title for URL
const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');
};

// Helper function to get the full image URL
const getImageUrl = (url) =>
    url ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${url}` : '/placeholder.jpg';

// Car Listing Card Component
const CarListingCard = ({ car }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPhone, setShowPhone] = useState(false);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [car._id]);

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

    const handleCallClick = () => {
        setShowPhone(!showPhone);
    };

    const features = [
        car.deliveryAvailable ? 'Delivery Available' : 'No Delivery',
        car.rentalTerms?.fuelPolicy || 'Fuel Policy Not Specified',
        car.rentalTerms?.insuranceIncluded ? 'Insurance Included' : 'Insurance Not Included',
    ];

    const carTitle = car.make && car.model && car.year ? `${car.make} ${car.model} ${car.year}` : car.title || 'Unknown Car';
    const slug = slugify(carTitle);
    const phoneDisplay = car.agency?.contactPhone || 'No Phone';

    return (
        <article className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 w-full max-w-[875px] h-[316px] mb-6">
            <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-[360px] lg:h-[316px] w-full h-64 flex-shrink-0 group">
                    <div className="relative h-full w-full overflow-hidden bg-gray-200">
                        <img
                            src={getImageUrl(car.images[currentImageIndex]?.url)}
                            alt={carTitle}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        {!car.images[currentImageIndex]?.url && (
                            <span className="absolute inset-0 flex items-center justify-center text-gray-500">No Image</span>
                        )}
                    </div>
                    {car.featured && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">FEATURED</div>
                    )}
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
                    <button
                        onClick={toggleLike}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                        aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                    </button>
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
                <div className="flex-1 p-5 flex flex-col">
                    <div className="mb-3 flex flex-wrap gap-4 items-center">
                        {car.pricing.daily?.discountedPrice && (
                            <div className="flex items-baseline gap-1">
                                <h4 className="text-lg font-medium text-gray-900">
                                    <span className="text-sm">AED</span> {formatPrice(car.pricing.daily.discountedPrice)}
                                </h4>
                                <span className="text-sm text-gray-500">/day</span>
                            </div>
                        )}
                        {car.pricing.monthly?.discountedPrice && (
                            <div className="flex items-baseline gap-1">
                                <h4 className="text-lg font-medium text-gray-900">
                                    <span className="text-sm">AED</span> {formatPrice(car.pricing.monthly.discountedPrice)}
                                </h4>
                                <span className="text-sm text-gray-500">/month</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                        <span className="text-gray-600 font-medium">{car.category}</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span>{car.seatingCapacity || 'N/A'} seats</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span>{car.doors || 'N/A'} doors</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span>{car.fuelType || 'N/A'}</span>
                        </div>
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2" aria-label={`Car title: ${carTitle}`}>
                        <Link href={`/details/${slug}`} className="no-underline hover:underline">
                            {carTitle}
                        </Link>
                    </h2>
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 text-sm">{car.location || car.city || 'Location Not Specified'}</span>
                    </div>
                    <div className="mb-4 space-y-2 text-sm text-gray-700">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <CheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCallClick}
                                    className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-sm font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md border border-blue-500/20 max-w-[200px] truncate"
                                    aria-label={showPhone ? `Hide phone number for ${car.agency?.agencyName || 'agency'}` : `Show phone number for ${car.agency?.agencyName || 'agency'}`}
                                >
                                    {showPhone ? (
                                        <span className="truncate">{phoneDisplay}</span>
                                    ) : (
                                        <>
                                            <Phone className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            Call
                                        </>
                                    )}
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
                            <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-700 text-center px-1 line-clamp-2">
                                    {car.agency?.agencyName || 'Unknown Agency'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

// Main Car Listing Grid Component
const CarListingGrid = () => {
    const { filters } = useContext(FilterContext);
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const itemsPerPage = 5;

    const fetchCars = useCallback(
        debounce(async (page) => {
            setIsLoading(true);
            setError('');
            try {
                const queryParams = new URLSearchParams({ page, limit: itemsPerPage });

                console.log('Current filters:', filters);

                // Map filters to query parameters, distinguishing between city and location
                if (filters.moreFilters.location) {
                    const cities = [
                        'Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Ajman',
                        'Fujairah', 'Umm Al Quwain', 'Al Ain'
                    ];
                    if (cities.includes(filters.moreFilters.location)) {
                        queryParams.append('city', filters.moreFilters.location);
                    } else {
                        queryParams.append('location', filters.moreFilters.location);
                    }
                }
                if (filters.search) queryParams.append('search', filters.search);
                if (filters.category) queryParams.append('category', filters.category);
                if (filters.selectedCarType) queryParams.append('bodyType', filters.selectedCarType);

                // Handle price filters based on rental period
                const rentalPeriod = filters.selectedRental || filters.moreFilters.rentalPeriod || 'daily';
                if (filters.minPrice || filters.maxPrice) {
                    if (rentalPeriod === 'daily') {
                        if (filters.minPrice) queryParams.append('dailyPriceMin', filters.minPrice);
                        if (filters.maxPrice) queryParams.append('dailyPriceMax', filters.maxPrice);
                    } else if (rentalPeriod === 'weekly') {
                        if (filters.minPrice) queryParams.append('weeklyPriceMin', filters.minPrice);
                        if (filters.maxPrice) queryParams.append('weeklyPriceMax', filters.maxPrice);
                    } else if (rentalPeriod === 'monthly') {
                        if (filters.minPrice) queryParams.append('monthlyPriceMin', filters.minPrice);
                        if (filters.maxPrice) queryParams.append('monthlyPriceMax', filters.maxPrice);
                    }
                }

                // Handle moreFilters price range
                if (filters.moreFilters.priceRange.min || filters.moreFilters.priceRange.max) {
                    if (rentalPeriod === 'Daily') {
                        if (filters.moreFilters.priceRange.min) queryParams.append('dailyPriceMin', filters.moreFilters.priceRange.min);
                        if (filters.moreFilters.priceRange.max) queryParams.append('dailyPriceMax', filters.moreFilters.priceRange.max);
                    } else if (rentalPeriod === 'Weekly') {
                        if (filters.moreFilters.priceRange.min) queryParams.append('weeklyPriceMin', filters.moreFilters.priceRange.min);
                        if (filters.moreFilters.priceRange.max) queryParams.append('weeklyPriceMax', filters.moreFilters.priceRange.max);
                    } else if (rentalPeriod === 'Monthly') {
                        if (filters.moreFilters.priceRange.min) queryParams.append('monthlyPriceMin', filters.moreFilters.priceRange.min);
                        if (filters.moreFilters.priceRange.max) queryParams.append('monthlyPriceMax', filters.moreFilters.priceRange.max);
                    }
                }

                // Handle sorting
                const sortOption = filters.moreFilters.sortBy || filters.selectedSort;
                if (sortOption) {
                    if (sortOption === 'low-to-high' || sortOption === 'Price: Low to High') {
                        queryParams.append('sortBy', 'pricing.daily.discountedPrice');
                        queryParams.append('sortOrder', 'asc');
                    } else if (sortOption === 'high-to-low' || sortOption === 'Price: High to Low') {
                        queryParams.append('sortBy', 'pricing.daily.discountedPrice');
                        queryParams.append('sortOrder', 'desc');
                    } else if (sortOption === 'newest' || sortOption === 'Newest First') {
                        queryParams.append('sortBy', 'createdAt');
                        queryParams.append('sortOrder', 'desc');
                    } else if (sortOption === 'Rating: High to Low') {
                        queryParams.append('sortBy', 'averageRating');
                        queryParams.append('sortOrder', 'desc');
                    }
                }

                // Add other moreFilters
                if (filters.moreFilters.carBrand) queryParams.append('make', filters.moreFilters.carBrand);
                if (filters.moreFilters.modelYear) queryParams.append('year', filters.moreFilters.modelYear);
                if (filters.moreFilters.seats) {
                    const seatsMatch = filters.moreFilters.seats.match(/\d+/);
                    if (seatsMatch) {
                        queryParams.append('seatingCapacity', seatsMatch[0]);
                    }
                }
                if (filters.moreFilters.vehicleType) queryParams.append('bodyType', filters.moreFilters.vehicleType);
                if (filters.moreFilters.carFeatures.length > 0) queryParams.append('technicalFeatures', filters.moreFilters.carFeatures.join(','));
                if (filters.moreFilters.paymentMode) queryParams.append('paymentModes', filters.moreFilters.paymentMode);
                if (filters.moreFilters.transmission) queryParams.append('gearbox', filters.moreFilters.transmission);
                if (filters.moreFilters.fuelType) queryParams.append('fuelType', filters.moreFilters.fuelType);
                if (filters.moreFilters.carColor) queryParams.append('exteriorColor', filters.moreFilters.carColor);
                if (filters.moreFilters.minAge) queryParams.append('minimumAge', filters.moreFilters.minAge);

                // Debug logs
                console.log('Location filter value:', filters.moreFilters.location);
                console.log('Final query params:', queryParams.toString());

                // Determine the correct API endpoint
                let apiUrl;
                if (filters.category) {
                    const categorySlug = filters.category.toLowerCase().replace(/\s+/g, '-');
                    apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public/category/${categorySlug}`;
                } else if (filters.selectedCarType || filters.moreFilters.vehicleType) {
                    const bodyType = filters.selectedCarType || filters.moreFilters.vehicleType;
                    const bodyTypeSlug = bodyType.toLowerCase().replace(/\s+/g, '-');
                    apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public/body-type/${bodyTypeSlug}`;
                } else if (filters.moreFilters.carBrand) {
                    const brandSlug = filters.moreFilters.carBrand.toLowerCase().replace(/\s+/g, '-');
                    apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public/brand/${brandSlug}`;
                } else {
                    apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public`;
                }

                // Remove redundant params from query since they're in the URL
                if (filters.category) {
                    queryParams.delete('category');
                }
                if (filters.selectedCarType || filters.moreFilters.vehicleType) {
                    queryParams.delete('bodyType');
                }
                if (filters.moreFilters.carBrand) {
                    queryParams.delete('make');
                }

                const finalUrl = `${apiUrl}?${queryParams.toString()}`;
                console.log('API URL:', finalUrl);

                const response = await fetch(finalUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('API Response:', data);

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch car listings');
                }

                setCars(data.cars || []);
                setTotalPages(data.totalPages || 1);
                setTotalItems(data.total || 0);
                setCurrentPage(data.currentPage || 1);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'An error occurred while fetching car listings');
            } finally {
                setIsLoading(false);
            }
        }, 300),
        [filters]
    );

    useEffect(() => {
        fetchCars(currentPage);
    }, [fetchCars, currentPage, filters]);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="space-y-6" aria-live="polite">
                            {isLoading && <div className="text-center text-gray-600">Loading car listings...</div>}
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm" role="alert">
                                    {error}
                                </div>
                            )}
                            {!isLoading && !error && cars.length === 0 && (
                                <div className="text-center text-gray-600">No car listings found for the selected location.</div>
                            )}
                            {!isLoading &&
                                cars.map((car) => <CarListingCard key={car._id} car={car} />)}
                        </div>
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                    <div className="lg:w-[360px] flex-shrink-0">
                        <div className="sticky top-4 space-y-6">
                            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white">
                                <h3 className="text-xl font-medium mb-4">Exclusive Member Benefits</h3>
                                <ul className="space-y-3">
                                    {['Priority vehicle reservations', 'Complimentary delivery', 'Exclusive discounts', '24/7 VIP concierge'].map((benefit) => (
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