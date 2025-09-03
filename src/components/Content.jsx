import React, { useState, useEffect } from 'react';
import AddListingForm from './AddListingForm';
import DashboardContent from './DashboardContent';
import ListingsContent from './ListingsContent';
import DefaultContent from './DefaultContent';
import AgencyManagement from './AgencyManagement';
import PackageManagement from './PackageManagement';
import AllAgencies from './AllAgencies';
import AllUsers from './AllUsers';
import AgencyContact from './AgencyContact'
import MyProfile from './MyProfile';


const Content = ({ activeSection }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('agency'); // Default role

    useEffect(() => {
        // Ensure this code only runs in the browser
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            const parsedUser = storedUser ? JSON.parse(storedUser) : {};
            setUser(parsedUser);
            setRole(parsedUser?.role || 'agency');
        }
    }, []); // Empty dependency array to run once on mount

    return (
        <div className="flex-1 overflow-auto">
            {activeSection === 'Dashboard' && <DashboardContent />}
            {activeSection === 'My Listings' && role === 'agency' && <ListingsContent />}
            {activeSection === 'Add Listings' && role === 'agency' && <AddListingForm />}
            {activeSection === 'Agency Management' && role === 'admin' && <AgencyManagement />}
            {activeSection === 'Package Management' && role === 'admin' && <PackageManagement />}
            {activeSection === 'All Agencies' && role === 'admin' && <AllAgencies />}
            {activeSection === 'All Users' && role === 'admin' && <AllUsers />}
            {activeSection === 'Agency Contact' && role === 'admin' && <AgencyContact />}
            {activeSection === 'My Profile' && role === 'agency' && <MyProfile />}

            {['User Management'].includes(activeSection) && (
                <DefaultContent activeSection={activeSection} />
            )}
        </div>
    );
};

export default Content;