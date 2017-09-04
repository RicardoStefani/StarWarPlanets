import React, { Component } from 'react';
import '../style/App.css';
import {SWAPI} from '../infrastructure/SWAPI';
import {PlanetService} from '../services/PlanetService';
import {FilmService} from '../services/FilmService';
import {PersonService} from '../services/PersonService';
import {SpecieService} from '../services/SpecieService';
import {StarshipService} from '../services/StarshipService';
import {VehicleService} from '../services/VehicleService';
import AppHeader from './AppHeader';
import AppPlanet from './AppPlanet';
import AppPerson from './AppPerson';
import AppStarship from './AppStarship';
import AppFilm from './AppFilm';
import AppSpecie from './AppSpecie';
import AppVehicle from './AppVehicle';

class App extends Component {
	
	planetCount = 1;
	peopleCount = 1;
	starshipCount = 1;
	filmCount = 1;
	specieCount = 1;
	vehicleCount = 1;

	state = {
		planet : {}, person : {}, starship: {}, film: {}, specie: {}, vehicle: {}
	};
	
	constructor(props){
		super(props);
		var self = this;
	 
		this._swapi = new SWAPI();
		this._planet_service = new PlanetService(this._swapi);
		this._film_service = new FilmService(this._swapi);
		this._person_service = new PersonService(this._swapi);
		this._specie_service = new SpecieService(this._swapi);
		this._starship_service = new StarshipService(this._swapi);
		this._vehicle_service = new VehicleService(this._swapi);

		this._planet_service.getPlanetsAmount().then((planetCount) => {
				self.planetCount = planetCount;
		});

		this._film_service.getFilmsAmount().then((filmCount) => {
				self.filmCount = filmCount;
		});

		this._person_service.getPeopleAmount().then((peopleCount) => {
			self.peopleCount = peopleCount;
		});

		this._specie_service.getSpeciesAmount().then((specieCount) => {
				self.specieCount = specieCount;
		});

		this._starship_service.getStarshipAmount().then((starshipCount) => {
				self.starshipCount = starshipCount;
		});

		this._vehicle_service.getVehiclesAmount().then((vehicleCount) => {
				self.vehicleCount = vehicleCount;
		});

		this.nextPlanet = this.nextPlanet.bind(this);
		this.nextPerson = this.nextPerson.bind(this);
		this.nextStarship = this.nextStarship.bind(this);
		this.nextFilm = this.nextFilm.bind(this);
		this.nextSpecie = this.nextSpecie.bind(this);
		this.nextVehicle = this.nextVehicle.bind(this);
		this.reset = this.reset.bind(this);
	}

	nextPlanet(){
		var self = this;
		var planetId = Math.floor(Math.random() * this.planetCount) + 1;
		this._planet_service.getPlanet(planetId).then((planet) => {
			self.setState({planet: planet});
		});
	}

	nextPerson(){
		var self = this;
		var personId = Math.floor(Math.random() * this.peopleCount) + 1;
		this._person_service.getPerson(personId).then((person) => {
			self.setState({person: person});
		});
	}

	nextFilm(){
		var self = this;
		var filmId = Math.floor(Math.random() * this.filmCount) + 1;
		this._film_service.getFilm(filmId).then((film) => {
			self.setState({film: film});
		});
	}

	nextSpecie(){
		var self = this;
		var specieId = Math.floor(Math.random() * this.specieCount) + 1;
		this._specie_service.getSpecie(specieId).then((specie) => {
			self.setState({specie: specie});
		});
	}

	nextStarship(){
		var self = this;
		var starshipId = Math.floor(Math.random() * this.starshipCount) + 1;
		this._starship_service.getStarship(starshipId).then((starship) => {
			self.setState({starship: starship});
		});
	}

	nextVehicle(){
		var self = this;
		var vehicleId = Math.floor(Math.random() * this.vehicleCount) + 1;
		this._vehicle_service.getVehicle(vehicleId).then((vehicle) => {
			self.setState({vehicle: vehicle});
		});
	}

	reset(){
		this.setState({planet: {}});
		this.setState({person: {}});
		this.setState({starship: {}});
		this.setState({film: {}});
		this.setState({specie: {}});
		this.setState({vehicle: {}});
	}

	render() {
		if(Object.keys(this.state.planet).length > 0)
		{
			return (
				<div className="App">
					<AppPlanet title="Planet" planet={this.state.planet} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextPlanet}>Next</button>
				</div>
			);
		}
		else if(Object.keys(this.state.person).length > 0)
		{
			return (
				<div className="App">
					<AppPerson title="Person" person={this.state.person} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextPerson}>Next</button>
				</div>
			);
		}
		else if(Object.keys(this.state.starship).length > 0)
		{
			return (
				<div className="App">
					<AppStarship title="Starship" starship={this.state.starship} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextStarship}>Next</button>
				</div>
			);
		}
		else if(Object.keys(this.state.film).length > 0)
		{
			return (
				<div className="App">
					<AppFilm title="Film" film={this.state.film} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextFilm}>Next</button>
				</div>
			);
		}
		else if(Object.keys(this.state.specie).length > 0)
		{
			return (
				<div className="App">
					<AppSpecie title="Specie" specie={this.state.specie} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextSpecie}>Next</button>
				</div>
			);
		}
		else if(Object.keys(this.state.vehicle).length > 0)
		{
			return (
				<div className="App">
					<AppVehicle title="Vehicle" vehicle={this.state.vehicle} />
					<button onClick={this.reset}>Back</button>
					<button onClick={this.nextVehicle}>Next</button>
				</div>
			);
		}
		else
		{
			return (
				<div className="App">
					<AppHeader />
					<div className="App-Home">
						<button onClick={this.nextPlanet}>Show Planet</button>
						<button onClick={this.nextPerson}>Show Person</button>
						<br />
						<button onClick={this.nextStarship}>Show Starship</button>
						<button onClick={this.nextFilm}>Show Film</button>
						<br />
						<button onClick={this.nextSpecie}>Show Specie</button>
						<button onClick={this.nextVehicle}>Show Vehicle</button>
					</div>
				</div>
			);
		}
	}
}

export default App;