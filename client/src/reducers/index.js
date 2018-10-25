import { combineReducers } from 'redux' ;
import { rentalReducer, selectedRentalReducer } from './rental_reducer';
import { authReducer } from './auth_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    rentals : rentalReducer,
    rental : selectedRentalReducer,
    form : formReducer,
    auth : authReducer
})

export default rootReducer;