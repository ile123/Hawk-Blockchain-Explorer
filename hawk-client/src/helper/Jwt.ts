import { jwtDecode } from "jwt-decode";

export const isJwtValid = () => {
    const token: string | null = localStorage.getItem("token");
    if(!token) return false;
    const decodedJwt = jwtDecode(token);
    if(decodedJwt?.exp && Date.now() >= (decodedJwt.exp * 1000)) {
        localStorage.removeItem("token");
        return false;
    }
    return true;
}