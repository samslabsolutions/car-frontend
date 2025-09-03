import React, { useState, useEffect } from 'react';
import { Car, Users, Building2, MessageCircle, Heart } from 'lucide-react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardContent = () => {
    const [stats, setStats] = useState({
        totalCars: 0,
        remainingRefreshers: 0,
        remainingCarListings: 0,
        totalRefreshers: 0,
        expiredTime: '',
        totalUsers: 0,
        totalAgencies: 0,
        totalContacts: 0
    });
    const [carData, setCarData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [userRole, setUserRole] = useState('agency');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token') || localStorage.getItem('jwt') ||
                    sessionStorage.getItem('token') || sessionStorage.getItem('jwt');

                if (!token) {
                    setError('No authentication token found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // Get user role FIRST before making any API calls
                const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
                const currentUserRole = user?.role || 'agency';
                setUserRole(currentUserRole);

                let agencyData = {};
                let totalCars = 0, remainingRefreshers = 0, remainingCarListings = 0, totalRefreshers = 0, expiredTime = '';
                let totalUsers = 0, totalAgencies = 0, totalContacts = 0;

                if (currentUserRole === 'agency') {
                    // AGENCY DASHBOARD LOGIC

                    // Fetch latest agency data from API
                    try {
                        const agencyRes = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/agency/me', { headers });
                        if (agencyRes.status === 200 && agencyRes.data.agency) {
                            agencyData = agencyRes.data.agency;
                            // Update localStorage with latest agency data
                            localStorage.setItem('agency', JSON.stringify(agencyData));
                        } else {
                            console.warn('Failed to fetch agency data:', agencyRes.statusText);
                            // Fallback to localStorage
                            agencyData = JSON.parse(localStorage.getItem('agency') || '{}');
                            if (!agencyData.refreshes || !agencyData.expiryDate) {
                                setError('Agency data not found. Please log in again.');
                            }
                        }
                    } catch (err) {
                        console.error('Error fetching agency data:', err);
                        // Fallback to localStorage
                        agencyData = JSON.parse(localStorage.getItem('agency') || '{}');
                        if (!agencyData.refreshes || !agencyData.expiryDate) {
                            setError('Error fetching agency data. Using cached data.');
                        }
                    }

                    // Map API fields to metrics
                    remainingRefreshers = agencyData.refreshes || 0;
                    remainingCarListings = agencyData.carListings || 0;
                    totalRefreshers = agencyData.maxRefreshes || 0;
                    expiredTime = agencyData.expiryDate
                        ? new Date(agencyData.expiryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                        : 'N/A';

                    // Fetch all cars listed for agency
                    try {
                        const carsRes = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cars/my-listings', { headers });
                        if (carsRes.ok) {
                            const carsData = await carsRes.json();
                            totalCars = carsData.total || carsData.cars?.length || 0;
                        } else {
                            console.error('Failed to fetch cars:', carsRes.statusText, await carsRes.text());
                            setError('Failed to fetch car listings. Please try again.');
                        }
                    } catch (err) {
                        console.error('Error fetching cars:', err);
                        setError('Error fetching car listings. Please check your network.');
                    }

                    // Fetch agency car data by category
                    try {
                        const carRes = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cars/agency/count-by-category', { headers });
                        if (carRes.status === 200) {
                            setCarData(carRes.data.data);
                        } else {
                            console.error('Failed to fetch car data:', carRes.statusText, await carRes.text());
                            setError('Failed to fetch car category data. Please try again.');
                        }
                    } catch (err) {
                        console.error('Error fetching agency car data:', err);
                        setError('Error fetching car category data. Please check your network.');
                    }

                    // Agency recent activities
                    const now = new Date();
                    const usedRefreshers = totalRefreshers - remainingRefreshers;
                    const newActivities = [
                        {
                            type: 'car',
                            action: 'listed',
                            count: 0,
                            time: new Date(now - 2 * 60 * 60 * 1000)
                        },
                        {
                            type: 'refresher',
                            action: 'used',
                            count: 3,
                            time: new Date(now - 5 * 60 * 60 * 1000)
                        },
                        {
                            type: 'package',
                            action: 'expires',
                            count: 1,
                            time: new Date(agencyData.expiryDate || now)
                        },
                        {
                            type: 'car',
                            action: 'available listings',
                            count: 10,
                            time: new Date(now - 2 * 24 * 60 * 60 * 1000)
                        }
                    ].filter(activity => activity.count > 0 || activity.type === 'package');
                    setRecentActivities(newActivities);

                } else if (currentUserRole === 'admin') {
                    // ADMIN DASHBOARD LOGIC

                    // Fetch users (correct endpoint based on your backend)
                    try {
                        const usersRes = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/allusers', { headers });
                        if (usersRes.ok) {
                            const usersData = await usersRes.json();
                            totalUsers = usersData.count || usersData.users?.length || 0;
                        } else {
                            console.error('Failed to fetch users:', usersRes.statusText);
                            setError('Failed to fetch users. Please try again.');
                        }
                    } catch (err) {
                        console.error('Error fetching users:', err);
                        setError('Error fetching users. Please check your network.');
                    }

                    // Fetch agencies (correct endpoint based on your backend)
                    try {
                        const agenciesRes = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/agencies', { headers });
                        if (agenciesRes.ok) {
                            const agenciesData = await agenciesRes.json();
                            totalAgencies = agenciesData.agencies?.length || agenciesData.length || 0;
                        } else {
                            console.error('Failed to fetch agencies:', agenciesRes.statusText);
                            setError('Failed to fetch agencies. Please try again.');
                        }
                    } catch (err) {
                        console.error('Error fetching agencies:', err);
                        setError('Error fetching agencies. Please check your network.');
                    }

                    // Fetch contacts
                    try {
                        const contactsRes = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/contact/all', { headers });
                        if (contactsRes.ok) {
                            const contactsData = await contactsRes.json();
                            totalContacts = contactsData.count || contactsData.contacts?.length || contactsData.length || 0;
                        } else {
                            console.error('Failed to fetch contacts:', contactsRes.statusText);
                            // Don't set error for contacts as it might be optional for admin
                        }
                    } catch (err) {
                        console.error('Error fetching contacts:', err);
                        // Don't set error for contacts as it might be optional for admin
                    }

                    // Fetch admin car data by category (different endpoint for admin)
                    try {
                        const carRes = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cars/count-by-category', { headers });
                        if (carRes.status === 200) {
                            setCarData(carRes.data.data);
                        } else {
                            console.error('Failed to fetch car data:', carRes.statusText);
                            setError('Failed to fetch car category data. Please try again.');
                        }
                    } catch (err) {
                        console.error('Error fetching car data:', err);
                        setError('Error fetching car category data. Please check your network.');
                    }

                    // Admin recent activities
                    const now = new Date();
                    const newActivities = [
                        { type: 'user', action: 'registered', count: Math.max(2, totalUsers - (totalUsers > 2 ? 2 : 0)), time: new Date(now - 2 * 60 * 60 * 1000) },
                        { type: 'agency', action: 'upgraded package', name: 'Premium Cars Agency', time: new Date(now - 5 * 60 * 60 * 1000) },
                        { type: 'contact', action: 'submitted', count: totalContacts > 0 ? Math.min(3, totalContacts) : 0, time: new Date(now - 24 * 60 * 60 * 1000) },
                        { type: 'car', action: 'added', count: carData.reduce((sum, item) => sum + item.count, 0) > 0 ? Math.min(12, carData.reduce((sum, item) => sum + item.count, 0)) : 0, time: new Date(now - 48 * 60 * 60 * 1000) }
                    ].filter(activity => activity.count > 0 || activity.name);
                    setRecentActivities(newActivities);
                }

                setStats({
                    totalCars,
                    remainingRefreshers,
                    remainingCarListings,
                    totalRefreshers,
                    expiredTime,
                    totalUsers,
                    totalAgencies,
                    totalContacts
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []); // Remove userRole dependency to prevent infinite loops

    // Filter car data based on selected category
    const filteredCarData = selectedCategory === 'all' ? carData : carData.filter(item => item.category === selectedCategory);
    const chartData = {
        labels: filteredCarData.map(item => item.category),
        datasets: [{
            label: 'Number of Cars',
            data: filteredCarData.map(item => item.count),
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                gradient.addColorStop(1, 'rgba(37, 99, 235, 0.6)');
                return gradient;
            },
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 4
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14 },
                    color: '#4B5563'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
                padding: 10,
                caretPadding: 5
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Cars',
                    font: { size: 14, weight: 'bold' },
                    color: '#1F2937'
                },
                ticks: { font: { size: 12 }, color: '#6B7280' }
            },
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                    font: { size: 14, weight: 'bold' },
                    color: '#1F2937'
                },
                ticks: { font: { size: 12 }, color: '#6B7280' }
            }
        }
    };

    return (
        <div className="p-6 space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{userRole === 'agency' ? 'All Cars Listed' : 'All Users'}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : (userRole === 'agency' ? stats.totalCars : stats.totalUsers).toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            {userRole === 'agency' ? <Car className="w-6 h-6 text-blue-600" /> : <Users className="w-6 h-6 text-blue-600" />}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{userRole === 'agency' ? 'Remaining Refreshers' : 'Total Agencies'}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : (userRole === 'agency' ? stats.remainingRefreshers : stats.totalAgencies).toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-pink-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{userRole === 'agency' ? 'Remaining Car Listings' : 'Contact Forms'}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : (userRole === 'agency' ? stats.remainingCarListings : stats.totalContacts).toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                {userRole === 'agency' ? 'Total Refreshers' : 'All Cars in System'}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {loading ? '...' : userRole === 'agency'
                                    ? stats.totalRefreshers.toLocaleString()
                                    : carData.reduce((sum, item) => sum + item.count, 0).toLocaleString()
                                }
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Car Categories</h3>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Select Category</span>
                                <select
                                    className="text-sm border border-gray-300 rounded-md px-2 py-1"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Economy Cars">Economy Cars</option>
                                    <option value="Luxury Car Rental Dubai">Luxury Car Rental Dubai</option>
                                    <option value="Sports Car Rental Dubai">Sports Car Rental Dubai</option>
                                    <option value="Special Edition">Special Edition</option>
                                    <option value="New Arrival">New Arrival</option>
                                    <option value="Muscle Cars">Muscle Cars</option>
                                    <option value="No Deposit Cars">No Deposit Cars</option>
                                    <option value="Electric Cars">Electric Cars</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Days</span>
                                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                                    <option>15 Days</option>
                                    <option>30 Days</option>
                                    <option>90 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 relative">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Loading chart...</div>
                        ) : carData.length > 0 ? (
                            <Bar data={chartData} options={chartOptions} />
                        ) : (
                            <div className="text-center py-8 text-gray-500">No car data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                        {loading ? (
                            <div className="text-center py-4 text-gray-500">Loading activities...</div>
                        ) : recentActivities.length > 0 ? (
                            recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${{
                                        user: 'bg-green-100',
                                        agency: 'bg-blue-100',
                                        contact: 'bg-purple-100',
                                        car: 'bg-orange-100',
                                        refresher: 'bg-yellow-100',
                                        package: 'bg-red-100'
                                    }[activity.type]}`}>
                                        {{
                                            user: <Users className="w-4 h-4 text-green-600" />,
                                            agency: <Building2 className="w-4 h-4 text-blue-600" />,
                                            contact: <MessageCircle className="w-4 h-4 text-purple-600" />,
                                            car: <Car className="w-4 h-4 text-orange-600" />,
                                            refresher: <Car className="w-4 h-4 text-yellow-600" />,
                                            package: <MessageCircle className="w-4 h-4 text-red-600" />
                                        }[activity.type]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">
                                                {activity.name || `${activity.count} ${activity.type}${activity.count !== 1 ? 's' : ''} `}
                                            </span>{' '}
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activity.type === 'package' && new Date(activity.time) > new Date()
                                                ? `in ${Math.abs(Math.floor((new Date(activity.time) - new Date()) / (1000 * 60 * 60)))} hours`
                                                : Math.floor((new Date() - activity.time) / (1000 * 60 * 60)) < 24
                                                    ? `${Math.floor((new Date() - activity.time) / (1000 * 60 * 60))} hours ago`
                                                    : `${Math.floor((new Date() - activity.time) / (1000 * 60 * 60 * 24))} days ago`}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-gray-500">No recent activity</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                            {loading ? '...' : userRole === 'agency'
                                ? Math.round(((stats.totalRefreshers - stats.remainingRefreshers) / (stats.totalCars || 1)) * 100)
                                : Math.round((stats.totalAgencies / (stats.totalUsers || 1)) * 100)}%
                        </p>
                        <p className="text-sm text-gray-600">
                            {userRole === 'agency' ? 'Used Refreshers to Cars Ratio' : 'Agency to User Ratio'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                            {loading ? '...' : userRole === 'agency' ? stats.expiredTime : stats.totalContacts}
                        </p>
                        <p className="text-sm text-gray-600">
                            {userRole === 'agency' ? 'Expired Package' : 'Pending Inquiries'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                            {loading ? '...' : (userRole === 'agency' ? stats.totalCars : (stats.totalUsers + stats.totalAgencies)).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            {userRole === 'agency' ? 'Total Cars Listed' : 'Total Platform Users'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;