import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VehicleCategories from '../components/VehicleCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import CarInfoBox from '../components/carInfo';
import AllBrands from '../components/AllBrands';
import LocationSelector from '../components/LocationSelector';
import DocumentsSection from '../components/DocumentsSection';
import AffordableCar from '../components/AffordableCar';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import LuxuryCar from '../components/LuxuryCars'
import SportCar from '../components/SuperCar'
import PopularLocations from '../components/PopularLocations'

export default function Home() {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Home | Premium Car Rentals</title>
            </Head>

            <div className="font-sans antialiased">
                <Navbar />
                <HeroSection />
                <VehicleCategories />
                <CarInfoBox />
                <LuxuryCar />
                <SportCar />
                <AffordableCar />
                <WhyChooseUs />
                <AllBrands />
                <LocationSelector />
                <DocumentsSection />
                <FAQ />
                <PopularLocations />
                <Footer />
            </div>
        </>
    );
}
