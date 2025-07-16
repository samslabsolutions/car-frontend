import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CarCategories from '../components/CarRentalSection';

export default function Home() {
    return (
        <div className="font-sans antialiased">
            <Navbar />
            <HeroSection />
            <CarCategories />
        </div>
    );
}