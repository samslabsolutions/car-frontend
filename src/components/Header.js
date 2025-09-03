import React from 'react';

const Header = ({ activeSection }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{activeSection}</h1>
                    <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;