"use client";
import React, { useState, useMemo } from "react";
import {
    Search,
    MapPin,
    Clock,
    Car,
    Truck,
    Navigation,
    Star,
    Filter,
    ChevronDown,
    Globe,
    Phone,
    Mail,
    ArrowRight,
    Zap,
    Shield,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DubaiLocationsPage = () => {
    const [selectedCity, setSelectedCity] = useState("Dubai");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const router = useRouter();

    const cities = [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "Ras Al Khaimah",
        "Istanbul",
        "Ankara",
        "Antalya",
        "Izmir",
        "Eskisehir",
        "Tbilisi",
        "London",
        "Muscat",
        "Marrakech",
        "Casablanca",
        "Salalah",
        "Sohar",
        "Sur",
        "Duqm",
        "Riyadh",
        "Al Khobar",
        "Amman",
        "Medina",
        "Jeddah",
        "Doha",
        "Agadir",
        "Tangier",
        "Rabat",
        "Oujda",
        "Fes",
        "Yanbu",
        "Al Jubail",
        "Fujairah",
        "Kuwait City",
        "Al Farwaniya",
        "Nador",
        "Mugla",
    ];

    const dubaiLocations = {
        A: [
            "Abu Hail",
            "Academic City",
            "Airport Terminal 1",
            "Airport Terminal 2",
            "Airport Terminal 3",
            "Akoya Oxygen",
            "Al Aweer",
            "Al Awir",
            "Al Badaa",
            "Al Barsha",
            "Al Estiqlal St",
            "Al Estiqlal Street",
            "Al Fahidi",
            "Al Furjan",
            "Al Garhoud",
            "Al Hudaiba",
            "Al Jaddaf",
            "Al Jafiliya",
            "Al Karama",
            "Al Khabaisi",
            "Al Khabisi",
            "Al Khail Gate",
            "Al Khawaneej",
            "Al Khawaneej 2",
            "Al Mamzar",
            "Al Manara",
            "Al Mina",
            "Al Mizhar",
            "Al Nahda",
            "Al Qouz",
            "Al Quoz",
            "Al Quoz 1",
            "Al Quoz 3",
            "Al Quoz Mall",
            "Al Qusais",
            "Al Qusais 2",
            "Al Rashidiya",
            "Al Rawda",
            "Al Rigga",
            "Al Safa",
            "Al Satwa",
            "Al Sufouh",
            "Al Twar",
            "Al Warqaa",
            "Al Warsan",
            "Al Wasl",
            "Al Yarmooq",
            "Arabian Ranches",
            "Arabian Ranches 2",
            "Arjan",
            "afrin",
        ],
        B: [
            "Barsha Heights",
            "Barsha Heights (Tecom)",
            "Bluewaters Island",
            "Bur Dubai",
            "Business Bay",
        ],
        C: ["Creek Harbour", "Culture Village"],
        D: [
            "DAMAC Hills (Akoya by DAMAC)",
            "DIFC",
            "Deira",
            "Deira city center",
            "Discovery Gardens",
            "Down Town Dubai",
            "Downtown Dubai",
            "Downtown Jebel Ali",
            "Dubai Airport",
            "Dubai Design District",
            "Dubai Festival City",
            "Dubai Harbour",
            "Dubai Hills Estate",
            "Dubai Industrial Park",
            "Dubai Industrial city",
            "Dubai Internet City",
            "Dubai Investment Park",
            "Dubai Mall",
            "Dubai Marina",
            "Dubai Media City",
            "Dubai Production City (IMPZ)",
            "Dubai Science Park",
            "Dubai Silicon Oasis",
            "Dubai South",
            "Dubai Sports City",
            "Dubai Studio City",
            "Dubai Waterfront",
            "Dubai World Central",
            "Dubai creek harbour",
            "Dubailand",
        ],
        E: ["Emaar South", "Emirates Golf Club", "Emirates Hills"],
        G: ["Garhoud", "Green Community"],
        H: ["Hor Al Anz"],
        I: ["Ibn Battuta Gate", "International City"],
        J: [
            "JBR",
            "JLT",
            "Jebel Ali",
            "Jebel Ali Village",
            "Jumeirah",
            "Jumeirah 1",
            "Jumeirah Golf Estate",
            "Jumeirah Heights",
            "Jumeirah Islands",
            "Jumeirah Park",
            "Jumeirah Village Circle",
            "Jumeirah Village Circle (JVC)",
            "Jumeirah Village Triangle (JVT)",
        ],
        K: ["Karama"],
        L: ["Liwan"],
        M: [
            "Majan",
            "Mall of the Emirates",
            "Meydan City",
            "Mirdif",
            "Mohammad Bin Rashid City",
            "Motor City",
            "Motor city",
            "Mudon",
            "Muhaisnah",
        ],
        N: ["Nad Al Hamar", "Nad Al Sheba", "Nad Al Sheba 1", "Naif"],
        O: ["Old Town", "Oud Al Muteena", "Oud Metha"],
        P: ["Palm Jumeirah", "Pearl Jumeirah", "Port Saeed"],
        R: ["Ras Al Khor", "Reem", "Remraam"],
        S: ["Salalah Airport", "Sharjah Airport", "Sheikh Zayed Road", "Silicon Oasis"],
        T: [
            "The Greens",
            "The Hills",
            "The Lagoons",
            "The Lakes",
            "The Meadows",
            "The Springs",
            "The Sustainable City",
            "The Views",
            "The Villa",
            "Town Square",
            "Trade Centre",
            "Trade Centre 1",
        ],
        U: ["Umm Al Sheif", "Umm Ramool", "Umm Suqeim", "Umm Suqeim 3"],
        W: ["Wadi Al Safa 2", "World Trade Centre"],
    };

    const alphabet = Object.keys(dubaiLocations).sort();

    const filteredLocations = useMemo(() => {
        let locations = dubaiLocations;

        if (selectedLetter) {
            locations = { [selectedLetter]: dubaiLocations[selectedLetter] || [] };
        }

        if (searchQuery) {
            const filtered = {};
            Object.keys(locations).forEach((letter) => {
                const matchedLocations = locations[letter].filter((location) =>
                    location.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (matchedLocations.length > 0) {
                    filtered[letter] = matchedLocations;
                }
            });
            locations = filtered;
        }

        return locations;
    }, [selectedLetter, searchQuery]);

    const totalLocations = Object.values(dubaiLocations).flat().length;

    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Fast Delivery",
            description: "Quick car delivery to your location",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Verified Partners",
            description: "All rental companies are verified",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "24/7 Support",
            description: "Round the clock customer service",
        },
    ];

    // Handle city selection
    const handleCityClick = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
        router.push(`/rent?city=${encodeURIComponent(city)}`);
    };

    // Handle location click
    const handleLocationClick = (location) => {
        router.push(`/rent?location=${encodeURIComponent(location)}`);
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative py-16 sm:py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')]"></div>
                </div>
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative mb-[-122px]">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl lg:text-[36px] font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">
                            Car Rental Locations in
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}
                                Dubai
                            </span>
                        </h1>
                        <p className="text-base font-regular text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                            Find the most convenient car rental location near you. We serve over{" "}
                            {totalLocations} locations across Dubai with fast delivery and
                            verified partners.
                        </p>

                        {/* City Selector */}
                        <div className="relative inline-block mb-8">
                            <button
                                onClick={() => setShowCityDropdown(!showCityDropdown)}
                                className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-900 flex items-center space-x-2 hover:border-blue-500 transition-colors min-w-[200px] justify-between shadow-sm"
                            >
                                <div className="flex items-center space-x-2">
                                    <Globe className="w-5 h-5 text-blue-600" />
                                    <span>{selectedCity}</span>
                                </div>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {showCityDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {cities.map((city) => (
                                        <button
                                            key={city}
                                            onClick={() => handleCityClick(city)}
                                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedCity === city
                                                ? "bg-blue-50 text-blue-600 font-medium"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center space-x-3 bg-gray-50 p-4 rounded-xl"
                                >
                                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0 text-blue-600">
                                        {feature.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-medium text-gray-900 text-sm">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-gray-50 py-8">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search locations in Dubai..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Alphabet Filter */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedLetter("")}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLetter === ""
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    All
                                </button>
                                {alphabet.map((letter) => (
                                    <button
                                        key={letter}
                                        onClick={() => setSelectedLetter(letter)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLetter === letter
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locations Grid */}
            <div className="py-16">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    {Object.keys(filteredLocations).length === 0 ? (
                        <div className="text-center py-12">
                            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                No locations found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {Object.keys(filteredLocations)
                                .sort()
                                .map((letter) => (
                                    <div key={letter} className="space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                                {letter}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-semibold text-gray-900">
                                                    {letter.toUpperCase()}
                                                </h2>
                                                <p className="text-gray-600">
                                                    {filteredLocations[letter].length} locations
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {filteredLocations[letter].map((location, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleLocationClick(location)}
                                                    className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group text-left"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                                {location}
                                                            </h3>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                <div className="flex items-center space-x-1">
                                                                    <Car className="w-4 h-4" />
                                                                    <span>Available</span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    <span>Fast delivery</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DubaiLocationsPage;