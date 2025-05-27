import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/user.api';

const ProtectedNavbar = () => {

    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            window.localStorage.removeItem("_PBA_ID")
            await logout().unwrap();
            // navigate(0);
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300 h-[80px]">
            <div className="flex items-center">
                <h1 className="m-0 text-2xl font-bold text-gray-800">Personal Budgeting</h1>
            </div>
            <div className="flex gap-4">

                <button
                    onClick={handleLogOut}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 ${isLoading && "pointer-events-none opacity-50"}`}
                >
                    {isLoading ? "Logging out" : "Logout"}
                </button>
            </div>
        </nav>
    );
};

export default ProtectedNavbar;