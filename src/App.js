import React, { Component } from 'react';
import _                    from 'underscore';

// Components
import NavigationComponent from './components/navigation_component.js';
import ViewComponent       from './components/view_component.js';
import BackgroundComponent from './components/background_component.js';

const App = React.createClass({
    getInitialState() {
        return {
            activeMain: 0,
            activeSub: 0,
            viewHistory: {
                position: 0,
                history: ['00'],
                stopBack: true,
                stopForward: true,
            },
        };
    },

    _onViewChange(type, index) {
        if (type === 'main' || type === 'sub') {
            let updatedViewHistory = undefined;
            /* Cut out history overflow if the user has browsed back and then goes to a new main */
            if (this.state.viewHistory.position < this.state.viewHistory.history.length - 1) {
                updatedViewHistory = this.state.viewHistory.history;
                updatedViewHistory.splice(
                    this.state.viewHistory.position + 1,
                    this.state.viewHistory.history.length
                );
            }
            if (type === 'main') {
                /* Update with latest view */
                this._saveViewHistory(index, 0);
                this.setState({ 
                    activeMain: index,
                    activeSub: 0,
                    viewHistory: (updatedViewHistory !== undefined)
                        ? this._updateViewHistoryPosition(+1, updatedViewHistory)
                        : this._updateViewHistoryPosition(+1, false),
                });
            } else if (type === 'sub') {
                this._saveViewHistory(this.state.activeMain, index);
                this.setState({
                    activeSub: index,
                    viewHistory: (updatedViewHistory !== undefined)
                        ? this._updateViewHistoryPosition(+1, updatedViewHistory)
                        : this._updateViewHistoryPosition(+1, false),
                });
            }
        } else if (type === 'back' || type === 'forward') {
            // Split index to main & sub
            const newMain = parseInt(_.first(index));
            const newSub = parseInt(_.last(index)) ;
            this.setState({
                activeMain: newMain,
                activeSub: newSub,
                viewHistory: (type === 'back')
                    ? this._updateViewHistoryPosition(-1, false)
                    : this._updateViewHistoryPosition(+1, false),
            });
        }
    },

    _updateViewHistoryPosition(value, newHistory) {
        let historyState = this.state.viewHistory;

        // Sets position
        historyState.position = historyState.position + value;

        // Sets history
        if (newHistory) {
            historyState.history = newHistory;
        }

        // Check where the user is
        if (historyState.history.length === 1 || historyState.position === 0) {
            historyState.stopBack = true;
            historyState.stopForward = false;
        } else if (historyState.position === historyState.history.length - 1) {
            historyState.stopForward = true;
            historyState.stopBack = false;
        } else if (historyState.position < historyState.history.length - 1) {
            historyState.stopBack = false;
            historyState.stopForward = false;
        }
        
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

	    return (
	      	<div className='app-wrapper'>
	      		<NavigationComponent
                    linksData={linksData}
                    linkHistory={this.state.viewHistory}
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub}
                    onChange={this._onViewChange} />
                <ViewComponent
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub} />
                <BackgroundComponent />
	      	</div>
	    );
  	},
});

export default App;