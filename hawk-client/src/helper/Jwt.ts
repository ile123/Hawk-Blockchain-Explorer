import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const isJwtValid = () => {
    const token: string | undefined = Cookies.get("token");
    if(!token) return false;
    const decodedJwt = jwtDecode(token);
    if(decodedJwt?.exp && Date.now() >= (decodedJwt.exp * 1000)) {
        localStorage.removeItem("token");
        return false;
    }
    return true;
}