import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isJwtValid } from "../../helper/Jwt";


export default function Main() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!isJwtValid()) navigate("/login", { replace: true });
    }, [navigate]);

    return(
        <>
            <h3>Main</h3>
        </>
    );
}