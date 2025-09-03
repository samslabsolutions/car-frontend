'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CarFilterSection from '../../../components/CarFilterSection';
import CarListingCard from '../../../components/CarListingCard';
import { FilterContext } from '../../rent/page';

export default function BrandPage() {
    const { make } = useParams();
    const [filters, setFilters] = useState({
        location: '',
        selectedRental: '',
        minPrice: '',
        maxPrice: '',
        selectedCarType: '',
        selectedSort: '',
        moreFilters: {
            location: '',
            carBrand: decodeURIComponent(make), // Preselect the brand from URL
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

    return (
        <>
            <Head>
                <title>{`${decodeURIComponent(make)} Cars for Rent | Premium Car Rentals`}</title>
                <meta name="description" content={`Explore ${decodeURIComponent(make)} cars for rent in Dubai.`} />
            </Head>
            <div className="font-sans antialiased">
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <Navbar />
                    <main>
                        <CarFilterSection />
                        <CarListingCard />
                    </main>
                    <Footer />
                </FilterContext.Provider>
            </div>
        </>
    );
}