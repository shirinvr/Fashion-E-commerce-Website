import React, { useState } from "react";
import SignOut from "../SignOut/SignOut";

const Header = () => {
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    return (
        <div className="row px-0 mx-0 shadow-sm">
            <div className='col-md-11'>
                <a className="h3 text-decoration-none" href="/landingpage/dashboard">StyleHub</a>
            </div>
            <div className='col-md-1'>
                <span className="d-flex align-items-center justify-content-center p-3 link-dark pe-auto dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className='bi bi-person'></i>
                </span>
                <ul className="dropdown-menu text-small shadow pe-auto" aria-labelledby="dropdownUser3">
                    <li><a className="dropdown-item" href="/settings">Settings</a></li>
                    <li><a className="dropdown-item" href="/landingpage/profile">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => setShowSignOutDialog(true)}>Sign out</button></li>
                </ul>
            </div>

            <SignOut
                open={showSignOutDialog}
                onClose={() => setShowSignOutDialog(false)}
            />
        </div>
    );

}
export default Header;