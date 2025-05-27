import { useRef } from "react";
import { useLoginMutation } from "../../../redux/api/user.api";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const formDataRef = useRef()
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userObj = {
            email: formDataRef.current.email.value,
            password: formDataRef.current.password.value
        }
        try {
            const response = await login(userObj).unwrap()
            if (response.success) {
                navigate("/dashboard")
            }
            else {
                alert("Not able to login")
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form ref={formDataRef} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {/* <div className="text-center">
                    <p className="text-sm text-gray-600">or</p>
                    <button
                        className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        disabled={isLoading}
                    >
                        Login with Google
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Login;