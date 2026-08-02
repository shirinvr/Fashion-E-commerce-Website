
import "./Login.css";

function Login() {
    return (
        <div className="login-container">
            <div className="container">
                <div className="row justify-content-center align-items-center">

                    <div className="col-lg-10">

                        <div className="card login-card shadow-lg border-0">

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
                                                />

                                            </div>

                                            <div className="mb-3">

                                                <label>Password</label>

                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                />

                                            </div>

                                            <div className="d-flex justify-content-between mb-4">

                                                <div>

                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                    />

                                                    Remember Me

                                                </div>

                                                <a href="/">
                                                    Forgot Password?
                                                </a>

                                            </div>

                                            <button
                                                className="btn btn-dark w-100 py-2"
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

                                            <button className="btn btn-outline-primary">

                                                <i className="bi bi-facebook me-2"></i>

                                                Continue with Facebook

                                            </button>

                                        </div>

                                        <p className="text-center mt-4">

                                            Don't have an account?

                                            <a href="/" className="ms-2">
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