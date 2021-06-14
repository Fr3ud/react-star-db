console.log('Hello World!')


class SwapiService {
    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        return fetch(`${this._apiBase}${url}`).then((res) => {
            if (!res.ok) throw new Error(`Could not fetch ${url}, received ${res.status}`);

            return res.json()
        });
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);

        return res.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);

        return res.results;
    }

    getAllPlanet(id) {
        return this.getResource(`/planet/${id}`);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);

        return res.results;
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}`);
    }
}

const swapi = new SwapiService();

swapi.getAllPeople().then((body) => console.log(body))
