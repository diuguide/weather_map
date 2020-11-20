import { DATA_LOADED, RECENT_SEARCH, SEARCH_DATA } from '../actions/types';

const initialState = {
    recent_search: '',
    search_data: {},
    data_loaded: false
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
        case DATA_LOADED:
            return {
                ...state,
                data_loaded: true
            }  
        default:
            return state;
    }
}