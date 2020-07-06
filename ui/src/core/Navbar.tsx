import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const USER_INFO_QUERY = gql`
{
    getUserInfo{
        firstName
        lastName
    }
}
`
const NavbarApp = (props:any) => {
    const {loading, error, data} = useQuery(USER_INFO_QUERY);
    console.log(data);
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top mb-5">
            <div className="container">
                <a href="/" className="navbar-brand">Oshop<i className="fa fa-shopping-bag ml-2"aria-hidden="true"></i></a>
            </div>
        </nav>
    )
}

export default NavbarApp;