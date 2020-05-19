import React, {Fragment, useEffect} from 'react';
import NavbarApp from '../core/Navbar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const USER_INFO_QUERY = gql`
{
    getUserInfo
}
`
const Shopping = (props:any) => {
    const {loading, error, data} = useQuery(USER_INFO_QUERY);
    console.log(data);
    return (
        <Fragment>
            <NavbarApp/>
            Inside Shopping Component
        </Fragment>
    )
}

export default Shopping;