import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ListYourCarPage from '../../components/ListYourCarPage'
import PricingSection from '../../components/pricingSection';
import TestimonialsSection from '../../components/TestimonialsSection';

// import BreadcrumbHeader from '../../components/text';


export default function ListCar() {
    return (
        <>
            <Navbar />
            <ListYourCarPage />
            <PricingSection />
            <TestimonialsSection />


            <Footer />
        </>
    )
}