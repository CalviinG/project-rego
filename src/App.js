import React, { Component } from 'react';
import _                    from 'underscore';

// Components
import NavigationComponent from './components/navigation_component.js';

const App = React.createClass({
    getInitialState() {
        return {
            activeMain: 0,
            activeSub: 0,
            viewHistory: {
                position: 0,
                history: ['00'],
            },
        };
    },

    _onViewChange(type, index) {
        if (type === 'main') {
            if (this.state.viewHistory.position < this.state.viewHistory.history.length - 1) {
                console.log('erase history overflow');
            } else {
                this._saveViewHistory(index, 0);
                this.setState({ 
                    activeMain: index,
                    activeSub: 0,
                    viewHistory: this._updateViewHistoryPosition(+1),
                });
            }
        } else if (type === 'sub') {
            this._saveViewHistory(this.state.activeMain, index);
            this.setState({
                activeSub: index,
                viewHistory: this._updateViewHistoryPosition(+1),
            });
        } else if (type === 'back') {
            console.log('went back to', index);
            // Split index to main & sub
            const newMain = parseInt(_.first(index));
            const newSub = parseInt(_.last(index)) ;
            this.setState({
                activeMain: newMain,
                activeSub: newSub,
                viewHistory: this._updateViewHistoryPosition(-1),
            });
        }
    },

    _updateViewHistoryPosition(value) {
        let historyState = this.state.viewHistory;
        historyState.position = historyState.position + value;
        return historyState;
    },

    _saveViewHistory(mainView, subView) {
        let historyArray = this.state.viewHistory;
        const latestView = `${mainView}${subView}`;

        historyArray.history.push(latestView);
        this.setState({ viewHistory: historyArray });
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

        console.log('viewHistory', this.state.viewHistory);

	    return (
	      	<div className='app-wrapper'>
	      		<NavigationComponent
                    linksData={linksData}
                    linkHistory={this.state.viewHistory}
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub}
                    onChange={this._onViewChange}
                    />
	      	</div>
	    );
  	},
});

export default App;