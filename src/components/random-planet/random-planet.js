import React, {Component, Fragment} from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {
  constructor() {
    super();

    this.updatePlanet();
  }

  state = {
    planet: {},
    loading: true,
  }

  swapiService = new SwapiService();

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  }

  onError = (err) => {
    this.setState({ error: true, loading: false })
  }

  updatePlanet() {
    const id = Math.floor(Math.random() * 25 + 2);

    this.swapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const content = loading ? <Spinner/> : <PlanetView planet={ planet }/>;
    const errorMessage = error ? <ErrorIndicator/> : null;
    return (
      <div className="random-planet jumbotron rounded">
        { errorMessage || content }
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, diameter, population, rotationPeriod } = planet;

  return (
      <Fragment>
        <img className="planet-image"
             src={ `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` } />
        <div>
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
      </Fragment>
  )
}
