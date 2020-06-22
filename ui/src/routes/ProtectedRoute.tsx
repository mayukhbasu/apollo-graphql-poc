import React from 'react';
import { Route, Redirect } from "react-router-dom";
import useAuthStatus from '../hooks/UseAuthHook';

export const ProtectedRoute = ({
    component: Component,
    ...rest
  }) => {
    const authToken = localStorage.getItem('token');
    return (
      <Route
        {...rest}
        render={props => {
          if(authToken) {
            return <Component/>
          } else {
              return <Redirect to="/"/> 
          }
          
        }}
      />
    );
  };
  