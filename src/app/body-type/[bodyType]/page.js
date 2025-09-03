'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CarFilterSection from '../../../components/CarFilterSection';
import CarListingCard from '../../../components/CarListingCard';
import { FilterContext } from '../../rent/page';

export default function BodyTypePage() {
    const { bodyType } = useParams();

    // Convert slug back to body type name
    const bodyTypeName = decodeURIComponent(bodyType)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Map common slug variations to exact body type names
    const bodyTypeMapping = {
        'suv': 'SUV',
        'crossover': 'Crossover',
        'sedan': 'Sedan',
        'convertible': 'Convertible',
        'compact': 'Compact',
        'van': 'Van',
        'hatchback': 'Hatchback',
        'coupe': 'Coupe',
        'special-needs': 'Special Needs',
        'hybrid': 'Hybrid',
        'pickup-truck': 'Pickup Truck',
        'bus': 'Bus'
    };

    const exactBodyTypeName = bodyTypeMapping[bodyType] || bodyTypeName;

    const [filters, setFilters] = useState({
        location: '',
        selectedRental: '',
        minPrice: '',
        maxPrice: '',
        selectedCarType: exactBodyTypeName, // Set the body type filter
        selectedSort: '',
        moreFilters: {
            location: '',
            carBrand: '',
            modelYear: '',
            seats: '',
            vehicleType: exactBodyTypeName, // Also set in more filters
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
                <title>{`${exactBodyTypeName} Cars for Rent | Premium Car Rentals`}</title>
                <meta name="description" content={`Browse ${exactBodyTypeName.toLowerCase()} cars for rent in Dubai.`} />
            </Head>
            <div className="font-sans antialiased">
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <Navbar />
                    <main>
                        <CarFilterSection />
                        <div className="bg-white py-4 border-b">
                            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {exactBodyTypeName} Cars
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Explore our collection of {exactBodyTypeName.toLowerCase()} vehicles
                                </p>
                            </div>
                        </div>
                        <CarListingCard />
                    </main>
                    <Footer />
                </FilterContext.Provider>
            </div>
        </>
    );
}