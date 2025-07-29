import React from 'react';

const DubaiCarRentalSection = () => {
    const carData = [
        {
            name: "Chevrolet Captiva (Black), 2023",
            daily: "AED 130",
            weekly: "-",
            monthly: "AED 2,400"
        },
        {
            name: "Hyundai Creta 5-Seater (Blue), 2024",
            daily: "AED 99",
            weekly: "AED 599",
            monthly: "AED 1,799"
        },
        {
            name: "Mazda CX5 (Golden), 2025",
            daily: "AED 139",
            weekly: "-",
            monthly: "AED 2,489"
        },
        {
            name: "MG 3 (White), 2025",
            daily: "AED 49",
            weekly: "AED 340",
            monthly: "AED 1,225"
        },
        {
            name: "MG 3 (Black), 2025",
            daily: "AED 120",
            weekly: "AED 699",
            monthly: "AED 1,399"
        }
    ];

    return (

        <div className="w-full px-9  bg-white mt-12">
            <div className="w-full border-t-1 border-gray-200 mb-8"></div>
            {/* Pricing Table Section */}
            <div className="mb-14">
                <h1 className="text-[26px] font-bold text-gray-900 mb-10 mt-13 text-left">
                    Economy car rental price in Dubai
                </h1>

                <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse bg-white text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-200">
                                    Vehicle
                                </th>
                                <th className="py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-200">
                                    Daily
                                </th>
                                <th className="py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-200">
                                    Weekly
                                </th>
                                <th className="py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-200">
                                    Monthly
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carData.map((car, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 transition-colors duration-200 ${index !== carData.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                >
                                    <td className="py-4 px-6 text-gray-800 font-medium">
                                        {car.name}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 font-semibold">
                                        {car.daily}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 font-semibold">
                                        {car.weekly}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 font-semibold">
                                        {car.monthly}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden mt-6">
                    <div className="space-y-4">
                        {carData.map((car, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-left">
                                <h3 className="font-semibold text-gray-800 mb-3 text-sm">{car.name}</h3>
                                <div className="grid grid-cols-3 gap-3 text-sm">
                                    <div className="text-left">
                                        <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Daily</div>
                                        <div className="font-semibold text-gray-800">{car.daily}</div>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Weekly</div>
                                        <div className="font-semibold text-gray-800">{car.weekly}</div>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Monthly</div>
                                        <div className="font-semibold text-gray-800">{car.monthly}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12 text-left">
                {/* Rent Economy Cars in Dubai */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        Rent Economy Cars in Dubai
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            From budget hatchback cars including Chevrolet Spark, Nissan Microsoft, Kia Picanto, Toyota Yaris to economy sedan cars such as Toyota Corolla, Nissan Sunny, Mitsubishi Attrage, everything in between is available on OneClickDrive.com. At the best possible rates across the emirates. With the ability to compare offers from over 70 different suppliers, you can be sure to get the best rate.
                        </p>
                        <p>
                            Rent a car in Dubai at budget-friendly rates provided directly by suppliers without having to pay commission or third-party costs. Choose from hatchbacks, sedans and crossovers listed by multiple car rental agencies in our network. Rent economy cars at competitive rates in the market inclusive of insurance and standard mileage.
                        </p>
                        <p>
                            Our suppliers offer free delivery across Dubai, Abu Dhabi, Sharjah and other emirates on monthly car rentals. Feel free to explore our lowest rates for luxury car rentals and sports car rentals in Dubai. Shortlist a car of your liking, compare prices offered by multiple car rental agencies and book directly the agency offering your desired car and price.
                        </p>
                    </div>
                </section>

                {/* Compare and Shortlist Offers */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        Economy Rent a Car
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            OneClickDrive.com is the UAE's no. 1 car rental and leasing marketplace. Explore live offers from both large scale and small scale local rent a car companies in the emirates with ease.
                        </p>
                        <p>
                            Seeking to rent a car in Dubai on a daily or monthly basis at affordable prices? You are in the right place. Choose from a number of cheap rent a car plans on a variety of cars offered by our network of car rental agencies in Dubai all in just a few clicks. Bid farewell to your worries about not finding a car suiting your budget needs and rent a car right away!
                        </p>
                        <p>
                            OneClickDrive.com is a car rental portal which makes the process of renting a car as easy as it can get. We believe that renting a quality car should be as easy as picking a movie to watch - completely hassle-free with no hidden costs! We are well known for providing the best rates for rent a car in Dubai. With our huge and reliable network of rent a car agencies you are sure to find a rental car that perfectly suits all your needs. Get the best monthly car rental options.
                        </p>
                    </div>
                </section>

                {/* Direct from Supplier */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        Direct from Supplier
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        We deliver exclusive cars and quality services at cheap rates for a memorable travel experience - with minimal hassle! We offer future booking, reservation options and the option to get the vehicle at your desired time and place anywhere across Dubai. Our network of car rental agencies allow you to select and pay on a monthly or daily basis, whichever is most suitable for your convenience. The website offers a full exposure of our exciting cheap car rental options in Dubai.
                    </p>
                </section>

                {/* For Residents and Tourists */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        For Residents and Tourists
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you're visiting the UAE on short-term visa or here for a project, a rental car is the best way to be independent on the road. Besides, renting a car of your choice on monthly-basis in the UAE provides a range of advantages over buying one. It's economical and hassle-free. Most car rental companies even provide free delivery and pick-up for monthly rentals. They come inclusive of standard mileage: 4000km or above which is enough for most users. Salik (toll) usage is billed at the end of the month. Maintenance and registration is taken care of by the company. In case of a breakdown or accident, you're provided a replacement vehicle till the time your car is fixed.
                    </p>
                </section>

                {/* Cheap Monthly Rentals */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        Cheap Monthly Rentals in Dubai
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Monthly car rentals allow for instant upgrade or downgrade to your preferred car. So you could be driving a Land Cruiser (AED 7000) for month one and switch to a Chevrolet Cruze (AED 1700) for month two.
                        </p>
                        <p>
                            We will get you the best rates for rental of any type of car in Dubai. Based on your preference, you can select the car you wish to rent with the rental company you want to deal with. Simply get in touch with the supplier directly and save on booking fees. Best rates guaranteed!
                        </p>
                    </div>
                </section>

                {/* How to go about Economy Rental Car */}
                <section>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-6">
                        How to go about Economy Rental Car
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            The process of renting a car in Dubai is fairly simple. Contact the car rental company which has your required car for hire. Discuss the charges, terms and conditions and other details. If required, share your documents to prove your eligibility. You can also request real time pictures of the car to ensure the quality of both the interior and exterior of your car. Confirm your booking and choose a suitable pick-up or delivery time.
                        </p>
                        <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                            <strong className="text-amber-800">Important Tip:</strong> Don't rent with the company that's offering the cheapest deal. It's important to check reviews online on Google and Facebook before finalizing a rental, especially when a company requests advance booking payment. Reading experiences of other users definitely helps in setting your expectations and to avoid choosing an ill-fated company.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DubaiCarRentalSection;
