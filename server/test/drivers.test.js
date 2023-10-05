const request = require('supertest');
const app = require('../app'); 

describe('Pruebas para las rutas de conductores', () => {
  test('Obtener todos los conductores', async () => {
    const response = await request(app).get('/api/drivers');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Crear un nuevo conductor', async () => {
    const nuevoConductor = {
      nombre: 'Ejemplo',
      apellido: 'Apellido',
      // ...otros campos requeridos
    };

    const response = await request(app)
      .post('/api/drivers')
      .send(nuevoConductor);

    expect(response.status).toBe(201);
    expect(response.body.nombre).toBe('Ejemplo');
  });
});
