import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

function Header() {
    return (
        <header>

            <div className='logo'>
                <NavLink to={"/"}>
                    <img src="/images/Logo.svg" alt="Logo" />
                </NavLink>
            </div>

            <nav className='navegacion'>
                <ul className='menu'>
                    <li className='plantillas'>
                        <NavLink to="/Plantillas" title="Plantillas">📄</NavLink>
                    </li>
                    <li className='historial'>
                        <NavLink to="/Historial" title="Historial">📜</NavLink>
                    </li>
                    <li className='correos'>
                        <NavLink to="/Correos" title="Correos">✉️</NavLink>
                    </li>
                </ul>
            </nav>

            <div className='usuario'>
                <p>Cristian Elias</p>
            </div>
        </header>
    )
}

export default Header