import { GET_DRIVERS, GET_BY_NAME, GET_BY_ID, CREATE_DRIVER, GET_TEAMS, FILTER_BY_TEAM, FILTER_BY_ORIGIN, SORT_DRIVERS } from "../actions";



let initialState = {
    allDrivers: [],
    driverById: [],
    driversCopy: [],
    myFavorites: [],
    posts: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: payload,
                driversCopy: payload,
            };
        case GET_BY_NAME:
            return {
                ...state,
                allDrivers: payload,
            };
        case GET_BY_ID:
            return {
                ...state,
                driverById: payload,
            };
        case CREATE_DRIVER:
            return {
                ...state,
                allDrivers: [...state.allDrivers, payload],
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: payload,
            };
        case FILTER_BY_TEAM:
            return {
                ...state,
                allDrivers: payload,
            };
        case FILTER_BY_ORIGIN:
            return {
                ...state,
                allDrivers: payload,
            };
        case SORT_DRIVERS:
            return {
                ...state,
                allDrivers: payload,
            };
        default:
            return { ...state }
    }
}



export default rootReducer;