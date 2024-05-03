import { Outlet } from "react-router-dom";
import useRefresh from "../hook/useRefresh";
import { useState, useEffect } from "react";
import useAuth from "../hook/useAuth";
import Spinner from 'react-bootstrap/Spinner';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth, refresh]);

    return (
        <>
            {isLoading ?       <Spinner animation="border" variant="dark" /> : <Outlet />}
        </>
    );
};

export default PersistLogin;
