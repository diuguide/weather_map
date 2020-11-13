import { GET_SEARCH_QUERY, RECENT_SEARCH } from './types';

export const getSearch = () => {
    return {
        type: GET_SEARCH_QUERY
    }
}

export const recentSearch = () => {
    return {
        type: RECENT_SEARCH
    }
}