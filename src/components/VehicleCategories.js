"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Plus } from 'lucide-react';

export default function VehicleCategories() {
    const [selectedCategory, setSelectedCategory] = useState('Electric');
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollContainerRef = useRef(null);

    const categories = [
        'Electric',
        'SUV',
        'Sedan',
        'Pickup Truck',
        'Luxury',
        'Crossover',
        'Hybrid',
        'Diesel',
        'Coupe',
        'Hatchback',
        'Wagon',
        'Convertible',
        'Minivan',
        'Sports Car',
        'Truck',
        'Compact',
        'Roadster',
        'Off-Road',
        'Van',
        'Motorcycle'
    ];

    // Electric category image URLs for random selection
    const electricImages = [
        'https://platform.cstatic-images.com/medium/in/v2/stock_photos/51cf8653-25c1-4cf3-9952-d2bf46ae163f/9a18349b-d027-4bb0-8df3-1f2927247240.png',
        'https://platform.cstatic-images.com/medium/in/v2/stock_photos/1df33572-62aa-46af-9898-4f54ea0a95b3/aacf2faf-1ebb-4584-a293-d6d961267f4f.png',
        'https://platform.cstatic-images.com/medium/in/v2/stock_photos/4c1c5b20-634b-49a0-91c8-948f8da31b0e/d98f6098-1593-4d99-91d1-203d3555d45b.png',
        'https://platform.cstatic-images.com/medium/in/v2/stock_photos/ceb0f89f-dc23-445c-8b7b-8a4ed6ef54dd/103808f8-b776-4fe2-8c64-0515db271d9e.png',
        'https://platform.cstatic-images.com/medium/in/v2/stock_photos/646a9b5a-811f-4162-9936-13cc8bbd74d5/f94e6d23-d38d-497c-8920-8fee02879159.png'
    ];

    // Function to get a random image from electricImages
    const getRandomElectricImage = () => {
        return electricImages[Math.floor(Math.random() * electricImages.length)];
    };

    // Car data organized by category
    const carData = {
        'Electric': [
            {
                id: 1,
                name: 'Tesla Model S',
                price: 89990,
                image: 'https://platform.cstatic-images.com/medium/in/v2/stock_photos/51cf8653-25c1-4cf3-9952-d2bf46ae163f/9a18349b-d027-4bb0-8df3-1f2927247240.png'
            },
            {
                id: 2,
                name: 'BMW iX',
                price: 84100,
                image: 'https://platform.cstatic-images.com/medium/in/v2/stock_photos/1df33572-62aa-46af-9898-4f54ea0a95b3/aacf2faf-1ebb-4584-a293-d6d961267f4f.png'
            },
            {
                id: 3,
                name: 'Mercedes EQS',
                price: 104400,
                image: 'https://platform.cstatic-images.com/medium/in/v2/stock_photos/4c1c5b20-634b-49a0-91c8-948f8da31b0e/d98f6098-1593-4d99-91d1-203d3555d45b.png'
            },
            {
                id: 4,
                name: 'Audi e-tron GT',
                price: 107300,
                image: 'https://platform.cstatic-images.com/medium/in/v2/stock_photos/ceb0f89f-dc23-445c-8b7b-8a4ed6ef54dd/103808f8-b776-4fe2-8c64-0515db271d9e.png'
            },
            {
                id: 5,
                name: 'Lucid Air',
                price: 87400,
                image: 'https://platform.cstatic-images.com/medium/in/v2/stock_photos/646a9b5a-811f-4162-9936-13cc8bbd74d5/f94e6d23-d38d-497c-8920-8fee02879159.png'
            }
        ],
        'SUV': [
            {
                id: 6,
                name: 'Toyota Highlander',
                price: 37275,
                image: getRandomElectricImage()
            },
            {
                id: 7,
                name: 'Honda CR-V',
                price: 33200,
                image: getRandomElectricImage()
            },
            {
                id: 8,
                name: 'BMW X5',
                price: 62200,
                image: getRandomElectricImage()
            },
            {
                id: 9,
                name: 'Mercedes GLE',
                price: 58050,
                image: getRandomElectricImage()
            },
            {
                id: 10,
                name: 'Audi Q7',
                price: 59100,
                image: getRandomElectricImage()
            }
        ],
        'Sedan': [
            {
                id: 11,
                name: '2025 Toyota Camry',
                price: 26395,
                image: getRandomElectricImage()
            },
            {
                id: 12,
                name: '2025 Honda Accord',
                price: 27295,
                image: getRandomElectricImage()
            },
            {
                id: 13,
                name: '2025 BMW 3 Series',
                price: 36200,
                image: getRandomElectricImage()
            },
            {
                id: 14,
                name: '2025 Mercedes C-Class',
                price: 45900,
                image: getRandomElectricImage()
            },
            {
                id: 15,
                name: '2025 Audi A4',
                price: 40500,
                image: getRandomElectricImage()
            }
        ],
        'Pickup Truck': [
            {
                id: 16,
                name: '2025 Ford F-150',
                price: 37240,
                image: getRandomElectricImage()
            },
            {
                id: 17,
                name: '2025 Chevrolet Silverado',
                price: 34600,
                image: getRandomElectricImage()
            },
            {
                id: 18,
                name: '2025 RAM 1500',
                price: 40275,
                image: getRandomElectricImage()
            },
            {
                id: 19,
                name: '2025 Toyota Tundra',
                price: 39965,
                image: getRandomElectricImage()
            },
            {
                id: 20,
                name: '2025 GMC Sierra',
                price: 36200,
                image: getRandomElectricImage()
            }
        ],
        'Luxury': [
            {
                id: 21,
                name: '2025 Mercedes S-Class',
                price: 117350,
                image: getRandomElectricImage()
            },
            {
                id: 22,
                name: '2025 BMW 7 Series',
                price: 93300,
                image: getRandomElectricImage()
            },
            {
                id: 23,
                name: '2025 Audi A8',
                price: 87200,
                image: getRandomElectricImage()
            },
            {
                id: 24,
                name: '2025 Lexus LS',
                price: 77635,
                image: getRandomElectricImage()
            },
            {
                id: 25,
                name: '2025 Genesis G90',
                price: 66950,
                image: getRandomElectricImage()
            }
        ],
        'Crossover': [
            {
                id: 26,
                name: '2025 Toyota RAV4',
                price: 28725,
                image: getRandomElectricImage()
            },
            {
                id: 27,
                name: '2025 Honda Passport',
                price: 36750,
                image: getRandomElectricImage()
            },
            {
                id: 28,
                name: '2025 Subaru Outback',
                price: 29755,
                image: getRandomElectricImage()
            },
            {
                id: 29,
                name: '2025 Mazda CX-5',
                price: 28200,
                image: getRandomElectricImage()
            },
            {
                id: 30,
                name: '2025 Nissan Rogue',
                price: 29020,
                image: getRandomElectricImage()
            }
        ],
        'Hybrid': [
            {
                id: 31,
                name: '2025 Toyota Prius',
                price: 27950,
                image: getRandomElectricImage()
            },
            {
                id: 32,
                name: '2025 Honda CR-V Hybrid',
                price: 35200,
                image: getRandomElectricImage()
            },
            {
                id: 33,
                name: '2025 Ford Escape Hybrid',
                price: 33040,
                image: getRandomElectricImage()
            },
            {
                id: 34,
                name: '2025 Lexus NX Hybrid',
                price: 43065,
                image: getRandomElectricImage()
            },
            {
                id: 35,
                name: '2025 Hyundai Tucson Hybrid',
                price: 32650,
                image: getRandomElectricImage()
            }
        ],
        'Diesel': [
            {
                id: 36,
                name: '2025 Chevrolet Silverado Diesel',
                price: 45100,
                image: getRandomElectricImage()
            },
            {
                id: 37,
                name: '2025 RAM 1500 Diesel',
                price: 47530,
                image: getRandomElectricImage()
            },
            {
                id: 38,
                name: '2025 GMC Sierra Diesel',
                price: 46300,
                image: getRandomElectricImage()
            },
            {
                id: 39,
                name: '2025 Ford F-250 Diesel',
                price: 50705,
                image: getRandomElectricImage()
            },
            {
                id: 40,
                name: '2025 Jeep Gladiator Diesel',
                price: 49620,
                image: getRandomElectricImage()
            }
        ],
        'Coupe': [
            {
                id: 41,
                name: '2025 BMW 4 Series',
                price: 48100,
                image: getRandomElectricImage()
            },
            {
                id: 42,
                name: '2025 Audi A5 Coupe',
                price: 47500,
                image: getRandomElectricImage()
            },
            {
                id: 43,
                name: '2025 Mercedes C-Class Coupe',
                price: 49900,
                image: getRandomElectricImage()
            },
            {
                id: 44,
                name: '2025 Chevrolet Camaro',
                price: 30900,
                image: getRandomElectricImage()
            },
            {
                id: 45,
                name: '2025 Dodge Challenger',
                price: 32495,
                image: getRandomElectricImage()
            }
        ],
        'Hatchback': [
            {
                id: 46,
                name: '2025 Honda Civic Hatchback',
                price: 25100,
                image: getRandomElectricImage()
            },
            {
                id: 47,
                name: '2025 Toyota Corolla Hatchback',
                price: 23565,
                image: getRandomElectricImage()
            },
            {
                id: 48,
                name: '2025 Mazda3 Hatchback',
                price: 24500,
                image: getRandomElectricImage()
            },
            {
                id: 49,
                name: '2025 Volkswagen Golf GTI',
                price: 31965,
                image: getRandomElectricImage()
            },
            {
                id: 50,
                name: '2025 Hyundai Veloster',
                price: 23300,
                image: getRandomElectricImage()
            }
        ],
        'Wagon': [
            {
                id: 51,
                name: '2025 Volvo V60',
                price: 41300,
                image: getRandomElectricImage()
            },
            {
                id: 52,
                name: '2025 Audi A4 Allroad',
                price: 46200,
                image: getRandomElectricImage()
            },
            {
                id: 53,
                name: '2025 Subaru Outback',
                price: 29755,
                image: getRandomElectricImage()
            },
            {
                id: 54,
                name: '2025 Mercedes E-Class Wagon',
                price: 68000,
                image: getRandomElectricImage()
            },
            {
                id: 55,
                name: '2025 BMW 3 Series Touring',
                price: 45000,
                image: getRandomElectricImage()
            }
        ],
        'Convertible': [
            {
                id: 56,
                name: '2025 Mazda MX-5 Miata',
                price: 28985,
                image: getRandomElectricImage()
            },
            {
                id: 57,
                name: '2025 Ford Mustang Convertible',
                price: 39520,
                image: getRandomElectricImage()
            },
            {
                id: 58,
                name: '2025 BMW Z4',
                price: 52900,
                image: getRandomElectricImage()
            },
            {
                id: 59,
                name: '2025 Audi A5 Convertible',
                price: 54100,
                image: getRandomElectricImage()
            },
            {
                id: 60,
                name: '2025 Mercedes C-Class Convertible',
                price: 57100,
                image: getRandomElectricImage()
            }
        ],
        'Minivan': [
            {
                id: 61,
                name: '2025 Honda Odyssey',
                price: 39040,
                image: getRandomElectricImage()
            },
            {
                id: 62,
                name: '2025 Toyota Sienna',
                price: 37185,
                image: getRandomElectricImage()
            },
            {
                id: 63,
                name: '2025 Chrysler Pacifica',
                price: 38990,
                image: getRandomElectricImage()
            },
            {
                id: 64,
                name: '2025 Kia Carnival',
                price: 34100,
                image: getRandomElectricImage()
            },
            {
                id: 65,
                name: '2025 Dodge Grand Caravan',
                price: 35000,
                image: getRandomElectricImage()
            }
        ],
        'Sports Car': [
            {
                id: 66,
                name: '2025 Porsche 911',
                price: 99700,
                image: getRandomElectricImage()
            },
            {
                id: 67,
                name: '2025 Chevrolet Corvette',
                price: 68995,
                image: getRandomElectricImage()
            },
            {
                id: 68,
                name: '2025 Nissan Z',
                price: 42115,
                image: getRandomElectricImage()
            },
            {
                id: 69,
                name: '2025 Toyota GR Supra',
                price: 45155,
                image: getRandomElectricImage()
            },
            {
                id: 70,
                name: '2025 Dodge Viper',
                price: 90000,
                image: getRandomElectricImage()
            }
        ],
        'Truck': [
            {
                id: 71,
                name: '2025 Ford F-250',
                price: 44770,
                image: getRandomElectricImage()
            },
            {
                id: 72,
                name: '2025 Chevrolet Colorado',
                price: 29700,
                image: getRandomElectricImage()
            },
            {
                id: 73,
                name: '2025 RAM 2500',
                price: 45150,
                image: getRandomElectricImage()
            },
            {
                id: 74,
                name: '2025 Toyota Tacoma',
                price: 31950,
                image: getRandomElectricImage()
            },
            {
                id: 75,
                name: '2025 GMC Canyon',
                price: 37400,
                image: getRandomElectricImage()
            }
        ],
        'Compact': [
            {
                id: 76,
                name: '2025 Honda Civic',
                price: 24100,
                image: getRandomElectricImage()
            },
            {
                id: 77,
                name: '2025 Toyota Corolla',
                price: 22475,
                image: getRandomElectricImage()
            },
            {
                id: 78,
                name: '2025 Mazda3',
                price: 23950,
                image: getRandomElectricImage()
            },
            {
                id: 79,
                name: '2025 Volkswagen Jetta',
                price: 21495,
                image: getRandomElectricImage()
            },
            {
                id: 80,
                name: '2025 Hyundai Elantra',
                price: 21650,
                image: getRandomElectricImage()
            }
        ],
        'Roadster': [
            {
                id: 81,
                name: '2025 Tesla Roadster',
                price: 200000,
                image: getRandomElectricImage()
            },
            {
                id: 82,
                name: '2025 Porsche Boxster',
                price: 63100,
                image: getRandomElectricImage()
            },
            {
                id: 83,
                name: '2025 BMW Z4 Roadster',
                price: 52900,
                image: getRandomElectricImage()
            },
            {
                id: 84,
                name: '2025 Audi TT Roadster',
                price: 55900,
                image: getRandomElectricImage()
            },
            {
                id: 85,
                name: '2025 Mercedes SL Roadster',
                price: 109900,
                image: getRandomElectricImage()
            }
        ],
        'Off-Road': [
            {
                id: 86,
                name: '2025 Jeep Wrangler',
                price: 31995,
                image: getRandomElectricImage()
            },
            {
                id: 87,
                name: '2025 Ford Bronco',
                price: 34395,
                image: getRandomElectricImage()
            },
            {
                id: 88,
                name: '2025 Toyota 4Runner',
                price: 40525,
                image: getRandomElectricImage()
            },
            {
                id: 89,
                name: '2025 Land Rover Defender',
                price: 56100,
                image: getRandomElectricImage()
            },
            {
                id: 90,
                name: '2025 Chevrolet Blazer',
                price: 35600,
                image: getRandomElectricImage()
            }
        ],
        'Van': [
            {
                id: 91,
                name: '2025 Mercedes Sprinter',
                price: 47900,
                image: getRandomElectricImage()
            },
            {
                id: 92,
                name: '2025 Ford Transit',
                price: 41445,
                image: getRandomElectricImage()
            },
            {
                id: 93,
                name: '2025 RAM ProMaster',
                price: 39520,
                image: getRandomElectricImage()
            },
            {
                id: 94,
                name: '2025 Chevrolet Express',
                price: 38400,
                image: getRandomElectricImage()
            },
            {
                id: 95,
                name: '2025 GMC Savana',
                price: 39300,
                image: getRandomElectricImage()
            }
        ],
        'Motorcycle': [
            {
                id: 96,
                name: '2025 Harley-Davidson Street Glide',
                price: 25999,
                image: getRandomElectricImage()
            },
            {
                id: 97,
                name: '2025 Yamaha YZF-R1',
                price: 17999,
                image: getRandomElectricImage()
            },
            {
                id: 98,
                name: '2025 Honda CBR1000RR',
                price: 16999,
                image: getRandomElectricImage()
            },
            {
                id: 99,
                name: '2025 Kawasaki Ninja ZX-10R',
                price: 16499,
                image: getRandomElectricImage()
            },
            {
                id: 100,
                name: '2025 BMW S 1000 RR',
                price: 17995,
                image: getRandomElectricImage()
            }
        ]
    };

    const getCurrentCars = () => {
        return carData[selectedCategory] || [
            {
                id: Math.random(),
                name: `2025 ${selectedCategory} Model A`,
                price: 35000 + Math.floor(Math.random() * 30000),
                image: getRandomElectricImage()
            },
            {
                id: Math.random(),
                name: `2025 ${selectedCategory} Model B`,
                price: 35000 + Math.floor(Math.random() * 30000),
                image: getRandomElectricImage()
            },
            {
                id: Math.random(),
                name: `2025 ${selectedCategory} Model C`,
                price: 35000 + Math.floor(Math.random() * 30000),
                image: getRandomElectricImage()
            },
            {
                id: Math.random(),
                name: `2025 ${selectedCategory} Model D`,
                price: 35000 + Math.floor(Math.random() * 30000),
                image: getRandomElectricImage()
            },
            {
                id: Math.random(),
                name: `2025 ${selectedCategory} Model E`,
                price: 35000 + Math.floor(Math.random() * 30000),
                image: getRandomElectricImage()
            }
        ];
    };

    const formatPrice = (price) => {
        return `$${price.toLocaleString()}`;
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 6 * (81 + 12);
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 6 * (81 + 12);
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 ">
            <div>
                <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
                    Popular Vehicles
                </h2>
                <p className="mt-2 text-[16px] text-gray-600">
                    Discover our handpicked selection of premium vehicles, each verified and ready for your next adventure.
                </p>
                <hr className="mt-4 w-48 border-t-2 border-blue-600" />
            </div>

            {/* Category Navigation */}
            <div className="flex items-center mt-8">
                {showLeftArrow && (
                    <button
                        onClick={scrollLeft}
                        className="flex-shrink-0 w-9 h-9 bg-[#155dfc] text-white rounded-full flex items-center justify-center mr-3  transition-all duration-200 z-10"
                    >
                        <ChevronLeft size={14} />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                flex-shrink-0 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center justify-center px-4 py-2
                                ${selectedCategory === category
                                    ? 'bg-[#155dfc] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:hover:bg-blue-100 hover:text-blue-700'
                                }
                            `}
                            style={{
                                width: 'auto',
                                height: '37px',
                                scrollSnapAlign: 'start'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {showRightArrow && (
                    <button
                        onClick={scrollRight}
                        className="flex-shrink-0 w-9 h-9 bg-[#155dfc] text-white rounded-full flex items-center justify-center ml-3  transition-all duration-200 z-10"
                    >
                        <ChevronRight size={14} />
                    </button>
                )}
            </div>

            {/* Car Cards Grid */}
            <div className="mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-20 lg:grid-cols-4 xl:grid-cols-5 gap-8">

                    {/* Special First Card */}
                    <div className="rounded-lg shadow-[0_1px_10px_rgba(0,0,0,0.10)]  p-6  hover:shadow-md flex flex-col text-left text-black h-[202px]">
                        <h2 className="text-[26px] mt-9 font-bold mb-2">All new EVs</h2>
                        <p className="text-sm">
                            Experience the best way to search new cars
                        </p>
                    </div>


                    {/* Remaining Cars */}
                    {getCurrentCars().map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-lg shadow-[0_1px_10px_rgba(0,0,0,0.10)] hover:shadow-md pr-9 h-[202px] overflow-hidden"
                        >
                            {/* Car Image */}
                            <div className="relative h-22 w-42 ml-5 mt-6">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden w-full h-full bg-gray-200 items-center justify-center text-gray-400 text-xs">
                                    No Image
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="py-4 flex flex-col justify-between h-[150px]">
                                <div>
                                    <h1 className="text-md mt-2 text-center text-black-600 leading-tight">
                                        {car.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Custom scrollbar styles */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}