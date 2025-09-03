'use client';
import Head from 'next/head';
import { useState, createContext, useEffect } from 'react';
import { lazy, Suspense } from 'react';

// Force this page to be dynamic
export const revalidate = 0;

// Create a context for filters
export const FilterContext = createContext();

// Lazy load components
const Navbar = lazy(() => import('../../components/Navbar'));
const CarFilterSection = lazy(() => import('../../components/CarFilterSection'));
const Footer = lazy(() => import('../../components/Footer'));
const BreadcrumbHeader = lazy(() => import('../../components/text'));
const CarListingCard = lazy(() => import('../../components/CarListingCard'));
const CarRentalPricing = lazy(() => import('../../components/CarRentalPricing'));
const DubaiCarRentalSection = lazy(() => import('../../components/DubaiCarRentalSection'));
const PopularLocations = lazy(() => import('../../components/PopularLocations'));
const FAQ = lazy(() => import('../../components/FAQ'));

export default function RentPage() {
    const [mounted, setMounted] = useState(false);
    const [filters, setFilters] = useState({
        transactionType: 'Rent',
        location: '',
        status: 'All',
        propertyType: 'Residential',
        bedsAndBaths: 'Beds & Baths',
        selectedRental: '',
        minPrice: '',
        maxPrice: '',
        selectedSort: '',
        selectedCarType: '',
        moreFilters: {
            location: '',
            carBrand: '',
            modelYear: '',
            seats: '',
            vehicleType: '',
            priceRange: { min: '', max: '' },
            rentalPeriod: '',
            carFeatures: [],
            paymentMode: '',
            transmission: '',
            fuelType: '',
            carColor: '',
            minAge: '',
            sortBy: '',
        },
    });

    useEffect(() => {
        setMounted(true);

        // Read URL parameters manually
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const city = urlParams.get('city');
            const location = urlParams.get('location');
            const selectedLocation = city || location || '';

            if (selectedLocation) {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    moreFilters: {
                        ...prevFilters.moreFilters,
                        location: decodeURIComponent(selectedLocation),
                    },
                }));
            }
        }
    }, []);

    if (!mounted) {
        return (
            <>
                <Head>
                    <title>Car Rentals | Premium Car Rentals</title>
                    <meta name="description" content="Find cars for rent in Dubai. Filter by brand, price, and more." />
                </Head>
                <div className="font-sans antialiased">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Loading Car Rentals...</h2>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Car Rentals | Premium Car Rentals</title>
                <meta name="description" content="Find cars for rent in Dubai. Filter by brand, price, and more." />
            </Head>

            <div className="font-sans antialiased">
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse"></div>}>
                        <Navbar />
                    </Suspense>
                    <main>
                        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <CarFilterSection />
                        </Suspense>
                        <Suspense fallback={<div className="h-8 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <BreadcrumbHeader />
                        </Suspense>
                        <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <CarListingCard />
                        </Suspense>
                        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <CarRentalPricing />
                        </Suspense>
                        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <DubaiCarRentalSection />
                        </Suspense>
                        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <FAQ />
                        </Suspense>
                        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded m-4"></div>}>
                            <PopularLocations />
                        </Suspense>
                    </main>
                    <Suspense fallback={<div className="h-20 bg-gray-900 animate-pulse"></div>}>
                        <Footer />
                    </Suspense>
                </FilterContext.Provider>
            </div>
        </>
    );
}