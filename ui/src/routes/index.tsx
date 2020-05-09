import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './Register';
import Home from './Home';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
        </Switch>
    </BrowserRouter>
)
    
