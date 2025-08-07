import { useState } from 'react'
import Home from './routes/Home/Home'
import Header from './components/Header/Header'
import Login from './routes/Login/Login'

function App() {

    return (
        <>
            <Header />
            <Home />
            {/* <Login /> */}
        </>
    )
}

export default App