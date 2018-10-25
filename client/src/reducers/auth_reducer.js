import * as type from './../contants/type';

const INITIAL_STATE ={
    isAuth : false,
    errors : [],
    username : ''
}

export const authReducer = ( state = INITIAL_STATE, action ) =>{
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return Object.assign( {} , state , { isAuth : true , errors : [] , username :action.username } ) ;

        case type.LOGIN_FAILURE:
            return Object.assign({}, state, { errors: action.errors });

        case type.LOGOUT:
            return Object.assign({}, state, {isAuth: false, username: ''});

        default:
            return state;
    }
}