import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;
import * as jwt from 'jsonwebtoken';

import { connect } from 'react-redux';
import * as actions from './../../actions';

import RentalSearchInput from './../rental/rental_listing/RentalSearchInput';

class Header extends Component {
    Logout = () =>{
        return (
                this.props.auth.isAuth &&
                <div>
                    <div style={{ color : "white" , fontSize: '20px' }} > { this.props.auth.username } </div> 
                    <Link className='nav-item nav-link' style={{display:"inline"}} to='/rentals' onClick={ () => this.props.dispatch( actions.logout()) } >Logout</Link>
                </div>
            )
    }

    renderAuthButtons = (isAuth, username) =>(
        !isAuth ?
            <React.Fragment>
                <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                <Link className='nav-item nav-link' to='/register'>Register</Link>
            </React.Fragment>
        :   (
                <React.Fragment>
                    <div className='nav-item nav-link' > { username } </div> 
                    <Link className='nav-item nav-link' style={{display:"inline"}} to='/rentals' onClick={ () => this.props.dispatch( actions.logout()) } >Logout</Link>
                </React.Fragment>
            )

    )

    renderOwnerSection(isAuth) {
        if (isAuth) {
          return (
            <div className="nav-item dropdown">
              <a href='# ' className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                Owner Section
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
                <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
                <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
              </div>
            </div>
          )
        }
      }

    render() {
        const isAuth = localStorage.getItem('auth_token');
        const username = isAuth ? jwt.decode(isAuth).username : null;

        return (
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to="/" >BookWithMe</Link>
                    <RentalSearchInput />
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>
                            {this.renderAuthButtons(isAuth, username)}
                            {this.renderOwnerSection(isAuth)}
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps)(Header);