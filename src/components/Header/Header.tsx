import React from 'react'
import { NavLink } from 'react-router-dom'
interface HeaderProps {
    title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <nav className="brd_shadow_header  navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand m2 ms-5 h1">{title}</span>
                <NavLink to="/" className="nav-link">к началу</NavLink>
            </div>
        </nav>
    )
}