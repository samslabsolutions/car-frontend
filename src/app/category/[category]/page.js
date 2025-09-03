'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CarFilterSection from '../../../components/CarFilterSection';
import CarListingCard from '../../../components/CarListingCard';
import { FilterContext } from '../../rent/page';

export default function CategoryPage() {
    const { category } = useParams();

    // Convert slug back to category name
    const categoryName = decodeURIComponent(category)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Map common slug variations to exact category names
    const categoryMapping = {
        'economy-cars': 'Economy Cars',
        'luxury-car-rental-dubai': 'Luxury Car Rental Dubai',
        'sports-car-rental-dubai': 'Sports Car Rental Dubai',
        'special-edition': 'Special Edition',
        'muscle-cars': 'Muscle Cars',
        'no-deposit-cars': 'No Deposit Cars',
        'electric-cars': 'Electric Cars'
    };

    const exactCategoryName = categoryMapping[category] || categoryName;

    const [filters, setFilters] = useState({
        location: '',
        selectedRental: '',
        minPrice: '',
        maxPrice: '',
        selectedCarType: '',
        selectedSort: '',
        category: exactCategoryName, // Add category filter
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

    return (
        <>
            <Head>
                <title>{`${exactCategoryName} | Premium Car Rentals`}</title>
                <meta name="description" content={`Browse ${exactCategoryName.toLowerCase()} for rent in Dubai.`} />
            </Head>
            <div className="font-sans antialiased">
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <Navbar />
                    <main>
                        <CarFilterSection />
                        <div className="bg-white py-4 border-b">
                            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {exactCategoryName}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Discover premium {exactCategoryName.toLowerCase()} available for rent
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