import { RECENT_SEARCH } from '../actions/types';

const initialState = {
    recent_search: ''
}


export default (state = initialState, action) => {
    switch(action.type) {
        case RECENT_SEARCH:
            return {
                ...state,
                recent_search: action.recent_search
            }
        default:
            return state;
    }
}