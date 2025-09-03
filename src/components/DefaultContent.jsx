
import React from 'react';

const DefaultContent = ({ activeSection }) => {
    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{activeSection}</h3>
                    <p className="text-gray-600">Content for {activeSection} section goes here.</p>
                </div>
            </div>
        </div>
    );
};

export default DefaultContent;
