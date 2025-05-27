import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    DollarSign,
    ArrowDownCircle,
    Wallet,
    PiggyBank,
} from 'lucide-react';
import { useLogoutMutation } from '../../redux/api/user.api';

const Sidebar = () => {
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Income', path: '/income', icon: DollarSign },
        { label: 'Expense', path: '/expense', icon: ArrowDownCircle },
        { label: 'Budget', path: '/budget', icon: Wallet },
        { label: 'Savings', path: '/savings', icon: PiggyBank },
    ];

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
        <div className="w-[300px] bg-white border-r border-gray-300 p-4 h-screen flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-6">Personal Budgeting</h2>
                <nav className="space-y-2">
                    {navItems.map(({ label, path, icon: Icon }) => (
                        <NavLink
                            to={path}
                            key={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? 'bg-blue-100 text-blue-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Icon size={20} />
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="flex justify-center items-center">

                <button
                    onClick={handleLogOut}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 ${isLoading && "pointer-events-none opacity-50"}`}
                >
                    {isLoading ? "Logging out" : "Logout"}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
