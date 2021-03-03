import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <nav className="brd_shadow_header  navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand m2 ms-5 h1">Черновик</span>
                <NavLink to="/" className="nav-link">к началу</NavLink>
            </div>
        </nav>
    )
}