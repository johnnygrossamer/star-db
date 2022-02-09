import React, { Component } from 'react';
import Header from '../header';
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import RandomPlanet from "../random-planet";
import { StarshipDetails } from "../sw-components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage
} from "../pages";

import './app.css';

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        swapiService: new SwapiService()
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            if (swapiService instanceof SwapiService) {
                return { swapiService: new DummySwapiService() }
            } else {
                return { swapiService: new SwapiService() };
            }
        });
    };

    render(){

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}
                                    toggleRandomPlanet={this.toggleRandomPlanet}/>

                            {planet}
                            <Routes>
                                <Route path="/" element={<h2>Welcome to StarDB</h2>}/>
                                <Route path="/people" element={<PeoplePage/>}>
                                    <Route path=":id" element={<PeoplePage/>}/>
                                </Route>
                                <Route path="/planets" element={<PlanetsPage/>}/>
                                <Route path="/starships">
                                    <Route index element={<StarshipsPage/>}/>
                                    <Route path=":id" element={<StarshipDetails/>}/>
                                </Route>
                                <Route path="*" element={<Navigate to="/" replace/>}/>
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
