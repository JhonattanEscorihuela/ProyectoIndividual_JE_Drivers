let axios = require("axios");
let url = "http://localhost:5000/drivers/";
let { Team } = require('../db.js');

let teamController = {
    getAllTeams: async (req, res) => {
        try {
            const driversInDB = await Team.findAll();
            let teams = [];

            if (driversInDB.length === 0) {
                const response = await axios.get(url);
                const driversFromAPI = response.data;

                driversFromAPI.forEach((driver) => {
                    if (driver.teams) {
                        const driverTeams = driver.teams.split(',').map(team => team.trim());
                        driverTeams.forEach((teamName) => {
                            if (!teams.includes(teamName)) {
                                teams.push(teamName);
                            }
                        });
                    }
                });

                await Team.bulkCreate(teams.map((team) => ({ nombre: team })));
                res.json(teams);
            } else {
                teams = driversInDB.map((team) => team.nombre);
                res.json(teams);
            }
        } catch (error) {
            console.error('Error al obtener equipos de conductores:', error);
            res.status(500).json({ error: 'Ocurrió un error al obtener equipos de conductores.' });
        }

    },

};

module.exports = teamController;
