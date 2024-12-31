import axios from "axios";
import { LoginInfo, SendRegisterInfo } from "../type/Authentication";
import Cookies from 'js-cookie';

const API_URL = "http://localhost:3000/api";

export const LoginUser = async (loginInfo: LoginInfo) => {
  try {

    const response = await axios.post(API_URL + "/login", loginInfo);

    if (response.status === 200) {
      Cookies.set("token", response.data.token, { expires: 1, sameSite: 'None', secure: true });
      Cookies.set("email", response.data.email, { expires: 1, sameSite: 'None', secure: true });
      return true;
    } else {
      console.error("Login failed with status:", response.status);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};

export const RegisterUser = async (registerInfo: SendRegisterInfo) => {
  try {
    const response = await axios.post(API_URL + "/register", registerInfo);

    if (response.status === 201) {
      return true;
    } else {
      console.error("Registration failed with status:", response.status);
      console.error(
        "Error message:",
        response.data || "No additional information."
      );
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};