import React, { Component } from 'react';

// Components
import NavigationComponent from './components/navigation_component.js';

export default class App extends Component {
  	render() {
  		const navObject = {
  			link1: {
  				label: 'Play',
  				subLinks: {
  					subLink1: 'Casual',
  					subLink2: 'Deathmatch',
  					subLink3: 'Matchmaking',
  					subLink4: 'Browse Servers',
  					subLink5: 'Competative Play',
  				},
  			},
  			link2: {
  				label: 'Weapons',
  				subLinks: {
  					subLink1: 'Inventory',
  					subLink2: 'Marketplace',
  					subLink3: 'Shop', 
  				}
  			},
  		};

	    return (
	      	<div className='app-wrapper'>
	      		<NavigationComponent links={navObject} />
	      	</div>
	    );
  	}
}
