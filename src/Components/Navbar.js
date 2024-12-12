import React from "react";
import {Link, Outlet} from "react-router-dom";
import Logo from '../Logos/Icono.png';
import './Navbar.css';

const NavBar = () =>
{
    return <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="/Inicio">
                    <img src={Logo} alt="Buscador Eventos" width="50" height="50"/>
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active" >
                            <Link id="link" to='Inicio'>Eventos</Link>
                        </li>
                        <li class="nav-item active" >
                            <Link id="link" to='CrearAfiche'>Crear Evento</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet></Outlet>
    </div>
}

export default NavBar;