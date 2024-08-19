"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const validateEmail = (email: string) => {
        // Check if email is empty
        if (!email) {
            return "Email is required";
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return null;
    };

    const handleLogin = () => {
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        // If validation passes
        setError(null);
        localStorage.setItem("userEmail", email);
        router.push("/dashboard");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to the App</h1>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Handle "Enter" key press
                    placeholder="Enter your email"
                    className={`p-3 border rounded-md mb-4 text-lg w-80 ${
                        error ? "border-red-500" : "border-gray-400"
                    }`}
                    aria-label="Email Address"
                    aria-invalid={!!error}
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
            </div>
            <Button onClick={handleLogin} variant="default" className="text-lg">
                Login
            </Button>
        </div>
    );
}
