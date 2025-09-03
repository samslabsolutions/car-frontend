'use client';
import Head from 'next/head';
import { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Dynamically import ALL components to prevent SSR issues
const CarFilterSection = dynamic(() => import('../../components/CarFilterSection'), {
    ssr: false,
    loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded"></div>
});

const BreadcrumbHeader = dynamic(() => import('../../components/text'), {
    ssr: false,
    loading: () => <div className="h-8 bg-gray-100 animate-pulse rounded"></div>
});

const CarListingCard = dynamic(() => import('../../components/CarListingCard'), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded mb-4"></div>
});

const CarRentalPricing = dynamic(() => import('../../components/CarRentalPricing'), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded mb-4"></div>
});

const DubaiCarRentalSection = dynamic(() => import('../../components/DubaiCarRentalSection'), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded mb-4"></div>
});

const FAQ = dynamic(() => import('../../components/FAQ'), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded mb-4"></div>
});

const PopularLocations = dynamic(() => import('../../components/PopularLocations'), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded mb-4"></div>
});

// Create a context for filters
export const FilterContext = createContext();

export default function RentPage() {
    const router = useRouter();
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

    // Wait for component to mount before accessing router.query
    useEffect(() => {
        setMounted(true);
    }, []);

    // Read query parameters and update filters - using router.query instead of useSearchParams
    useEffect(() => {
        if (!mounted || !router.isReady) return;

        const { city, location } = router.query;
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
    }, [router.query, router.isReady, mounted]);

    // Show loading state until mounted
    if (!mounted) {
        return (
            <>
                <Head>
                    <title>Car Rentals | Premium Car Rentals</title>
                    <meta name="description" content="Find cars for rent in Dubai. Filter by brand, price, and more." />
                </Head>
                <div className="font-sans antialiased">
                    <Navbar />
                    <main className="min-h-screen">
                        <div className="container mx-auto px-4 py-8">
                            <div className="animate-pulse space-y-4">
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                                <div className="h-40 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </main>
                    <Footer />
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
                    <Navbar />
                    <main>
                        <CarFilterSection />
                        <BreadcrumbHeader />
                        <CarListingCard />
                        <CarRentalPricing />
                        <DubaiCarRentalSection />
                        <FAQ />
                        <PopularLocations />
                    </main>
                    <Footer />
                </FilterContext.Provider>
            </div>
        </>
    );
}