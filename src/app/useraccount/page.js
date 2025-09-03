import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserDashboard from '../../components/userDashboard';



export default function ListCar() {
    return (
        <>
            <Navbar />
            <UserDashboard />



            <Footer />
        </>
    )
}