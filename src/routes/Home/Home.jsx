import React from 'react'
import './Home.css'

function Home() {
    return (
        <main className='Home'>
            <h1 className='titular'>Holi</h1>
            <section className='acciones'>
                <button>Nuevo Correos</button>
                <button>Historial</button>
                <button>Plantillas</button>
            </section>
        </main>
    )
}

export default Home