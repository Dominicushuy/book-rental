import * as type from './../contants/type';

const INITIAL_STATE = {
    rentals: {
      data: [],
      errors: []
    },
    rental: {
      data: {},
      errors: []
    }
  }

//RentalDetail
export const selectedRentalReducer = (state=INITIAL_STATE.rental, action) =>{
    switch (action.type) {
        case type.CLEAR_RENTAL_DETAIL:
            return Object.assign({}, state, { data: action.rental});

        case type.FETCH_RENTALS_BY_ID_SUCCESS:
            return Object.assign({}, state, { data: action.rental});
        

        default:
            return state;
    }
}

//Rentals
export const rentalReducer = ( state=INITIAL_STATE.rentals , action ) =>{
    switch (action.type) {

        case type.FETCH_RENTALS_INIT:
            return {...state, data:[] , errors:[]}
        
        case type.CLEAR_RENTALS_DETAIL:
            return Object.assign({}, state, { data: action.rentals});

        case type.FETCH_RENTALS_SUCCESS:
            return Object.assign({}, state, { data: action.rentals});

        case type.FETCH_RENTALS_FAIL:
            return Object.assign( {} , state , { errors: action.errors, data: [] } );

        default:
            return state;
    }
}