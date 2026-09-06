import React, { useEffect, useCallback, useState } from "react";
import './SideBar.css';
import { Link } from 'react-router-dom';
import { callDynamicApi } from "../../shared/apiService";
import { ApiMethodNames } from "../../config/ServiceMapping.ts";

const SideBar = () => {
    const [menus, setMenus] = useState([]);
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const userId = user.userId;

    const getAllMenus = useCallback(async () => {
        try {
            const res = await callDynamicApi(ApiMethodNames.Getallmenusbyrole, { UserId: userId });

            if (res.success === true) {
                setMenus(res.data.result1);
            }
        } catch (err) {
            console.error(err);
        }
    }, [userId]);

    useEffect(() => {
        getAllMenus();
    }, [getAllMenus]);

    return (

        <div className="d-flex flex-column flex-shrink-0 shadow-lg menu-sidebar">
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                {menus.map((menu) => (
                    <li className="nav-item" key={menu.menu_id}>
                        <Link
                            to={menu.menu_url}
                            className="nav-link py-3 px-4 border-bottom"
                        >
                            <i className={menu.menu_icon}></i>
                            {menu.menu_name}
                        </Link>
                        <span className="tooltiptext">
                            {menu.menu_name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;