const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { initialize, disconnect } = require('mongoose-testing-library');
const Driver = require('./../src/db'); 

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  initialize();
});

afterAll(async () => {
  disconnect();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Pruebas para el modelo Driver', () => {
  test('Crear un nuevo conductor', async () => {
    const nuevoConductor = new Driver({
      nombre: 'Ejemplo',
      apellido: 'Apellido',
      // ...otros campos requeridos
    });

    const conductorGuardado = await nuevoConductor.save();
    expect(conductorGuardado.nombre).toBe('Ejemplo');
  });

  test('Buscar un conductor por nombre', async () => {
    // Realizar una búsqueda y verificar el resultado
  });
});
