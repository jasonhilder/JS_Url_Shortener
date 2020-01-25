import 
{
  GET_URL,
  SET_LOADING,
  CHECK_STORAGE,  
  CLEAR_STORAGE
} 
from '../types';

// Export Switch Statement
export default (state, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case CHECK_STORAGE:
            return {
                ...state,
                shortUrls: action.payload
            }
        case GET_URL:
            return {
                ...state, 
                shortUrls: action.payload,
                loading: false
            }
        case CLEAR_STORAGE:
            return {
                ...state,
                shortUrls: [],
                loading: false
            }
        default: 
            return state;
    }
}