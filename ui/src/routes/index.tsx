import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from '../core/Login';
import Shopping from './Shopping';
import Admin from './Admin/Containers/Admin';
import ProductManagement from './Admin/Containers/ProductManagement';
import { ProtectedRoute } from './ProtectedRoute';
import NavbarApp from '../core/Navbar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import UserInfoContext from '../context/UserInfoContext';


const USER_INFO_QUERY = gql`
{
    getUserInfo{
        firstName
        lastName
    }
}
`
export default () => {
    const {loading, error, data} = useQuery(USER_INFO_QUERY);
    if(loading) return <div>Loading...</div>
    if(error) return <Login/>
    return (
    
        <BrowserRouter>
        <UserInfoContext.Provider value={data}>
            <NavbarApp />
        </UserInfoContext.Provider>
        
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <ProtectedRoute exact path="/shopping" contextComponent={UserInfoContext} value={data} component={Shopping}/>
        
            <Route path="/admin" exact component={Admin}/>
            <Route path="/admin/getAllProducts" exact component={ProductManagement}/>
        </Switch>
    </BrowserRouter>
)

}
