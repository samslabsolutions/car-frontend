import Head from 'next/head';
import Navbar from '../../components/Navbar';
import CarFilterSection from '../../components/CarFilterSection';
import Footer from '../../components/Footer';

export default function RentPage() {
    return (
        <>
            <Head>
                <title>Car Rentals | Premium Car Rentals</title>
                <meta name="description" content="Find cars for rent in Dubai. Filter by brand, price, and more." />
            </Head>

            <div className="font-sans antialiased">
                <Navbar />
                <main >
                    <CarFilterSection />

                </main>
                <Footer />
            </div>
        </>
    );
}
