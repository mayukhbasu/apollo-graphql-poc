import React from 'react';

const auth = () => {
    return !!localStorage.getItem('token');
}

export default auth;