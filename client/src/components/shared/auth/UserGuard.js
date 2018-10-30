import React from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class UserGuard extends React.Component {

    render() {
        const {isAllowed, isFetching} = this.props;
    
        if (isAllowed && !isFetching) {
            return this.props.children;
        } else if (!isAllowed && !isFetching) {
            return <Redirect to={{pathname: '/rentals'}} />
        } else {
            return <CircularProgress thickness={7} style={{color:'red' , marginLeft:'45%'}} />  
        }
    }
  }
  