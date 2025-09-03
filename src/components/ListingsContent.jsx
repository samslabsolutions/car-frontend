import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Trash2, Edit, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditListingForm from './EditListingForm';

const ListingsContent = () => {
    const [sortBy, setSortBy] = useState('Newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [refreshingListings, setRefreshingListings] = useState(new Set());
    const [successMessage, setSuccessMessage] = useState('');
    const [errorTimeout, setErrorTimeout] = useState(null);
    const [successTimeout, setSuccessTimeout] = useState(null);
    const router = useRouter();

    const fetchListings = async (page) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to view your listings.');
                router.push('/login');
                return;
            }

            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/my-listings`, {
                params: { page, limit: 10, status: 'all' },
                headers: { Authorization: `Bearer ${jwt}` }
            });
            const { cars, totalPages } = response.data;
            setListings(cars);
            setTotalPages(totalPages);
            setCurrentPage(page);
            setError(null);
        } catch (error) {
            console.error('Error fetching listings:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                setError('Failed to fetch listings. Please try again later.');
            }
        }
    };

    const handleRefresh = async (carId) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            // Add to refreshing set to show loading state
            setRefreshingListings(prev => new Set([...prev, carId]));
            setError(null);
            setSuccessMessage('');

            // Clear any existing timeouts
            if (errorTimeout) clearTimeout(errorTimeout);
            if (successTimeout) clearTimeout(successTimeout);

            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${carId}/refresh`, {}, {
                headers: { Authorization: `Bearer ${jwt}` }
            });

            // Update the specific listing with the refreshed data
            setListings(prevListings =>
                prevListings.map(listing =>
                    listing._id === carId
                        ? { ...listing, ...response.data.car }
                        : listing
                )
            );

            setSuccessMessage('Listing refreshed successfully!');

            // Clear success message after 3 seconds
            const successTimer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            setSuccessTimeout(successTimer);

        } catch (error) {
            console.error('Error refreshing listing:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            } else if (error.response?.status === 403) {
                setError(error.response.data.message || 'Cannot refresh listing. Check your refresh quota or package expiry.');

                // Clear error message after 3 seconds
                const errorTimer = setTimeout(() => {
                    setError(null);
                }, 3000);
                setErrorTimeout(errorTimer);
            } else {
                setError('Failed to refresh listing. Please try again.');

                // Clear error message after 3 seconds
                const errorTimer = setTimeout(() => {
                    setError(null);
                }, 3000);
                setErrorTimeout(errorTimer);
            }
        } finally {
            // Remove from refreshing set
            setRefreshingListings(prev => {
                const newSet = new Set(prev);
                newSet.delete(carId);
                return newSet;
            });
        }
    };

    const handleDelete = async (carId) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            await axios.delete(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${carId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            setListings(listings.filter(listing => listing._id !== carId));
            setError(null);
        } catch (error) {
            console.error('Error deleting listing:', error);
            if (error.response?.status === 401) {
                setError('Your session has expired. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                setError('Failed to delete listing. Please try again.');
            }
        }
    };

    const handleEdit = (carId) => {
        const car = listings.find(listing => listing._id === carId);
        if (car) {
            setSelectedCar(car);
            setEditFormData({
                title: car.title || '',
                make: car.make || '',
                model: car.model || '',
                year: car.year || '',
                description: car.description || '',
                location: car.location || '',
                bodyType: car.bodyType || '',
                fuelType: car.fuelType || '',
                gearbox: car.gearbox || '',
                engineCapacity: car.engineCapacity || '',
                seatingCapacity: car.seatingCapacity || '',
                doors: car.doors || '',
                bags: car.bags || '',
                exteriorColor: car.exteriorColor || '',
                interiorColor: car.interiorColor || '',
                securityDeposit: car.securityDeposit || '',
                deliveryAvailable: car.deliveryAvailable ? 'true' : 'false',
                deliveryCharge: car.deliveryCharge || '',
                pickupLocations: car.pickupLocations?.join(',') || '',
                minimumAge: car.rentalTerms?.minimumAge || '',
                licenseRequired: car.rentalTerms?.licenseRequired || '',
                insuranceIncluded: car.rentalTerms?.insuranceIncluded ? 'true' : 'false',
                fuelPolicy: car.rentalTerms?.fuelPolicy || '',
                mileagePolicy: car.rentalTerms?.mileagePolicy || '',
                depositPolicy: car.rentalTerms?.depositPolicy || '',
                cancellationPolicy: car.rentalTerms?.cancellationPolicy || '',
                paymentModes: car.paymentModes?.join(',') || '',
                technicalFeatures: car.technicalFeatures?.join(',') || '',
                otherFeatures: car.otherFeatures?.join(',') || '',
                dailyOriginalPrice: car.pricing?.daily?.originalPrice || '',
                dailyDiscountedPrice: car.pricing?.daily?.discountedPrice || '',
                dailyMileageLimit: car.pricing?.daily?.mileageLimit || '',
                dailyAdditionalCharge: car.pricing?.daily?.additionalMileageCharge || '',
                weeklyOriginalPrice: car.pricing?.weekly?.originalPrice || '',
                weeklyDiscountedPrice: car.pricing?.weekly?.discountedPrice || '',
                weeklyMileageLimit: car.pricing?.weekly?.mileageLimit || '',
                weeklyAdditionalCharge: car.pricing?.weekly?.additionalMileageCharge || '',
                monthlyOriginalPrice: car.pricing?.monthly?.originalPrice || '',
                monthlyDiscountedPrice: car.pricing?.monthly?.discountedPrice || '',
                monthlyMileageLimit: car.pricing?.monthly?.mileageLimit || '',
                monthlyAdditionalCharge: car.pricing?.monthly?.additionalMileageCharge || '',
                category: car.category || '',
                status: car.status || 'active',
                featured: car.featured ? 'true' : 'false'
            });
            setIsEditModalOpen(true);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchListings(page);
        }
    };

    // Check if listing is in refresh window (10 seconds)
    const isInRefreshWindow = (listing) => {
        if (!listing.refreshWindowExpires) return false;
        return new Date() < new Date(listing.refreshWindowExpires);
    };

    // Clean up timeouts when component unmounts
    useEffect(() => {
        return () => {
            if (errorTimeout) clearTimeout(errorTimeout);
            if (successTimeout) clearTimeout(successTimeout);
        };
    }, [errorTimeout, successTimeout]);

    useEffect(() => {
        fetchListings(1);
    }, []);

    const filteredListings = listings.filter(listing => {
        return (
            listing.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedListings = [...filteredListings].sort((a, b) => {
        switch (sortBy) {
            case 'Newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'Oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'Price Low to High':
                return (a.pricing?.daily?.discountedPrice || 0) - (b.pricing?.daily?.discountedPrice || 0);
            case 'Price High to Low':
                return (b.pricing?.daily?.discountedPrice || 0) - (a.pricing?.daily?.discountedPrice || 0);
            default:
                return 0;
        }
    });

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Cars eg. Audi Q"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                    <span className="text-sm text-gray-600">Sort by</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Price Low to High">Price Low to High</option>
                            <option value="Price High to Low">Price High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-blue-600">
                        <div>Make</div>
                        <div>Model</div>
                        <div>Year</div>
                        <div>Transmission</div>
                        <div>FuelType</div>
                        <div>Action</div>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {sortedListings.length === 0 && !error ? (
                        <div className="p-6 text-center text-gray-500">No listings found.</div>
                    ) : (
                        sortedListings.map((listing) => {
                            const mainImage = listing.images?.find(img => img.isMain) || listing.images?.[0];
                            const imageUrl = mainImage?.url
                                ? process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000${mainImage.url}`
                                : "https://via.placeholder.com/150";

                            const inRefreshWindow = isInRefreshWindow(listing);
                            const isRefreshing = refreshingListings.has(listing._id);

                            return (
                                <div key={listing._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="grid grid-cols-6 gap-4 items-center">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={imageUrl}
                                                alt={listing.make}
                                                className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/150";
                                                }}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-gray-900">{listing.make}</div>
                                                <div className="text-sm text-gray-500 truncate">
                                                    {listing.title}
                                                </div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-lg font-bold text-gray-900">${listing.pricing?.daily?.discountedPrice || 'N/A'}</span>
                                                    <span className="text-sm text-gray-500 line-through">${listing.pricing?.daily?.originalPrice || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-gray-900 font-medium">{listing.model}</div>
                                        <div className="text-gray-900">{listing.year}</div>
                                        <div className="text-gray-900">{listing.gearbox}</div>
                                        <div className="text-gray-900">{listing.fuelType}</div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleRefresh(listing._id)}
                                                disabled={isRefreshing || inRefreshWindow}
                                                className={`p-2 rounded-lg transition-colors ${isRefreshing || inRefreshWindow
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                                                    }`}
                                                title={
                                                    inRefreshWindow
                                                        ? 'Recently refreshed (wait 10 seconds)'
                                                        : isRefreshing
                                                            ? 'Refreshing...'
                                                            : 'Refresh listing'
                                                }
                                            >
                                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(listing._id)}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit listing"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(listing._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete listing"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${currentPage === index + 1
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            {isEditModalOpen && (
                <EditListingForm
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    selectedCar={selectedCar}
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    fetchListings={fetchListings}
                    currentPage={currentPage}
                    setError={setError}
                />
            )}
        </div>
    );
};

export default ListingsContent;