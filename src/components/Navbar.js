"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('jwt');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsSignupOpen(false);
                setIsLoginOpen(false);
            }
        };
        if (isSignupOpen || isLoginOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isSignupOpen, isLoginOpen]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
    };

    const navItems = [
        { name: 'Home', href: '/', active: true },
        { name: 'Car Brands', href: '#brands' },
        { name: 'Rent a Car', href: '#rent' },
        { name: 'Services', href: '#services' },
        { name: 'Lease to Own', href: '#lease' },
        { name: 'Luxury Fleet', href: '#luxury' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}>
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Sameel
                        </span>
                    </div>
                    <DesktopNav navItems={navItems} isAuthenticated={isAuthenticated} handleLogout={handleLogout} setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen} router={router} />
                    <MobileNav navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isAuthenticated={isAuthenticated} handleLogout={handleLogout} setIsSignupOpen={setIsSignupOpen} setIsLoginOpen={setIsLoginOpen} router={router} />
                </div>
            </div>
            {mounted && (
                <>
                    <SignupModal
                        isOpen={isSignupOpen}
                        onClose={() => setIsSignupOpen(false)}
                        onSwitchToLogin={() => {
                            setIsSignupOpen(false);
                            setIsLoginOpen(true);
                        }}
                    />
                    <LoginModal
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                        onSwitchToSignup={() => {
                            setIsLoginOpen(false);
                            setIsSignupOpen(true);
                        }}
                    />
                </>
            )}
        </nav>
    );
};

export default Navbar;