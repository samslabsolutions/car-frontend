import Head from 'next/head';
import Navbar from '../../components/Navbar';
import CarFilterSection from '../../components/CarFilterSection';
import Footer from '../../components/Footer';
import BreadcrumbHeader from '../../components/text'
import CarListingCard from '../../components/CarListingCard'
import Pagination from '../../components/Pagination'
import CarRentalPricing from '../../components/CarRentalPricing'
import DubaiCarRentalSection from '../../components/DubaiCarRentalSection'
import PopularLocations from '../../components/PopularLocations'
import FAQ from '../../components/FAQ';

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
                    <BreadcrumbHeader />
                    <CarListingCard />
                    <Pagination />
                    <CarRentalPricing />
                    <DubaiCarRentalSection />
                    <FAQ />
                    <PopularLocations />

                </main>
                <Footer />
            </div>
        </>
    );
}
