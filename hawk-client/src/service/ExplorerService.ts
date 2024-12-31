import axios from "axios"
import Cookies from 'js-cookie';

const API_URL = "http://localhost:3000/api";

export const GetBlockInfo = async(searchTerm: string | undefined) => {
    const response = await axios.get(API_URL + `/get-block-info?query=${searchTerm}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });

    return {
        status: response.status,
        result: response.data
    };
}

export const GetAddressInfo = async(searchTerm: string | undefined) => {
    const response = await axios.get(API_URL + `/get-address-info?query=${searchTerm}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });
    
    return {
        status: response.status,
        result: response.data
    };
}

export const GetTransactionInfo = async(searchTerm: string | undefined) => {
    const response = await axios.get(API_URL + `/get-transaction-info?query=${searchTerm}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });

    return {
        status: response.status,
        result: response.data
    };
}

export const Search = async(searchTerm: string | undefined | null) => {
    const response = await axios.get(API_URL + `/search?query=${searchTerm}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });

    return {
        status: response.status,
        result: response.data
    };
}