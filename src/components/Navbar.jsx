import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300 h-[80px]">
            <div className="flex items-center">
                <h1 className="m-0 text-2xl font-bold text-gray-800">Personal Budgeting</h1>
            </div>
            <div className="flex gap-4">
                <Link to="/login" className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Signup</Link>
            </div>
        </nav>
    );
};

export default Navbar;