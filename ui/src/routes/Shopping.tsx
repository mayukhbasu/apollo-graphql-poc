import React, {Fragment} from 'react';
import NavbarApp from '../core/Navbar';
import gql from 'graphql-tag';


const USER_INFO_QUERY = gql`
{
    userInfoQuery
}
`
const Shopping = (props:any) => {

    return (
        <Fragment>
            <NavbarApp/>
            Inside Shopping Component
        </Fragment>
    )
}

export default Shopping;