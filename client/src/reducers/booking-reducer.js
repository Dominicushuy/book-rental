import * as type from './../contants/type';

const INITIAL_STATE = {
    data : [],
    errors: [],
    isfetching : false
}

export const userBooingsReducer = ( state = INITIAL_STATE, actions  ) =>{
    switch (actions.type) {
        case type.FETCH_USER_BOOKINGS_INIT:
            return  {...state, data:[] , errors:[], isfetching:true };
        
        case type.FETCH_USER_BOOKINGS_SUCCESS:
            return  {...state, data:actions.userBookings , errors:[], isfetching:false };

        case type.FETCH_USER_BOOKINGS_FAIL:
            return  {...state, data:[] , errors:actions.errors , isfetching:false };
        
        default:
            return state;
    }
}