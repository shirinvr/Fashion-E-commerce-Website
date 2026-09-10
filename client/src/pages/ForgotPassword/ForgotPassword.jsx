import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error(
                "Please enter your email address.",
                {
                    position: "top-right",
                    closeButton: false
                }
            );
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.",
                {
                    position: "top-right",
                    closeButton: false
                }
            );
            return;
        }

        try {
            setLoading(true);

            // Replace this with your API request
            await new Promise((resolve) => setTimeout(resolve, 1500));


            toast.success(
                "If an account exists with this email, you will receive a password reset link.",
                {
                    position: "top-right",
                    style:{ width: "550px" },
                    closeButton: false
                }
            );
        } catch (err) {
            toast.error("Something went wrong. Please try again.",
                {
                    position: "top-right",
                    closeButton: false
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">

            <ToastContainer />
            <div className="forgot-password-card">
                <div className="icon">🔐</div>

                <h1>Forgot Password?</h1>

                <p className="description">
                    Enter your email address and we'll send you a link to reset your
                    password.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="forgot-label" htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            type="email"
                            className="forgot-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button className="forgot-btn" type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <a href="/login" className="back-to-login">
                    ← Back to Login
                </a>
            </div>
        </div>
    );
}
export default ForgotPassword;