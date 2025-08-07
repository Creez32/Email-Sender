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
                        <Home />
                    } />
                    <Route path="/Historial" element={
                        <Historial />
                    } />
                    <Route path="/Correos" element={
                        <Correos />
                    } />
                    <Route path="/Plantillas" element={
                        <Plantillas />
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