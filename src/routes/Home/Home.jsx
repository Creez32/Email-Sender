import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <main className='Home'>
            <h1 className='titular'>¿Que hacemos hoy?</h1>
            <section className='acciones'>
                <Link to="/Correos" className="btn">Nuevo Correo</Link>
                <Link to="/Historial" className="btn">Historial</Link>
                <Link to="/Plantillas" className="btn">Plantillas</Link>
            </section>
        </main>
    )
}

export default Home
