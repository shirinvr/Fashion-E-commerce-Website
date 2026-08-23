import React, { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptAES128 } from "../../utils/encryptdecrypt";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required.", {
                position: "top-right",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://localhost:5001/api/Auth/encryptLogin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Email: encryptAES128(email),
                        Password: encryptAES128(password)
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Login failed.", {
                    position: "top-right",
                });
                return;
            }

            if(result.success && result.message !== ""){
                navigate('/landingpage/dashboard');
                localStorage.setItem("User",JSON.stringify(result));
            }

            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error("Unable to connect to the server.", {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <ToastContainer />
            {loading && <div className="loader"></div>}
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-94">

                    <div className="col-lg-10">

                        <div className="card login-card shadow-lg border-0" >

                            <div className="row g-0">

                                {/* Left Side */}

                                <div className="col-md-6 login-left d-none d-md-flex">

                                    <div className="left-content">

                                        <h1>StyleHub</h1>

                                        <p>
                                            Discover the latest fashion trends.
                                            Shop premium collections with
                                            exclusive offers.
                                        </p>

                                        <div>
                                            <img
                                                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
                                                alt=""
                                                className="img-fluid rounded"
                                            />
                                        </div>


                                    </div>

                                </div>

                                {/* Right Side */}

                                <div className="col-md-6 bg-white">

                                    <div className="p-5">

                                        <h2 className="fw-bold">
                                            Welcome Back
                                        </h2>

                                        <p className="text-muted mb-4">
                                            Sign in to continue shopping
                                        </p>

                                        <form>

                                            <div className="mb-3">

                                                <label>Email</label>

                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    autoComplete="true"
                                                />

                                            </div>

                                            <div className="mb-3">

                                                <label>Password</label>

                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    autoComplete="true"
                                                />

                                            </div>

                                            <div className="d-flex justify-content-between mb-4">

                                                <div>

                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2 rememberme-checkbox"
                                                    />

                                                    Remember Me

                                                </div>

                                                <a href="/">
                                                    Forgot Password?
                                                </a>

                                            </div>

                                            <button
                                                className="btn btn-dark w-100 py-2"
                                                onClick={handleLogin}
                                            >
                                                Login
                                            </button>

                                        </form>

                                        <div className="text-center my-4">

                                            <span className="text-muted">
                                                OR
                                            </span>

                                        </div>

                                        <div className="d-grid gap-2">

                                            <button className="btn btn-outline-danger">

                                                <i className="bi bi-google me-2"></i>

                                                Continue with Google

                                            </button>

                                        </div>

                                        <p className="text-center mt-4">

                                            Don't have an account?

                                            <a href="/register" className="ms-2">
                                                Register
                                            </a>

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;