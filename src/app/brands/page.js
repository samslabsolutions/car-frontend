import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CarBrandCard from '../../components/brandPage';

export default function brands() {
    return (
        <>
            <Navbar />
            <CarBrandCard />
            <Footer />
        </>
    )
}