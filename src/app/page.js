import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CarCategories from '../components/CarRentalSection';
import WhyChooseUs from '../components/WhyChooseUs';
import CarInfoBox from '../components/carInfo';

export default function Home() {
    return (
        <div className="font-sans antialiased">
            <Navbar />
            <HeroSection />
            <CarCategories />
            <CarInfoBox />
            <WhyChooseUs />

        </div>
    );
}