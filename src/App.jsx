import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RutaProtegida } from './components/RutaProtegida/RutaProtegida';

//Components
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Historial from './routes/Historial/Historial';
import Plantillas from './routes/Plantillas/Plantillas';

import Correos from './routes/Correos/Correos';
import EnviarPlantilla from './routes/Correos/components/EnviarPlantilla';
import CrearCorreo from './routes/Correos/components/CrearCorreo';

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

                    <Route
                        path="/Correos/enviar-plantilla"
                        element={
                            <RutaProtegida>
                                <EnviarPlantilla />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/Correos/crear-correo"
                        element={
                            <RutaProtegida>
                                <CrearCorreo />
                            </RutaProtegida>
                        }
                    />

                    <Route path="/Plantillas" element={
                        <RutaProtegida>
                            <Plantillas />
                        </RutaProtegida>
                    } />
                    <Route path="/Login" element={
                        <Login />
                    } />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App