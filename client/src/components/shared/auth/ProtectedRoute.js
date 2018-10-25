import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export function ProtectedRoute(props) {

  const {component: Component, ...rest} = props;
  const isAuth = localStorage.getItem('auth_token');

  return (
    <Route {...rest} render={(props) => isAuth
                                        ? <Component {...props} {...rest}/>
                                        : <Redirect to={{pathname: '/login'}}/>}/>

    )
}
