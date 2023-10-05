import React from 'react';
import { render } from '@testing-library/react';
import Home from './../src/views/home/home.component';


test('Renderiza correctamente', () => {
  const { getByText } = render(<Home />);
  const elemento = getByText(/Home/i);
  expect(elemento).toBeInTheDocument();
});

test('Realiza alguna acción cuando se hace clic', () => {
  // Simula una acción de clic y verifica el resultado
  alert("Se ha Montado el Home")
});