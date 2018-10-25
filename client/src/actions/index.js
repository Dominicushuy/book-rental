import axios from 'axios';
import * as type from './../contants/type';
import authService from './../services/auth_service';
import axiosService from './../services/axios_service';

//<==========================================================================>
//                                RENTALS ACTION
//<==========================================================================>

export const fetchRentalsSuccess = (rentals) =>{
    return {
        type : type.FETCH_RENTALS_SUCCESS,
        rentals
    }
}

export const fetchRentals = () =>{
    return dispatch =>{ 
        axios.get('/api/v1/rentals')
        .then( response => response.data)
        .then( rentals => dispatch(fetchRentalsSuccess(rentals)) )
    }
}



export const fetchRentalById = (id) =>{
    return dispatch =>{
        axios.get(`/api/v1/rentals/${id}`)
        .then( response => response.data )
        .then( rental => dispatch(fetchRentalByIdSuccess(rental)) )
    }

}

export const fetchRentalByIdSuccess = (rental) =>{
    return {
        type : type.FETCH_RENTALS_BY_ID_SUCCESS,
        rental
    }
}

//<==========================================================================>
//                                AUTH ACTION
//<==========================================================================>

export const register = (userData) =>{
    return axios.post( '/api/v1/users/register ', userData ).then(
        res =>res.data,
        err => Promise.reject(err.response.data.errors)
    )
}


export const login = (data) =>{
    return dispatch =>{
        return axios.post( '/api/v1/users/auth' , data  )
        .then( res => res.data ) //res.data = token
        .then( token  => {
            authService.saveToken(token);
            dispatch(loginSuccess());
        })
        .catch( ( { response } ) =>{
            dispatch( loginFailure(response.data.errors) )
        })
    }
}

export const loginSuccess = () =>{
    const username = authService.getUsername();

    return {
        type : type.LOGIN_SUCCESS,
        username
    }
}

export const loginFailure = (errors) =>{
    return {
        type: type.LOGIN_FAILURE,
        errors
    }
}

export const logout = () =>{
    authService.invalidateUser();

    return {
        type : type.LOGOUT
    }
}

export const checkAuthState = () =>{
    return dispatch =>{
        if( authService.isAuthenticated() ){
            dispatch(loginSuccess());
        }
    }
}



//<==========================================================================>
//                                BOOKING ACTION
//<==========================================================================>

const axiosInstance = axiosService.getInstance();

export const createBooking = (booking) =>{
    return axiosInstance.post('/bookings', booking)
                        .then( res => res.data )
                        .catch( ({response}) => Promise.reject(response.data.errors) )
}