import React, { useRef } from "react";
import { useSignUpMutation } from "../../../redux/api/user.api";

const Signup = () => {

    const formDataRef = useRef()
    const [signupUser, { isLoading }] = useSignUpMutation()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObj = {
            fullName: formDataRef.current.fullName.value,
            email: formDataRef.current.email.value,
            password: formDataRef.current.password.value
        }


        console.log(userObj)
        try {
            const response = await signupUser(userObj).unwrap()
            console.log(response)
            if (response.success) {
                alert("signup successfull")
            }
            else {
                alert("There is some error")
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>
                <form ref={formDataRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="fullName"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Sign Up"}
                    </button>
                </form>
                {/* <div className="text-center">
                    <p className="text-sm text-gray-600">or</p>
                    <button
                        className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Login with Google
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Signup;