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

export const selectedRentalReducer = (state=INITIAL_STATE.rental, action) =>{
    switch (action.type) {
        case type.FETCH_RENTALS_BY_ID_SUCCESS:
            return Object.assign({}, state, { data: action.rental});
        default:
            return state;
    }
}

export const rentalReducer = ( state=INITIAL_STATE.rentals , action ) =>{
    switch (action.type) {
        case type.FETCH_RENTALS_SUCCESS:
        return {...state, data: action.rentals};
        default:
            return state;
    }
}