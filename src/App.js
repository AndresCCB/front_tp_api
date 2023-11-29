import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import FormularioIngreso from './Paginas/FormIngreso';
import FormularioRegistroReclamo from './Paginas/FormRegistroReclamo';
import PantallaInicio from './Paginas/PantallaInicio';
import PantallaConsultaReclamo from './Paginas/PantallaConsultaReclamo';
import FormularioRegistroUsuario from './Paginas/FormRegistroUsuario';
import FormularioRegistroPersona from './Paginas/FormRegistroPersona';
import PantallaInicioAdmin from './Paginas/PantallaInicioAdmin';
import GestionPersona from './Paginas/PantallaGestionarPersonas';
import GestionEdificio from './Paginas/PantallaGestionarEdificios';
import GestionUnidad from './Paginas/PantallaGestionarUnidades';
import FormularioDetallePersona from './Paginas/FormDetallePersona';
import GestionReclamo from './Paginas/PantallaGestionarReclamos';
import FormRegistroUnidades from './Paginas/FormRegistroUnidades';
import FormRegistroImagen from './Paginas/FormAgregarImagen';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormularioIngreso />} />
          <Route path="/FormDetallePersona" element={<FormularioDetallePersona />} />
          <Route path="/FormRegistroPersona" element={<FormularioRegistroPersona />} />
          <Route path="/FormRegistroUsuario" element={<FormularioRegistroUsuario />} />
          <Route path="/FormRegistroReclamo" element={<FormularioRegistroReclamo />} />
          <Route path="/PantallaInicio" element={<PantallaInicio />} />
          <Route path="/PantallaInicioAdmin" element={<PantallaInicioAdmin />} />
          <Route path="/PantallaConsultaReclamo" element={<PantallaConsultaReclamo />} />
          <Route path="/PantallaGestionarPersonas" element={<GestionPersona />} />
          <Route path="/PantallaGestionarEdificios" element={<GestionEdificio />} />
          <Route path="/PantallaGestionarUnidades" element={<GestionUnidad />} />
          <Route path="/PantallaGestionarReclamos" element={<GestionReclamo />} />
          <Route path="/FormRegistroUnidades" element={<FormRegistroUnidades />} />
          <Route path="/FormAgregarImagen" element={<FormRegistroImagen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;