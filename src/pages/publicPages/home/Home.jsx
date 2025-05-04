import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
            <section className="text-center p-6 bg-white shadow-md rounded-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Budgeting App</h1>
                <p className="text-lg text-gray-600 mb-6">Manage your finances effortlessly.</p>
                <div className="flex space-x-4 justify-center">
                    <Link to="/signup" className="home-link px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</Link>
                    <Link to="/login" className="home-link px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Log In</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;