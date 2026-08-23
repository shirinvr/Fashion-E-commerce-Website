// src/services/commonservicecall.ts
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const callDynamicApi = async (apiMethodName, parameters = {}) => {
    const body = {
        spName: apiMethodName,
        parameters: parameters
    };

    const res = await axios.post(
        `${BASE_URL}/api/Dynamic/execute`,
        body
    );

    return res.data;
};
