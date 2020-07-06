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

export default () => (
    
        <BrowserRouter>
        <NavbarApp/>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <ProtectedRoute exact path="/shopping" component={Shopping} />
            <Route path="/admin" exact component={Admin}/>
            <Route path="/admin/getAllProducts" exact component={ProductManagement}/>
        </Switch>
    </BrowserRouter>
)

