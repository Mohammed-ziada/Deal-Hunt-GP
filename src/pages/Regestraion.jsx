import { useState } from "react";
import { Typography } from "antd";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import logo from '../assets/images/Logo.svg';

const { Text } = Typography;

export default function Registration() {
    const [tabValue, setTabValue] = useState("Login");

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Logo */}
            <div className="flex justify-center py-2">
                <img src={logo} alt="Logo" className="h-6" />
            </div>

            {/* Animated Header */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={tabValue} // Ensures re-render on tab change
                    initial={{ opacity: 0 }} // Start invisible
                    animate={{ opacity: 1 }} // Fade in
                    exit={{ opacity: 0 }} // Fade out
                    transition={{ duration: 0.2 }} // Animation speed
                    className="text-center"
                >
                    <h1 className="font-medium text-black text-xl tracking-normal py-2 capitalize">
                        {tabValue === "Login" ? "Log in to your account" : "Create Account"}
                    </h1>
                    <Text className="text-gray-500 tracking-wider">
                        {tabValue === "Login"
                            ? "Welcome back! Please enter your details."
                            : "Create a new account. Join us today!"}
                    </Text>
                </motion.div>
            </AnimatePresence>

            {/* Tabs */}
            <div className="flex w-full mt-4">
                <button
                    onClick={() => setTabValue("Login")}
                    className={`py-2 w-1/2 text-center rounded-l-md focus:outline-none 
                        ${tabValue === "Login" ? "bg-white border border-gray-300" : "bg-gray-100 border border-transparent hover:bg-gray-50"}`}
                >
                    Log in
                </button>
                <button
                    onClick={() => setTabValue("SignUp")}
                    className={`py-2 w-1/2 text-center rounded-r-md focus:outline-none 
                        ${tabValue === "SignUp" ? "bg-white border border-gray-300" : "bg-gray-100 border border-transparent hover:bg-gray-50"}`}
                >
                    Sign Up
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {tabValue === "Login" ? <Login /> : <Register />}
            </div>
        </div>
    );
}
