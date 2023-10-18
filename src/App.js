import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioIngreso from './Paginas/FormIngreso';
import FormularioRegistro from './Paginas/FormRegistroUsuario';
import FormularioReclamo from './Paginas/FormReclamo';
import PantallaInicio from './Paginas/PantallaInicio';
import PantallaConsultaReclamo from './Paginas/PantallaConsultaReclamo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormularioIngreso />} />
        <Route path="/FormRegistroUsuario" element={<FormularioRegistro />} />
        <Route path="/FormReclamo" element={<FormularioReclamo />} />
        <Route path="/PantallaInicio" element={<PantallaInicio />} />
        <Route path="/PantallaConsultaReclamo" element={<PantallaConsultaReclamo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;