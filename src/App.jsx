import { useState } from 'react'
import Home from './routes/Home/Home'
import Header from './components/Header/Header'
import Login from './routes/Login/Login'
import Historial from "./routes/Historial/Historial";

function App() {

    return (
        <>
            <Header />
            <Historial />
            {/* <Login /> */}
        </>
    )
}

export default App