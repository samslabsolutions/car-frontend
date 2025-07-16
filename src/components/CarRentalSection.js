import Image from 'next/image';

const categories = [
    { name: "Luxury Sedans", count: 92, image: "/car.jpg" },
    { name: "Supercars", count: 36, image: "/car.jpg" },
    { name: "SUVs", count: 78, image: "/car.jpg" },
    { name: "Convertibles", count: 24, image: "/car.jpg" },
    { name: "Electric", count: 18, image: "/car.jpg" },
    { name: "Chauffeur", count: 59, image: "/car.jpg" }
];

const CarCategories = () => {
    return (
        <section className="py-16 px-[5%] bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">Our Collections</h2>
                <p className="text-lg text-gray-600 mb-12 max-w-3xl">Curated for the discerning client</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="relative h-48 overflow-hidden group">
                            <div className="absolute inset-0">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-600 ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-105"
                                />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                                <h3 className="text-xl font-normal mb-1 tracking-wide">{category.name}</h3>
                                <p className="text-sm font-light opacity-80">{category.count} vehicles</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 group-hover:to-black/20 z-[1] transition-all duration-400 ease-in-out"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CarCategories;