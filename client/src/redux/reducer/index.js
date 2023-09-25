import { GET_DRIVERS, GET_BY_NAME, GET_BY_ID } from "../actions";



let initialState = {
    allDrivers: [],
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
                allDrivers: payload,
            };
        default:
            return { ...state }
    }
}

export default rootReducer;