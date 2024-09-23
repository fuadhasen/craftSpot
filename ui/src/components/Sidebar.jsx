// Sidebar component

import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="p-4">
                <ul>
                    <li className="py-2 border-b border-gray-700">
                        <a href="/me/bookings" className="block">Bookings</a>
                    </li>
                    <li className="py-2 border-b border-gray-700">
                        <a href="/me/services" className="block">Services</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;