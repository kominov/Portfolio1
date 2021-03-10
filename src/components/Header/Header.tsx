import React from 'react'
import { NavLink } from 'react-router-dom'
import { Status } from '../../interfaces/interfaces'
import classNames from 'classnames'
interface HeaderProps {
    title: string,
    status?:Status
}

export const Header: React.FC<HeaderProps> = ({ status,title }) => {
    const headerStyle = classNames('navbar-brand m2 ms-5 h1',  {
        ["text-secondary"]: status=="Согласован",
        ["text-info"]: status =="На согласовании",
        ["text-danger"]:status=="В архиве"
    })

    return (
        <nav className="brd_shadow_header  navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className={headerStyle}>{title}</span>
                <NavLink to="/" className="nav-link">к началу</NavLink>
            </div>
        </nav>
    )
}