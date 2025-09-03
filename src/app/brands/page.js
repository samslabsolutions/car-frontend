'use client';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BrandPage from '../../components/brandPage';

export default function BrandsPage() {
    return (
        <>
            <Head>
                <title>All Car Brands | Premium Car Rentals</title>
                <meta name="description" content="Explore all premium car brands available for rent. Find luxury and performance vehicles from Mercedes, BMW, Audi, Ferrari, Lamborghini and more." />
            </Head>

            <div className="font-sans antialiased">
                <Navbar />
                <main>
                    <BrandPage />
                </main>
                <Footer />
            </div>
        </>
    );
}