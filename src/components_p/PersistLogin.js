import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
// import useLocalstorage from "../hooks/useLocalStorage";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    // const [persist] = useLocalstorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
        // eslint-disable-next-line
    }, [])

    // Only for development
    // wrap this to better behavior
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`auth: ${JSON.stringify(auth)}`);
    }, [isLoading])

    return (
        <>
            {isLoading ?
                <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;