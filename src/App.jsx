import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components
import { RutaProtegida } from './components/RutaProtegida/RutaProtegida';
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Historial from './routes/Historial/Historial';
import Plantillas from './routes/Plantillas/Plantillas';
import CrearPlantillas from './routes/Plantillas/components/crearplantillas';

import Correos from './routes/Correos/Correos';
import EnviarPlantilla from './routes/Correos/components/EnviarPlantilla';
import CrearCorreo from './routes/Correos/components/CrearCorreo';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Home */}
                <Route
                    path="/"
                    element={
                        <RutaProtegida>
                            <Home />
                        </RutaProtegida>
                    }
                />

                {/* Historial */}
                <Route
                    path="/Historial"
                    element={
                        <RutaProtegida>
                            <Historial />
                        </RutaProtegida>
                    }
                />

                {/* Correos */}
                <Route
                    path="/Correos"
                    element={
                        <RutaProtegida>
                            <Correos />
                        </RutaProtegida>
                    }
                />
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

                {/* Plantillas */}
                <Route
                    path="/Plantillas"
                    element={
                        <RutaProtegida>
                            <Plantillas />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/Plantillas/crear"
                    element={
                        <RutaProtegida>
                            <CrearPlantillas />
                        </RutaProtegida>
                    }
                />

                {/* Login */}
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
