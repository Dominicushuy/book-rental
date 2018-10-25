import React, { Component } from 'react';
import './App.css';

import { Route ,Redirect } from "react-router-dom";

import Header from './components/shared/header';
import RentalList from './components/rental/rental_listing/RentalList';
import RentalDetail from './components/rental/rental_detail/RentalDetail';
import Login from './components/login-register/Login';
import Register from './components/login-register/Register';

import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';

class App extends Component {

  render() {
    return (
      <div>
          <Header />
          <Route exact path="/" render={ () => <Redirect to='/rentals' /> } />
          <Route exact path="/rentals" component={RentalList} />
          <ProtectedRoute exact path="/rentals/:id" component={RentalDetail} />
          

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

      </div>
    );
  }
}

export default App;
