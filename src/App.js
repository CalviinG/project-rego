import React from 'react';
import _     from 'underscore';

// Json
import Friends from './json/friends.json';

// Mixins
import TimerMixin from 'react-timer-mixin';

// Components
import NavigationComponent  from './components/navigation_component.js';
import ViewComponent        from './components/view_component.js';
import BackgroundComponent  from './components/background_component.js';
import RandomStatsGenerator from './components/common/random_stats_generator.js';

const App = React.createClass({
    mixins: [TimerMixin],

    getInitialState() {
        return {
            initializing: true,
            users: this._buildUsersObject('CalvinG', Friends),
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

    componentDidMount() {
        this.setState({ initialRender: false });
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

    _buildUsersObject(main, friends) {
        // Build User Data
        let mainUser;
        let friendsArray = [];

        _.each(friends, (friend, i) => {
            const data = RandomStatsGenerator.generateUserData();
            const user = {
                userId: i,
                name: (i > 0) ? friend : main,
                image: `user_images/user_image_${i}.jpg`,
                teamData: null,
                ...data,
            };

            if (i > 0) {
                friendsArray.push(user);

            } else {
                user.gameData.status = 'Idle';
                user.gameData.inGameStatus = null;
                mainUser = user;
            }
        });

        // Returning object
        const rObject = {
            mainUser: mainUser,
            friends: friendsArray,
        };

        return rObject;
    },

    _loadingScreen() {
        const loadingScreenTime = 5000;

        this.setTimeout(() => {
            this.setState({ initializing: false });
        }, loadingScreenTime);
    },

  	render() {
  		const linksData = [
            [
                'Home',
            ],
            [
                'Play',
                'Casual',
                'Deathmatch',
                'Matchmaking',
                'Competitive Play',
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
                'In-Game',
                'Controls',
                'Audio',
                'Video',
            ],
        ];

        // Loading Screen
        if (this.state.initializing) {
            this._loadingScreen();

            return (
                <BackgroundComponent initialize={true} />
            );
        }

	    return (
	      	<div className='app-wrapper'>
	      		<NavigationComponent
                    linksData={linksData}
                    linkHistory={this.state.viewHistory}
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub}
                    onChange={this._onViewChange} />
                <ViewComponent
                    users={this.state.users}
                    activeMain={this.state.activeMain}
                    activeSub={this.state.activeSub} />
                <BackgroundComponent initialize={false} />
	      	</div>
	    );
  	},
});

export default App;
