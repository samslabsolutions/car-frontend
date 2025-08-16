import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PrivacyPolicyPage from '../../components/PrivacyPolicyPage';


export default function ListCar() {
    return (
        <>
            <Navbar />
            <PrivacyPolicyPage />
            <Footer />
        </>
    )
}