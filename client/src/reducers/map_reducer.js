import  * as type from './../contants/type';

const INITIAL_STATE = {
  isReloading: false
}

export const rentalMapReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case type.RELOAD_MAP:
      return {...state, isReloading: true};

    case type.RELOAD_MAP_FINISH:
      return {...state, isReloading: false};
      
    default:
      return state;
  }
}
