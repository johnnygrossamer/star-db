import React from 'react';

import './header.css';
import ErrorButton from "../error-button";
import { Link ,NavLink } from "react-router-dom";

const Header = ({ onServiceChange, toggleRandomPlanet }) => {

    return (
        <div className="header d-flex">
            <h3>
                <Link to="/">
                    Star DB
                </Link>
            </h3>
            <ul className="d-flex">
                <li>
                    <NavLink to="/people">People</NavLink>
                </li>
                <li>
                    <NavLink to="/planets">Planets</NavLink>
                </li>
                <li>
                    <NavLink to="/starships">Starships</NavLink>
                </li>
            </ul>
            <div className="button-dev d-none d-lg-block">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={onServiceChange}>
                    Change Service
                </button>
                <button
                    className="btn btn-warning btn-sm"
                    onClick={toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton/>
            </div>
        </div>
    );
};

export default Header;