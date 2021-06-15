import SwapiService from './services/swapi-service';

const swapi = new SwapiService();

swapi.getAllPeople().then((body) => console.log(body))
