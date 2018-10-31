import React, { Component } from 'react';
import './App.css';

import { Route ,Redirect, Switch } from "react-router-dom";

import Header from './components/shared/header';

import RentalList from './components/rental/rental_listing/RentalList';
import RentalDetail from './components/rental/rental_detail/RentalDetail';
import RentalSearch from './components/rental/rental_listing/RentalSearch';
import RentalCreate from './components/rental/rental_create/RentalCreate';
import RentalUpdate from './components/rental/rental_detail/RentalUpdate';

import BookingManage from './components/booking/booking-manage/BookingMagane';
import RentalManage from './components/rental/rental_manage/RentalManage';

import Login from './components/login-register/Login';
import Register from './components/login-register/Register';

import Payment from './components/shared/payment/StripePayment';

import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';
import {StripeProvider} from 'react-stripe-elements';

class App extends Component {
  constructor(){
    super()
    this.state = {
      stripe: null
    }
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_10CatPBLd02tbHYY1PByTOX4')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
    
        this.setState({stripe: window.Stripe('pk_test_10CatPBLd02tbHYY1PByTOX4')});
      });
    }
  }

  render() {
    return (
      <div>
          <Header />
          <div className="container">
            <Switch >
              <Route exact path="/" render={ () => <Redirect to='/rentals' /> } />
              <Route exact path="/rentals" component={RentalList} />
              <Route exact path="/rentals/:city/homes" component={RentalSearch} />
              
              <ProtectedRoute exact path="/bookings/manage" component={BookingManage} />
              <ProtectedRoute exact path="/rentals/manage" component={RentalManage} />
              <ProtectedRoute exact path="/rentals/new" component={RentalCreate} />

              <Route exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/rentals/:id/edit" component={RentalUpdate} />                 
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              <StripeProvider stripe={this.state.stripe}>  
                <Route exact path="/payment" component={Payment} />
              </StripeProvider>

            </Switch>
          </div>
      </div>
    );
  }
}

export default App;
