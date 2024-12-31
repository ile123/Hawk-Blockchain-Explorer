import axios from "axios"
import Cookies from 'js-cookie';

const API_URL = "http://localhost:3000/api";

export const GetBlockHistory = async() => {
    const response = await axios.get(API_URL + "/get-block-history", {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });
    return {
        status: response.status,
        result: response.data
    };
}

export const GetAddressHistory = async() => {
    const response = await axios.get(API_URL + "/get-address-history", {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });

    return {
        status: response.status,
        result: response.data
    };
}

export const GetTransactionHistory = async() => {
    const response = await axios.get(API_URL + "/get-transaction-history", {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });
    return {
        status: response.status,
        result: response.data
    };
}