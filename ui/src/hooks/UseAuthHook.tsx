import React from 'react';
import { useState, useEffect } from 'react';

const useAuthStatus = () => {
    const [authToken, setAuthToken] = useState('');
    const token:any = localStorage.getItem('token');
    useEffect(() => {
        const setAuth = () => setAuthToken(token)
    },[]);
    return authToken;
}
export default useAuthStatus;