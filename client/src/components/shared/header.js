import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;

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

    render() {
        const { auth } = this.props;
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
                        {   !auth.isAuth &&
                                <React.Fragment>
                                    <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                                    <Link className='nav-item nav-link' to='/register'>Register</Link>
                                </React.Fragment>          
                        }

                        { this.Logout() }
                        
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