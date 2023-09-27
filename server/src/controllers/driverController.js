let axios = require("axios");
let url = "http://localhost:5000/drivers/";
let imagenPorDefecto = "https://img.redbull.com/images/c_fill,w_520,h_580,g_auto,f_auto,q_auto/redbullcom/2023/3/2/hxtnynke2onx5c3lvwnb/rbr-driverlayer-sergio.jpg";

let { Driver, Team } = require('../db.js');
const { Op } = require("sequelize");


async function findTeamByName(teamName) {
    const team = await Team.findOne({ where: { nombre: teamName } });
    return team;
}

let infoCleaner = (arr) => {
    return arr.map(driver => ({
        id: driver.id,
        referencia: driver.driverRef,
        number: driver.number,
        code: driver.code,
        nombre: driver.name.forename,
        apellido: driver.name.surname,
        imagen: driver.image?.url || imagenPorDefecto,
        fecha_de_nacimiento: driver.dob,
        nacionalidad: driver.nationality,
        teams: driver.teams,
        descripcion: driver.description,
        created: false,
    }));

}

let driverController = {
    getAllDrivers: async (req, res) => {
        try {
            let dbDrivers = await Driver.findAll();
            let apiDrivers = await axios.get(url);

            apiDrivers = infoCleaner(apiDrivers.data);
            driversApiDB = [...apiDrivers, ...dbDrivers]

            res.json(driversApiDB);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener los drivers." });
        }
    },
    getDriverById: async (req, res) => {
        let { idDriver } = req.params;
        let source = isNaN(idDriver) ? "bdd" : "api";

        try {
            if (source === "api") {
                let apiDriver = await axios.get(url + idDriver);
                apiDriver = infoCleaner([apiDriver.data]);
                res.json(apiDriver);
            } else {
                let driver = await Driver.findByPk(idDriver);
                res.status(200).json(driver);
            }
        } catch (error) {
            res.status(500).json({ error: "Driver no encontrado" });
        }
    },
    getDriversByName: async (req, res) => {

        let { nombre } = req.query;
        console.log(nombre);
        try {

            let usersApi = await axios.get(url);
            usersApi = infoCleaner(usersApi.data);
            let usersApiFilter = usersApi.filter(driver => {
                const driverName = driver.nombre.toLowerCase();
                return driverName.includes(nombre.toLowerCase());
            });

            let usersDB = await Driver.findAll({
                where: {
                    nombre: {
                        [Op.iLike]: `%${nombre}%` // Buscar nombres que contengan el nombre proporcionado
                    }
                }
            });
            let matchingDrivers = [...usersApiFilter, ...usersDB];

            let first15Drivers = matchingDrivers.slice(0, 15);

            if (first15Drivers.length === 0) {
                res.status(404).json({ error: "No se encontraron conductores con el nombre especificado." });
            } else {
                res.json(first15Drivers);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al buscar conductores por el name" });
        }
    },
    postDrivers: async (req, res) => {
        let { nombre, apellido, descripcion, imagen, nacionalidad, fecha_de_nacimiento, teams } = req.body;
        try {
            let nuevoDriver = await Driver.create({
                nombre,
                apellido,
                descripcion,
                imagen,
                nacionalidad,
                fecha_de_nacimiento,
                
            });
    
            if (teams) {
                const teamUUID = await findTeamByName(teams);
                if (teamUUID) {
                    await nuevoDriver.addTeams([teamUUID]);
                }
            }
    
            res.status(201).json(nuevoDriver);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al crear el driver.' });
        }
    }
    
}

module.exports = driverController;