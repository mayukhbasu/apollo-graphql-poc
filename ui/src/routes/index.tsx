import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from '../core/Login';
import Shopping from './Shopping';
import Admin from './Admin/Containers/Admin';
import ProductManagement from './Admin/Containers/ProductManagement';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/shopping" exact component={Shopping}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/admin/getAllProducts" exact component={ProductManagement}/>
        </Switch>
    </BrowserRouter>
)

