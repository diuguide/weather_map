import { DATA_LOADED, RECENT_SEARCH, SEARCH_DATA, SET_HOME, CLEAR_DATA } from '../actions/types';

const initialState = {
    recent_search: [],
    search_data: {},
    data_loaded: false,
    home: null
}

 const Actions = (state = initialState, action) => {
    switch(action.type) {
        case RECENT_SEARCH:
            return {
                ...state,
                recent_search: action.payload
            }
        case SET_HOME:
            return{
                ...state,
                home: action.payload
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
        case CLEAR_DATA:
            return {
                ...state,
                recent_search: [],
                search_data: {},
                data_loaded: false,
                home: ''
            }  
        default:
            return state;
    }
}

export default Actions;