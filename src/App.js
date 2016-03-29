import React, { Component } from 'react';

// Components
import NavigationComponent from './components/navigation_component.js';

const App = React.createClass({
    getInitialState() {
        return {
            activeMain: 0,
            activeSub: 0,
        };
    },

    _onViewChange(type, index) {
        if (type === 'main') {
            this.setState({ 
                activeMain: index,
                activeSub: 0,
            });
        } else if (type === 'sub') {
            this.setState({ activeSub: index });
        }
    },

  	render() {
  		const linksData = [
            [
                'Home',
            ],
            [
                'Play',
                'Casual',
                'Arms Race',
                'Demolition',
                'Deathmatch',
                'Matchmaking',
                'Competative Play',
                'Browse',
            ],
            [
                'Inventory',
                'Loadout',
                'Skins',
                'Crates',
            ],
            [
                'Store',
                'Marketplace',
                'Keys',
            ],
            [
                'Watch',
                'Twitch',
                'Matchmaking',
                'Tournaments',
            ],
            [
                'Settings',
                'In-game',
                'Video',
                'Advanced',
            ],
        ];

	    return (
	      	<div className='app-wrapper'>
	      		<NavigationComponent
                    linksData={linksData}
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub}
                    onChange={this._onViewChange}
                    />
	      	</div>
	    );
  	},
});

export default App;