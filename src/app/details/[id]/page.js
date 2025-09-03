'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CarDetails from '../../../components/CarDetails';
import RentalListing from '../../../components/RentalListing';
import RecommendedCar from '../../../components/RecommendedCars';

export default function Details() {
    const { id: slug } = useParams();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCarBySlug = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cars/public/slug/${slug}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch car details');
                }
                setCar(data.car);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching car details');
            } finally {
                setIsLoading(false);
            }
        };
        if (slug) fetchCarBySlug();
    }, [slug]);

    if (isLoading) return <div className="text-center text-gray-600">Loading car details...</div>;
    if (error) return <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm" role="alert">{error}</div>;
    if (!car) return <div className="text-center text-gray-600">Car not found</div>;

    return (
        <>
            <Head>
                <title>{`${car.make} ${car.model} ${car.year} Details`}</title>
                <meta name="description" content="Car rental details page" />
            </Head>
            <Navbar />
            <CarDetails car={car} />
            <RentalListing car={car} />
            <RecommendedCar carId={car._id} />
            <Footer />
        </>
    );
}