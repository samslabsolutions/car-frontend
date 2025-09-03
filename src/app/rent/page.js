'use client';
import Head from 'next/head';
import { useState, createContext, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();

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

    // Read query parameters and update filters
    useEffect(() => {
        const city = searchParams.get('city');
        const location = searchParams.get('location');
        const selectedLocation = city || location || ''; // Prefer location over city if both are present
        if (selectedLocation) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                moreFilters: {
                    ...prevFilters.moreFilters,
                    location: decodeURIComponent(selectedLocation),
                },
            }));
        }
    }, [searchParams]);

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