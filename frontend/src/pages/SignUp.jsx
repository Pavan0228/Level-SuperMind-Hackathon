import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { User, Mail, Lock, UserCircle } from "lucide-react";
import { base_url } from "../constant";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        username: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${base_url}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (data.success) {
                Cookies.set("accessToken", data.accessToken, { expires: 1 });
                navigate("/dashboard");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
                    <p className="text-sm text-gray-600 mt-2">Join us today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                        ) : (
                            "Create account"
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-500 hover:text-blue-600">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;