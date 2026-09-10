import { useState, useEffect, useCallback } from "react";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callDynamicApi } from "../../../shared/apiService.jsx";
import { ApiMethodNames } from "../../../config/ServiceMapping.ts";
import {
    // encryptAES128,
    decryptAES128
} from "../../../utils/encryptdecrypt.js";

const Profile = () => {
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [userBasicDtl, setUserBasicDtl] = useState([]);
    const [addressLineDtl, setAddressLineDtl] = useState([]);
    const [addressLine, setAddressLine] = useState([]);
    // const [userAddDtl, setUserAddDtl] = useState([]);

    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const userId = user.userId;

    const initialFormData = {
        userId: 0,
        username: "",
        mobile: "",
        gender: "",
        dateOfBirth: "",
        address_id: 0,
        addressLineName: "",
        addressLine: "",
        city_id: "",
        state_id: "",
        country_id: "",
        pincode: "",
        isDefault: true
    };

    const [formData, setFormData] = useState(initialFormData);


    const getAllCity = useCallback(async (state_id) => {
        try {
            const res = await callDynamicApi(ApiMethodNames.GetCity, { state_id: state_id });

            if (res.success === true) {
                setCity(res.data.result1);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getAllState = useCallback(async (country_id) => {
        try {
            const res = await callDynamicApi(ApiMethodNames.GetState, { country_id: country_id });

            if (res.success === true) {
                setState(res.data.result1);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getAllCountry = useCallback(async () => {
        try {
            const res = await callDynamicApi(ApiMethodNames.GetCountry, {});

            if (res.success === true) {
                setCountry(res.data.result1);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getUserProfileById = useCallback(async () => {
        try {
            const response = await callDynamicApi(
                ApiMethodNames.GetUserProfileById,
                {
                    UserId: userId
                }
            );

            if (response?.success === true) {
                setUserBasicDtl(response.data?.result1?.[0] || {});
                const result2 = response.data?.result2?.[0] || {};
                setAddressLineDtl(response.data?.result3);
                const result3 = response.data?.result3?.find((i) => {
                    return i.isdefault === true;
                }) || {};
                setAddressLine(response.data?.result4);

                const countryId = result3.countryid
                    ? Number(result3.countryid)
                    : "";

                const stateId = result3.stateid
                    ? Number(result3.stateid)
                    : "";

                setFormData({
                    userId: result2.id,

                    username: result2.username,
                    email: decryptAES128(result2.email) || "",
                    mobile: result2.mobileno || "",
                    gender: result2.gender?.toString() || "",
                    dateOfBirth: result2.date_of_birth ? result2.date_of_birth.substring(0, 10) : "",

                    address_id: result3.address_id || 0,
                    addressLineName: result3.addresslinename || "",
                    addressLine: result3.addressline || "",
                    city_id: result3.cityid || "",
                    state_id: result3.stateid || "",
                    country_id: result3.countryid || "",
                    pincode: result3.pincode || "",
                    isDefault: result3.isdefault ?? false
                });

                if (countryId) {
                    await getAllState(countryId);
                }

                if (stateId) {
                    await getAllCity(stateId);
                }
            }

        } catch (err) {
            console.error("Failed to fetch user profile :", err);
        }
    }, [userId, getAllState, getAllCity]);


    useEffect(() => {
        getUserProfileById();
        getAllCountry();
    }, [
        getUserProfileById,
        getAllCountry
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (name === "country_id" && value !== "") {
            getAllState(Number(value))
        }
        if (name === "state_id" && value !== "") {
            getAllCity(Number(value))
        }
    };
    const handleAddrChange = (e) => {
        const { name, value } = e.target;

        if (name === "address_id" && value !== "") {
            const addr = addressLineDtl.find((i) => {
                return i.address_id === Number(value)
            });

            setFormData((prev) => ({
                ...prev,
                ...{
                    address_id: addr.address_id,
                    addressLineName: addr.addresslinename,
                    addressLine: addr.addressline,
                    city_id: addr.cityid,
                    state_id: addr.stateid,
                    country_id: addr.countryid,
                    pincode: addr.pincode,
                    isDefault: addr.isdefault
                }
            }));
        }
    };

    const addNewAddress = () => {
        setFormData((prev) => ({
            ...prev,
            ...{
                address_id: "0",
                addressLineName: "",
                addressLine: "",
                city_id: "0",
                state_id: "0",
                country_id: "0",
                pincode: "",
                isDefault: false
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await callDynamicApi(ApiMethodNames.SaveUpdateUserProfile, { UserId: 1, profiledata: formData });
            if (response.data.success) {
                toast.success(
                    (response.data.OutputMessage && response.data.ErrorStatus === 1) || "Profile updated successfully.",
                    {
                        position: "top-right",
                        closeButton: false
                    }
                );
            }

        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Failed to update user details.",
                {
                    position: "top-right",
                    closeButton: false
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
                                {formData.username}
                            </h4>

                            <p className="text-muted">
                                {formData.email}
                            </p>

                            <div className="profile-divider"></div>

                            <div className="profile-info">
                                <div>
                                    <span>Member since</span>
                                    <strong>{userBasicDtl?.Membersincedate}</strong>
                                </div>

                                <div>
                                    <span>Orders</span>
                                    <strong>{userBasicDtl?.OrderCount}</strong>
                                </div>

                                <div>
                                    <span>Wishlist</span>
                                    <strong>{userBasicDtl?.WishlistCount} Items</strong>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Profile Form */}
                    <div className="col-lg-8">

                        <div className="profile-card">

                            <form onSubmit={handleSubmit}>

                                {/* Personal Information */}
                                <div className="profile-form-section">

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
                                                className="profile-form-control"
                                                placeholder="Enter username"
                                            />
                                        </div>


                                        {/* Mobile */}
                                        <div className="col-md-6">
                                            <label>Mobile Number</label>

                                            <input
                                                type="text"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={(e) => {
                                                    const mobileVal = e.target.value;
                                                    if (/^\d*$/.test(mobileVal)) {
                                                        handleChange(e)
                                                    }
                                                }}
                                                className="profile-form-control"
                                                placeholder="Enter mobile number"
                                                maxLength={10}
                                                inputMode="numeric"
                                            />
                                        </div>


                                        {/* Gender */}
                                        <div className="col-md-6">
                                            <label>Gender</label>

                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="profile-form-select"
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
                                                className="profile-form-control"
                                                onKeyDown={(e) => e.preventDefault()}
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Contact Information */}
                                <div className="profile-form-section">

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
                                                className="profile-form-control"
                                                disabled
                                            />

                                            <small className="field-note">
                                                Email address cannot be changed
                                            </small>

                                        </div>



                                    </div>

                                </div>

                                {/* Address */}
                                <div className="profile-form-section">

                                    <div className="row my-3">
                                        <div className="col-md-10">
                                            <div className="row">
                                                <div className="col-md-1">

                                                    <div className="section-icon">
                                                        <i className="bi bi-geo-alt"></i>
                                                    </div>
                                                </div>
                                                <div className="col-md-11">


                                                    <div>
                                                        <h5>Address</h5>
                                                        <span>
                                                            Add your delivery address
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <button className="btn btn-primary" onClick={addNewAddress}><i className="bi bi-plus-circle-fill"></i></button>
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
                                                className="profile-form-control"
                                                placeholder="Home / Office"
                                            />

                                        </div>
                                        <div className="col-md-6">

                                            <label>Saved Address</label>

                                            <select
                                                name="address_id"
                                                value={formData.address_id}
                                                onChange={handleAddrChange}
                                                className="profile-form-select"
                                            >
                                                <option value="">Select address</option>
                                                {addressLine.map(a =>
                                                    <option key={a.address_id} value={a.address_id}>
                                                        {a.addresslinename}
                                                    </option>
                                                )}
                                            </select>

                                        </div>


                                        <div className="col-12">

                                            <label>Address</label>

                                            <textarea
                                                name="addressLine"
                                                value={formData.addressLine}
                                                onChange={handleChange}
                                                className="profile-form-control"
                                                rows="3"
                                                placeholder="Enter your address"
                                            />

                                        </div>

                                        <div className="col-md-4">

                                            <label>Country</label>

                                            <select
                                                name="country_id"
                                                value={formData.country_id}
                                                onChange={handleChange}
                                                className="profile-form-select"
                                            >
                                                <option value="">Select Country</option>
                                                {country.map(c =>
                                                    <option key={c.country_id} value={c.country_id}>
                                                        {c.country_name}
                                                    </option>
                                                )}
                                            </select>

                                        </div>

                                        <div className="col-md-4">

                                            <label>State</label>

                                            <select
                                                name="state_id"
                                                value={formData.state_id}
                                                onChange={handleChange}
                                                className="profile-form-select"
                                                placeholder="select state"
                                            >
                                                <option value="">Select state</option>
                                                {state.map(s =>
                                                    <option key={s.state_id} value={s.state_id}>
                                                        {s.state_name}
                                                    </option>
                                                )}
                                            </select>

                                        </div>


                                        <div className="col-md-4">

                                            <label>City</label>

                                            <select
                                                name="city_id"
                                                value={formData.city_id}
                                                onChange={handleChange}
                                                className="profile-form-select"
                                                placeholder="select city"
                                            >
                                                <option value="">Select city</option>
                                                {city.map(c =>
                                                    <option key={c.city_id} value={c.city_id}>
                                                        {c.city_name}
                                                    </option>
                                                )}
                                            </select>

                                        </div>


                                        <div className="col-md-6">

                                            <label>Pincode</label>

                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={(e) => {
                                                    const pinc = e.target.value;
                                                    if (/^\d*$/.test(pinc)) {
                                                        handleChange(e)
                                                    }
                                                }}
                                                className="profile-form-control"
                                                placeholder="Enter pincode"
                                                maxLength={6}
                                                inputMode="numeric"
                                            />

                                        </div>


                                        <div className="col-md-6 d-flex align-items-center checkbox">

                                            <div className="profile-form-check">

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
                                                    className="profile-form-check-input"
                                                    id="defaultAddress"
                                                />

                                                <label
                                                    className="profile-form-check-label"
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