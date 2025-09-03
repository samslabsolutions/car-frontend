'use client';
import Head from 'next/head';
import { useState, createContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CarFilterSection from '../../components/CarFilterSection';
import Footer from '../../components/Footer';
import BreadcrumbHeader from '../../components/text';
import CarListingCard from '../../components/CarListingCard';
import CarRentalPricing from '../../components/CarRentalPricing';
import DubaiCarRentalSection from '../../components/DubaiCarRentalSection';
import PopularLocations from '../../components/PopularLocations';
import FAQ from '../../components/FAQ';

// Create a context for filters
export const FilterContext = createContext();

export default function RentPage() {
    const [isClient, setIsClient] = useState(false);
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

    // Set client-side only after mount
    useEffect(() => {
        setIsClient(true);

        // Read URL parameters on client side only
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
    }, []);

    return (
        <>
            <Head>
                <title>Car Rentals | Premium Car Rentals</title>
                <meta name="description" content="Find cars for rent in Dubai. Filter by brand, price, and more." />
            </Head>

            <div className="font-sans antialiased">
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <Navbar />
                    {isClient ? (
                        <main>
                            <CarFilterSection />
                            <BreadcrumbHeader />
                            <CarListingCard />
                            <CarRentalPricing />
                            <DubaiCarRentalSection />
                            <FAQ />
                            <PopularLocations />
                        </main>
                    ) : (
                        <main className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Loading Car Rentals...</h2>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            </div>
                        </main>
                    )}
                    <Footer />
                </FilterContext.Provider>
            </div>
        </>
    );
}