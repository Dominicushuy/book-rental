import { combineReducers } from 'redux' ;
import { rentalReducer, selectedRentalReducer } from './rental_reducer';
import { authReducer } from './auth_reducer';
import { userBooingsReducer } from './booking-reducer';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    rentals : rentalReducer,
    rental : selectedRentalReducer,
    form : formReducer,
    auth : authReducer,
    userBookings : userBooingsReducer
})

export default rootReducer;