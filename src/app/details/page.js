import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CarFilterSection from '../../components/CarFilterSection';
import BreadcrumbHeader from '../../components/text';
import CarDetails from '../../components/CarDetails';
import RentalListing from '../../components/RentalListing';
import RecommendedCar from '../../components/RecommendedCars';

export default function Details() {
    return (
        <>
            <Navbar />
            <CarFilterSection />
            <BreadcrumbHeader />
            <CarDetails />
            <RentalListing />
            <RecommendedCar />
            <Footer />
        </>
    )
}