let axios = require("axios");
let url = "http://localhost:5000/drivers/";
let imagenPorDefecto = "https://img.redbull.com/images/c_fill,w_520,h_580,g_auto,f_auto,q_auto/redbullcom/2023/3/2/hxtnynke2onx5c3lvwnb/rbr-driverlayer-sergio.jpg";
let driversData = [];
let { Driver, Team } = require('../db.js');

async function findTeamByName(teamName) {
    const team = await Team.findOne({ where: { nombre: teamName } });
    return team;
}

let driverController = {
    getAllDrivers: async (req, res) => {
        try {
            let apiDrivers = await axios.get(url);
            apiDrivers = apiDrivers.data;
            let driversConImagen = apiDrivers.map(driver => ({
                ...driver,
                image: {
                    url: driver.image?.url || imagenPorDefecto
                }
            }));

            driversData = driversConImagen;
            res.json(driversConImagen);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener los drivers." });
        }
    },
    getDriverById: async (req, res) => {
        let { idDriver } = req.params;
        idDriver = parseInt(idDriver);
        try {
            let driver = driversData.find(driver => driver.id === idDriver);

            if (driver) {
                res.json(driver);
            } else {
                res.status(404).json({ error: "Conductor no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener el detalle del conductor" });
        }
    },
    getDriversByName: async (req, res) => {
        let { "name.forename": name } = req.query;
        try {
            let matchingDrivers = driversData.filter(driver => {
                const driverName = driver.name.forename.toLowerCase();
                return driverName.includes(name.toLowerCase());
            });

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
            let teamUUID = null;

            // Si el cliente proporcionó un nombre de equipo, busca el UUID correspondiente
            if (teams) {
                const team = await findTeamByName(teams);
                if (team) {
                    teamUUID = team.team_id;
                }
            }

            let nuevoDriver = await Driver.create({
                nombre,
                apellido,
                descripcion,
                imagen,
                nacionalidad,
                fecha_de_nacimiento,
                teams,
            });

            if (teamUUID) {
                // Asocia el equipo al conductor
                await nuevoDriver.addTeams([teamUUID]);
            }

            res.status(201).json(nuevoDriver);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al crear el driver.' });
        }
    }
}

module.exports = driverController;