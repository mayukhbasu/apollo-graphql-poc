import React from 'react';
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({
    contextComponent,
    component: Component,
    value,
    ...rest
    
  }) => {
    const { Provider } = contextComponent;
    
    return (
      <Route
        {...rest}
        render={props => {
          if(value.getUserInfo.firstName && value.getUserInfo.lastName) {
            return <Provider value={value}>
                    <Component />
                  </Provider>
          } else {
              return <Redirect to="/"/> 
          }
          
        }}
      />
    );
  };
  