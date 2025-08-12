import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Historial from './routes/Historial/Historial';
import Plantillas from './routes/Plantillas/Plantillas';
import Correos from './routes/Correos/Correos';

function App() {

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={
                        <RutaProtegida>
                            <Home />
                        </RutaProtegida>
                    } />
                    <Route path="/Historial" element={
                        <RutaProtegida>
                            <Historial />
                        </RutaProtegida>
                    } />
                    <Route path="/Correos" element={
                        <RutaProtegida>
                            <Correos />
                        </RutaProtegida>
                    } />
                    <Route path="/Plantillas" element={
                        <RutaProtegida>
                            <Plantillas />
                        </RutaProtegida>
                    } />
                    <Route path="/enviar-plantilla" element={<EnviarPlantilla />} />
                    <Route path="/crear-correo" element={<CrearCorreo />} />
                    <Route path="/Login" element={
                        <Login />
                    } />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App