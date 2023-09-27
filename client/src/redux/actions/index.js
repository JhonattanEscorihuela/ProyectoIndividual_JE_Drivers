import axios from "axios";




export let GET_DRIVERS = "GET_DRIVERS";
export let GET_BY_NAME = "GET_BY_NAME";
export let GET_BY_ID = "GET_BY_ID";
export let CREATE_DRIVER = "CREATE_DRIVER";
export let GET_TEAMS = 'GET_TEAMS';

export function getDrivers() {
    return async function (dispatch) {
        let response = await axios("http://localhost:3001/drivers");
        return dispatch({
            type: GET_DRIVERS,
            payload: response.data
        })
    }
}

export function getByName(nombre) {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/drivers/name?nombre=${nombre}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data
        })
    }
}


export function getById(id) {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/drivers/${id}`);
        return dispatch({
            type: GET_BY_ID,
            payload: response.data
        })
    }
}

export function createDriver(driverData) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/drivers', driverData);

            dispatch({
                type: CREATE_DRIVER,
                payload: response.data,
            });

        } catch (error) {

            console.error('Error al crear el driver:', error);
        }
    };
}

export function getTeams() {
    return async function (dispatch) {
        let response = await axios("http://localhost:3001/teams");
        return dispatch({
            type: GET_TEAMS,
            payload: response.data
        })
    }

}