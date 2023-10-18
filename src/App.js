import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioIngreso from './Paginas/FormIngreso';
import FormularioRegistro from './Paginas/FormRegistroUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormularioIngreso />} />
        <Route path="/FormRegistroUsuario" element={<FormularioRegistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;