import React, { Component } from 'react';
import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './../../actions';

class Login extends Component {

    LoginUser = (data) =>{
        this.props.dispatch( actions.login(data) );
    }

    render() {
        const { isAuth , errors } = this.props.auth;
        const { successRegister } = this.props.location.state || false

        if(isAuth){
            return <Redirect to={ { pathname: '/rentals' } }/>
        }

        return (
            <section id='register'>
                <div className='bwm-form'>
                <div className='row'>
                    <div className='col-md-5 p-5'>
                    <h1>Login</h1>
                        { successRegister && 
                            <div className='alert alert-success'>
                                <p> You have been succesfuly registered, please login now. </p>
                            </div>
                        }
                        <LoginForm submitCb={this.LoginUser} errors={errors} />
                    </div>
                    <div className='col-md-6 ml-auto'>
                    <div className='image-container'>
                        <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                        <img src='/img/login-image.jpg' alt=""/>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps)(Login); 