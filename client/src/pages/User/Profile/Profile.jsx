import { useState } from "react";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callDynamicApi } from "../../../shared/apiService.jsx";
import { ApiMethodNames } from "../../../config/ServiceMapping.ts";

const Profile = () => {
    const [formData, setFormData] = useState({
        userId: 1,

        username: "",
        mobile: "",
        gender: "",
        dateOfBirth: "",

        addressId: 0,
        addressLineName: "Home",
        addressLine: "",
        cityId: "",
        stateId: "",
        countryId: "",
        pincode: "",
        isDefault: true
    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };
    // const handleCheckboxChange = (e) => {

    //     const { name, checked } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: checked
    //     }));

    // };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await callDynamicApi(ApiMethodNames.SaveUpdateUserProfile, { UserId: 1, profiledata: formData });

            if (response.data.success) {

                toast.success(
                    response.data.message || "Profile updated successfully.",
                    {
                        position: "top-right"
                    }
                );

            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update user details.",
                {
                    position: "top-right"
                }
            );

        }

    };

    return (
        <div className="profile-page">
            <ToastContainer />

            <div className="container my-3 py-5">

                {/* Page Header */}
                <div className="profile-header mb-4">
                    <h2>My Profile</h2>
                    <p>
                        Manage your personal information and account details
                    </p>
                </div>

                <div className="row g-4">

                    {/* Left Profile Card */}
                    <div className="col-lg-4">

                        <div className="profile-card profile-summary">

                            <div className="profile-avatar">
                                {/* {formData.firstNameLetter} */} J
                            </div>

                            <h4>
                                {formData.firstName} {formData.lastName}
                            </h4>

                            <p className="text-muted">
                                {formData.email}
                            </p>

                            <div className="profile-divider"></div>

                            <div className="profile-info">
                                <div>
                                    <span>Member since</span>
                                    <strong>August 2026</strong>
                                </div>

                                <div>
                                    <span>Orders</span>
                                    <strong>12</strong>
                                </div>

                                <div>
                                    <span>Wishlist</span>
                                    <strong>8 Items</strong>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Profile Form */}
                    <div className="col-lg-8">

                        <div className="profile-card">

                            <form onSubmit={handleSubmit}>

                                {/* Personal Information */}
                                <div className="form-section">

                                    <div className="section-title">
                                        <div className="section-icon">
                                            <i className="bi bi-person"></i>
                                        </div>

                                        <div>
                                            <h5>Personal Information</h5>
                                            <p>
                                                Update your personal details
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row g-3">

                                        {/* Username */}
                                        <div className="col-md-6">
                                            <label>Username</label>

                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter username"
                                            />
                                        </div>


                                        {/* Mobile */}
                                        <div className="col-md-6">
                                            <label>Mobile Number</label>

                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter mobile number"
                                            />
                                        </div>


                                        {/* Gender */}
                                        <div className="col-md-6">
                                            <label>Gender</label>

                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Gender</option>

                                                <option value="1">
                                                    Male
                                                </option>

                                                <option value="2">
                                                    Female
                                                </option>

                                                <option value="3">
                                                    Other
                                                </option>

                                                <option value="4">
                                                    Prefer not to say
                                                </option>
                                            </select>
                                        </div>


                                        {/* Date of Birth */}
                                        <div className="col-md-6">
                                            <label>Date of Birth</label>

                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Contact Information */}
                                <div className="form-section">

                                    <div className="section-title">

                                        <div className="section-icon">
                                            <i className="bi bi-telephone"></i>
                                        </div>

                                        <div>
                                            <h5>Contact Information</h5>
                                            <p>
                                                Keep your contact details updated
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <label>
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                className="form-control"
                                                disabled
                                            />

                                            <small className="field-note">
                                                Email address cannot be changed
                                            </small>

                                        </div>

                                        <div className="col-md-6">

                                            <label>
                                                Mobile Number
                                            </label>

                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter mobile number"
                                            />

                                        </div>

                                    </div>

                                </div>

                                {/* Address */}
                                <div className="form-section">

                                    <div className="section-title">

                                        <div className="section-icon">
                                            <i className="bi bi-geo-alt"></i>
                                        </div>

                                        <div>
                                            <h5>Address</h5>
                                            <p>
                                                Add your delivery address
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <label>Address Name</label>

                                            <input
                                                type="text"
                                                name="addressLineName"
                                                value={formData.addressLineName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Home / Office"
                                            />

                                        </div>


                                        <div className="col-12">

                                            <label>Address</label>

                                            <textarea
                                                name="addressLine"
                                                value={formData.addressLine}
                                                onChange={handleChange}
                                                className="form-control"
                                                rows="3"
                                                placeholder="Enter your address"
                                            />

                                        </div>


                                        <div className="col-md-4">

                                            <label>City</label>

                                            <select
                                                name="cityId"
                                                value={formData.cityId}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select City</option>
                                                <option value="101">Thrissur</option>
                                                <option value="102">Kochi</option>
                                                <option value="103">Kozhikode</option>
                                            </select>

                                        </div>


                                        <div className="col-md-4">

                                            <label>State</label>

                                            <select
                                                name="stateId"
                                                value={formData.stateId}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select State</option>
                                                <option value="18">Kerala</option>
                                                <option value="19">Tamil Nadu</option>
                                                <option value="20">Karnataka</option>
                                            </select>

                                        </div>


                                        <div className="col-md-4">

                                            <label>Country</label>

                                            <select
                                                name="countryId"
                                                value={formData.countryId}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Country</option>
                                                <option value="1">India</option>
                                            </select>

                                        </div>


                                        <div className="col-md-6">

                                            <label>Pincode</label>

                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter pincode"
                                            />

                                        </div>


                                        <div className="col-md-6 d-flex align-items-center">

                                            <div className="form-check">

                                                <input
                                                    type="checkbox"
                                                    name="isDefault"
                                                    checked={formData.isDefault}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            isDefault: e.target.checked
                                                        })
                                                    }
                                                    className="form-check-input"
                                                    id="defaultAddress"
                                                />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultAddress"
                                                >
                                                    Make this my default address
                                                </label>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Bottom Actions */}
                                <div className="profile-actions">



                                    <button
                                        type="button"
                                        className="button cancel-btn"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="button save-btn"
                                    >
                                        <i className="bi bi-check2 me-2"></i>
                                        Save Changes
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default Profile;