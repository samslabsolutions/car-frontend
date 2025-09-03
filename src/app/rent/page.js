'use client';
import Head from 'next/head';
import { useState, createContext, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Force this page to be dynamic
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Create a context for filters
export const FilterContext = createContext();

// Dynamic imports with no SSR
const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false });
const CarFilterSection = dynamic(() => import('../../components/CarFilterSection'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });
const BreadcrumbHeader = dynamic(() => import('../../components/text'), { ssr: false });
const CarListingCard = dynamic(() => import('../../components/CarListingCard'), { ssr: false });
const CarRentalPricing = dynamic(() => import('../../components/CarRentalPricing'), { ssr: false });
const DubaiCarRentalSection = dynamic(() => import('../../components/DubaiCarRentalSection'), { ssr: false });
const PopularLocations = dynamic(() => import('../../components/PopularLocations'), { ssr: false });
const FAQ = dynamic(() => import('../../components/FAQ'), { ssr: false });

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