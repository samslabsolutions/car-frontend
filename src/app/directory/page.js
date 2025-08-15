import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CarRentalDirectory from '../../components/CarRentalDirectory';


// import BreadcrumbHeader from '../../components/text';


export default function ListCar() {
    return (
        <>
            <Navbar />
            <CarRentalDirectory />


            <Footer />
        </>
    )
}