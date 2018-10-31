import axios from 'axios';
import * as type from './../contants/type';
import authService from './../services/auth_service';
import axiosService from './../services/axios_service';

const axiosInstance = axiosService.getInstance(); //có token ở header chỉ request đc khi đăng nhập

//<==========================================================================>
//                                RENTALS ACTION
//<==========================================================================>

const fetchRentalsInit = () => {
    return {
      type: type.FETCH_RENTALS_INIT
    }
  }


const fetchRentalsFail = (errors) => {
    return {
      type: type.FETCH_RENTALS_FAIL,
      errors
    }
  }

export const fetchRentals = (city) =>{
    const url = city ? `/rentals?city=${city}` : '/rentals';

    return dispatch =>{
        dispatch( fetchRentalsInit() ); 

        axiosInstance.get(url)
        .then( response => response.data)
        .then( rentals => dispatch(fetchRentalsSuccess(rentals)) )
        .catch( ({response}) => dispatch(fetchRentalsFail( response.data.errors )) )
    }
}

const fetchRentalsSuccess = (rentals) =>{
    return {
        type : type.FETCH_RENTALS_SUCCESS,
        rentals
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

export const clearRentalDetail = () =>{
    return {
        type: type.CLEAR_RENTAL_DETAIL ,
        rental : ""
    }
}

export const clearRentalsDetail = () =>{
    return {
        type: type.CLEAR_RENTALS_DETAIL ,
        rentals : ""
    }
}

//create Rental

export const createRental = (rentalData) =>{
    return axiosInstance.post('rentals', rentalData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

export const verifyRentalOwner = (id) =>{
    return axiosInstance.get(`/rentals/${id}/verify-user`)
}


//Edit Rental
export const updateRental = (id , rentalData ) => dispatch =>{
    return axiosInstance.patch(`rentals/${id}`, rentalData)
                        .then( res => res.data )
                        .then( rentalUpdated => {
                            dispatch(updateRentalSuccess(rentalUpdated))
                            
                            if(rentalData.city || rentalData.street ){
                                dispatch(reloadMap())
                            }
                        })
                        .catch( ({response}) => dispatch( updateRentalFail(response.data.errors) ) )
}

const updateRentalSuccess = (rental) =>{
    return {
        type : type.UPDATE_RENTAL_SUCCESS,
        rental
    }
}
const updateRentalFail = (errors) =>{
    return {
        type : type.UPDATE_RENTAL_FAIL,
        errors
    }
}

export const resetRentalErrors = () =>{
    return {
        type : type.RESET_RENTAL_ERRORS
    }
}

//<==========================================================================>
//                                MAP ACTION
//<==========================================================================>

export const reloadMap = () =>{
    return {
        type: type.RELOAD_MAP
    }
}

export const reloadMapFinish = () =>{
    return {
        type : type.RELOAD_MAP_FINISH
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


export const createBooking = (booking) =>{
    return axiosInstance.post('/bookings', booking)
                        .then( res => res.data )
                        .catch( ({response}) => Promise.reject(response.data.errors) )
}

//<==========================================================================>
//                                BOOKING MANAGE
//<==========================================================================>

const fetchUserBookingsInit = () => {
    return {
      type: type.FETCH_USER_BOOKINGS_INIT
    }
  }
  
const fetchUserBookingsSuccess = (userBookings) => {
    return {
      type: type.FETCH_USER_BOOKINGS_SUCCESS,
      userBookings
    }
  }
  
const fetchUserBookingsFail = (errors) => {
    return {
      type: type.FETCH_USER_BOOKINGS_FAIL,
      errors
    }
  }

export const fetchUserBookings = () =>{
    
    return dispatch =>{
        dispatch(fetchUserBookingsInit);

        axiosInstance.get('/bookings/manage')
                     .then( res => res.data )
                     .then( userBookings => dispatch(fetchUserBookingsSuccess(userBookings)) )
                     .catch( errors => dispatch(fetchUserBookingsFail(errors)) )
    }

}

//<==========================================================================>
//                                USER MANAGE
//<==========================================================================>

export const getUserRentals = () =>{
    return axiosInstance.get('rentals/manage').then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

export const deleteRental = (rentalId) =>{
    return axiosInstance.delete(`rentals/${rentalId}`).then(
        res => res.data,
        err => Promise.reject( err.response.data.errors )
    )
}

//<==========================================================================>
//                                IMAGE UPLOAD
//<==========================================================================>

export const uploadImage = image =>{
    let formData = new FormData() ;
    const config = {
        header : {'content-type':'multipart/form-data'}
    }
    formData.append("file", image);

    return axiosInstance.post('/image-upload', formData, config )
        .then( 
            res => res.data
        ).catch(({response}) => Promise.reject(response))
}