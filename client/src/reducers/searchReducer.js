import { RECENT_SEARCH, SEARCH_DATA } from '../actions/types';

const initialState = {
    recent_search: '',
    search_data: {}
}


export default (state = initialState, action) => {
    switch(action.type) {
        case RECENT_SEARCH:
            return {
                ...state,
                recent_search: action.recent_search
            }
        case SEARCH_DATA:
            return {
                ...state,
                search_data: action.search_data

            }    
        default:
            return state;
    }
}