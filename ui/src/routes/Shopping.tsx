import React, {Fragment} from 'react';
import NavbarApp from '../core/Navbar';
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
const Shopping = (props:any) => {
    const {loading, error, data} = useQuery(USER_INFO_QUERY);
    return (
        <Fragment>
            <NavbarApp/>
            Inside Shopping Component
        </Fragment>
    )
}

export default Shopping;