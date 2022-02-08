import React, { Component } from 'react';

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import PropTypes from 'prop-types';
import { withSwapiService } from "../hoc-helper";

import './random-planet.css';

class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 5000
    };

    // static propTypes = {
    //   updateInterval: (props, propName, componentName) => {
    //     const value = props[propName];
    //
    //     if (typeof value === 'number' && !isNaN(value)){
    //       return null;
    //     }
    //
    //     return new TypeError(`${componentName}: ${propName} must be number`);
    //   }
    // };

    static propTypes = {
        updateInterval: PropTypes.number
    };

    state = {
        planet: {},
        image: null,
        loading: true,
        error: false
    };

    //TODO Переписать компоненты жизненного цикла так чтобы не выводить данные если компонент отключен (Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method)
    componentDidMount(){
        const { updateInterval } = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    onPlanetLoaded = ([ planet, image ]) => {
        this.setState({ planet, image, loading: false });
    };

    onError = () => {
        this.setState({ error: true, loading: false });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 3;

        const { getData, getImageUrl } = this.props;

        const getPlanet = getData(id);
        const getImage = getImageUrl(id);

        Promise.all([ getPlanet, getImage ])
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render(){
        const { planet, image, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet} image={image}/> : null;


        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorMessage}
            </div>
        );
    }
}

const PlanetView = ({ planet, image }) => {

    const { name, population, rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image" alt="Планета"
                 src={image}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    };
};

export default withSwapiService(mapMethodToProps)(RandomPlanet);