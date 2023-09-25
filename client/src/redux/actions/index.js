import axios from "axios"

export let GET_DRIVERS = "GET_DRIVERS";
export let GET_BY_NAME = "GET_BY_NAME";
export let GET_BY_ID = "GET_BY_ID";


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