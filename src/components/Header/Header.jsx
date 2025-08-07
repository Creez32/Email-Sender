import React from 'react'
import './header.css'

function Header() {
    return (
        <header>
            
            <div>
                <img src="/images/Logo.svg" alt="Logo" />
            </div>

            <nav>
                <ul>
                    <li>
                        <a href="/">P</a>
                    </li>
                    <li>
                        <a href="/about">E</a>
                    </li>
                    <li>
                        <a href="/contact">C</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header