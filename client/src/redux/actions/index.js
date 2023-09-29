import axios from "axios";




export let GET_DRIVERS = "GET_DRIVERS";
export let GET_BY_NAME = "GET_BY_NAME";
export let GET_BY_ID = "GET_BY_ID";
export let CREATE_DRIVER = "CREATE_DRIVER";
export let GET_TEAMS = 'GET_TEAMS';
export let FILTER_BY_TEAM = 'FILTER_BY_TEAM';
export let FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export let SORT_DRIVERS = 'SORT_DRIVERS';

export function getDrivers(filters = {}) {
    return async function (dispatch) {
        let url = 'http://localhost:3001/drivers';

        let response = await axios(url);
        response = response.data;
        let out = [...response]; // Clonamos el arreglo original para no modificarlo directamente

        if (filters.sortOption) {
            out = out.sort((a, b) => {
                const dateA = new Date(a.fecha_de_nacimiento);
                const dateB = new Date(b.fecha_de_nacimiento);
                if (filters.sortOption === "alphabeticalAsc") return a.nombre.localeCompare(b.nombre);
                if (filters.sortOption === "alphabeticalDesc") return b.nombre.localeCompare(a.nombre);
                if (filters.sortOption === "birthYearAsc") return dateA - dateB;
                if (filters.sortOption === "birthYearDesc") return dateB - dateA;
            });
        }

        if (filters.team) {
            out = out.filter((conductor) => conductor.teams?.includes(filters.team));
        }

        if (filters.origin) {
            if (filters.origin === "API") {
                out = out.filter((conductor) => conductor.created === false)
            }
            if (filters.origin === "DB") {
                out = out.filter((conductor) => conductor.created === true);
            }
        }

        return dispatch({
            type: GET_DRIVERS,
            payload: out,
        });
    };
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

export function filterByTeam(team) {
    return async function (dispatch) {
        let filters = {
            team,
        };

        dispatch(getDrivers(filters));
    };
}

export function filterByOrigin(origin) {
    return async function (dispatch) {
        let filters = {
            origin,
        };

        dispatch(getDrivers(filters));
    };
}

export function sortDrivers(sortOption) {
    return async function (dispatch) {
        let filters = {
            sortOption,
        };

        dispatch(getDrivers(filters));
    };
}