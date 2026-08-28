import React, { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptAES128 } from "../../utils/encryptdecrypt";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !password || !confirmPassword) {
            toast.error("Email and password are required.", {
                position: "top-right",
            });
            return;
        } else if (!emailRegex.test(email)) {

            toast.error("Invalid Email", {
                position: "top-right",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${BASE_URL}/api/Auth/UserRegistration`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Email: encryptAES128(email),
                        Password: encryptAES128(password),
                        confirmPassword: encryptAES128(confirmPassword),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Registration failed.", {
                    position: "top-right",
                });
                return;
            }

            toast.success(result.message || "Registration successful.", {
                position: "top-right",
            });

            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error("Unable to connect to the server.", {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <ToastContainer />

            <div className="register-card">
                <div className="register-header">
                    <h2>Create Account</h2>
                    <p>Register a new account</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>

                        <input
                            id="confirmpassword"
                            type="password"
                            placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="true"
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Register;