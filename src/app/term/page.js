import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TermsAndConditions from '../../components/TermsAndConditions';



export default function ListCar() {
    return (
        <>
            <Navbar />
            <TermsAndConditions />

            <Footer />
        </>
    )
}