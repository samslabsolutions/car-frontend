import React, { useState, useEffect } from 'react';
import { Home, Car, Plus, Heart, Search, MessageCircle, User, LogOut, Users, Building2, Contact } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState('agency');
    const [pendingContactsCount, setPendingContactsCount] = useState(0);

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setUserRole(user?.role || 'agency');
        }
    }, []);

    useEffect(() => {
        // Fetch pending contacts count for admin users
        const fetchPendingContactsCount = async () => {
            if (userRole !== 'admin') return;

            try {
                if (typeof window === 'undefined') return;
                const jwt = localStorage.getItem('jwt');
                if (!jwt) return;

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/all`,
                    { headers: { Authorization: `Bearer ${jwt}` } }
                );

                const contacts = response.data.contacts || response.data;
                if (Array.isArray(contacts)) {
                    // Count only pending contacts
                    const pendingCount = contacts.filter(contact => contact.status === 'pending').length;
                    setPendingContactsCount(pendingCount);
                }
            } catch (error) {
                console.error('Error fetching contacts count:', error);
                // Don't show error to user, just keep count at 0
            }
        };

        fetchPendingContactsCount();

        // Set up polling to refresh count every 30 seconds
        const interval = setInterval(fetchPendingContactsCount, 30000);

        return () => clearInterval(interval);
    }, [userRole]);

    // Agency sidebar items
    const agencySidebarItems = [
        { icon: Home, label: 'Dashboard', key: 'Dashboard' },
        { icon: Car, label: 'My Listings', key: 'My Listings' },
        { icon: Plus, label: 'Add Listings', key: 'Add Listings' },

        { icon: User, label: 'My Profile', key: 'My Profile' },
        { icon: LogOut, label: 'Logout', key: 'Logout' }
    ];

    // Admin sidebar items
    const adminSidebarItems = [
        { icon: Home, label: 'Dashboard', key: 'Dashboard' },
        { icon: Building2, label: 'Agency Management', key: 'Agency Management' },
        { icon: Building2, label: 'Package Management', key: 'Package Management' },

        { icon: Building2, label: 'All Agencies', key: 'All Agencies' },
        { icon: Users, label: 'All Users', key: 'All Users' },
        { icon: Contact, label: 'Agency Contact', key: 'Agency Contact', badge: pendingContactsCount > 0 ? pendingContactsCount : null },

        { icon: LogOut, label: 'Logout', key: 'Logout' }
    ];

    // Choose sidebar items based on user role
    const sidebarItems = userRole === 'admin' ? adminSidebarItems : agencySidebarItems;

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (section === 'Logout') {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            router.push('/');
        }
    };

    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col md:w-1/5 lg:w-64">
            <div className="p-6 border-b border-slate-700">
                <div className="text-xl font-bold">CarRental</div>
            </div>
            <nav className="flex-1 py-6">
                {sidebarItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.key;
                    return (
                        <button
                            key={index}
                            onClick={() => handleSectionChange(item.key)}
                            className={`flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors w-full text-left ${isActive
                                ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                                : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center">
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </div>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                                    {item.badge > 99 ? '99+' : item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;