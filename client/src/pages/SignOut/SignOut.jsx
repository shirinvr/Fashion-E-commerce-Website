import "./SignOut.css";

const SignOut = ({ open, onClose }) => {

    const onConfirm = () => {
        // Clear authentication
        localStorage.removeItem("User");

        // Redirect to login
        window.location.href = "/login";
    };

    if (!open) {
        return null;
    }


    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Sign out?</h2>

                <p>Are you sure you want to sign out?</p>

                <div className="dialog-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default SignOut;