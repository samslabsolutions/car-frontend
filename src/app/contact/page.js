import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactUsPage from '../../components/contact';

export default function contact() {
    return (
        <>
            <Navbar />
            <ContactUsPage />
            <Footer />
        </>
    )
}