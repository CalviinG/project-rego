import React      from 'react';
import _          from 'underscore';
import classNames from 'classnames';

// Json
import ServerData from '../../../json/servers.json';

// Components
import AnimationHolder from '../../common/animation_holder.js';

// Rui
import RuiSelect from '../../ui/rui_select.js';
import RuiSearch from '../../ui/rui_search.js';
import RuiTable  from '../../ui/rui_table.js';

const BrowseView = React.createClass({
    getInitialState() {
        return {
            serverLabels: [
                'Internet',
                'Favorites',
                'Friends',
                'LAN',
                'Blacklisted',
            ],
            selectedServerLabel: 0,
            serverFilter: {
                Server: undefined,
                Password: undefined,
                Latency: undefined,
                Location: undefined,
                Vac: undefined,
                Keywords: [],
            },
        };
    },

    componentDidMount() {

    },

    _updateFilter(type, value) {
        let newServerFilter = this.state.serverFilter;
        let newValue;

        if (_.contains(['Location', 'Anti-Cheat', 'Password', 'Latency', 'Server Status'], value)) {
            newValue = undefined;
        } else {
            newValue = value;
        }

        newServerFilter[type] = newValue;
        this.setState({ serverFilter: newServerFilter });
    },

    _filterServer(server) {
        const activeFilter = this.state.serverFilter;

        // Server Status
        if (activeFilter.Server != undefined) {
            // Check for active servers
            if (activeFilter.Server === 'Active') {
                if (!(server.curPlayers > 0)) { return false }
            // Check for full servers
            } else if (activeFilter.Server === 'Not Full') {
                if (!(server.curPlayers < server.maxPlayers)) { return false }
            // Check for active server with open slots
            } else if (activeFilter.Server === 'Active & Not Full') {
                if (!(server.curPlayers > 0 && server.curPlayers != server.maxPlayers)) { return false }
            } 
        }

        // Password 
        if (activeFilter.Password != undefined) {
            // Check for servers without password
            if (activeFilter.Password === 'With Password') {
                if (!server.password) { return false }
            // Check for servers without password
            } else if (activeFilter.Password === 'No Password') {
                if (server.password) { return false }
            }
        }

        // Vac
        if (activeFilter.Vac != undefined) {
            // Check for vac protected servers
            if (activeFilter.Vac === 'With Vac') {
                if (!server.vac) { return false }
            // Check for servers without vac protection
            } else if (activeFilter.Vac === 'No Vac') {
                if (server.vac) { return false }
            }
        }

        // Location
        if (activeFilter.Location != undefined) {
            // Check for servers in Europe
            if (activeFilter.Location === 'Europe') {
                if (!(_.contains(['Sweden', 'Germany', 'France', 'Denmark', 'United Kingdom'], server.location))) { return false }
            // Check for servers in America
            } else if (activeFilter.Location === 'America') {
                if (!(_.contains([''], server.location))) { return false }
            // Check for servers in Australia
            } else if (activeFilter.Location === 'Australia') {
                if (!(_.contains([''], server.location))) { return false }
            // Check for servers in Russia
            } else if (activeFilter.Location === 'Russia') {
                if (!(_.contains([''], server.location))) { return false }
            // Check for servers in Australia
            } else if (activeFilter.Location === 'Asia') {
                if (!(_.contains([''], server.location))) { return false }
            // Everything not matching should return false
            } else {
                return false
            }
        }

        // Latency
        if (activeFilter.Latency != undefined) {
            // Check for less than 50 ms
            if (activeFilter.Latency === '< 50 MS') {
                if (!(server.latency < 50)) { return false }
            // Check for less than 100 ms
            } else if (activeFilter.Latency === '< 100 MS') {
                if (!(server.latency < 100)) { return false }
            // Check for less than 150 ms
            } else if (activeFilter.Latency === '< 150 MS') {
                if (!(server.latency < 150)) { return false }
            // Check for less than 250 ms
            } else if (activeFilter.Latency === '< 250 MS') {
                if (!(server.latency < 250)) { return false }
            // Check for less than 500 ms
            } else if (activeFilter.Latency === '< 500 MS') {
                if (!(server.latency < 500)) { return false }
            }
        }

        // Keywords
        if (activeFilter.Keywords.length > 0) {
            // Stash all keywords to look for in an array
            let keywordsArray = server.name.split(' ');
            keywordsArray.push(server.mode);
            keywordsArray.push(server.map);

            // Turn the keywords to lowercase
            let serverKeywords = [];
            _.each(keywordsArray, (value) => {
                serverKeywords.push(value.toLowerCase());
            });

            // Check if a keyword matches (fix me)
            return _.find(activeFilter.Keywords, (keyword) => {
                return _.contains(serverKeywords, keyword);
            });
        }

        // Server Labels
        if (this.state.selectedServerLabel !== 0) {
            console.log('selectedServerLabel', this.state.selectedServerLabel);
        }

        return true
    },

    _searchServerUpdate(keywords) {
        let updatedFilter = this.state.serverFilter;
        updatedFilter.Keywords = keywords;
        this.setState({ serverFilter: updatedFilter });
    },

    _selectListLabel(index) {
        this.setState({ selectedServerLabel: index });
    },

    render() {
        /*
         *
         * Server List
         *
         */

        // Create Table Header
        const tableHeader = [
            ['icon', 'fa-lock'],
            'Name',
            'Game Mode',
            'Map',
            'Location',
            'Players',
            'Latency',
            'VAC',
        ];

        // Get Table Rows
        const serverList = _.map(ServerData, (server, i) => {
            
            server.labels = this.state.serverLabels;

            if(this._filterServer(server)) {
                const passwordStatus = (server.password) ? 'active' : 'disabled' ;

                const playersStatus = classNames({
                    'good': (server.curPlayers > 0 && server.curPlayers < server.maxPlayers),
                    'normal': (server.curPlayers === 0),
                    'bad': (server.curPlayers === server.maxPlayers),
                });

                const latecncyStatus = classNames({
                    'good': (server.latency < 100),
                    'normal': (server.latency > 99 && server.latency < 250),
                    'bad': (server.latency > 249),
                });

                const vacStatus = classNames({
                    'active': (server.vac),
                    'disabled': (!server.vac),
                });

                return {
                    password: [passwordStatus, '', 'fa-lock'],
                    name: server.name,
                    mode: server.mode,
                    map: server.map,
                    location: server.location,
                    players: [playersStatus, `${server.curPlayers} / ${server.maxPlayers}`],
                    latency: [latecncyStatus, `${server.latency} MS`],
                    vac: [vacStatus, 'VAC', 'fa-shield'],
                };
            } else {
                return null
            }
        });

        // Table Width Values
        const tableWidthValues = [40, 300, 180, 180, 160, 100, 100, 100]; // Values must be equal or lower than 1160

        // Table Quick Actions
        const tableQuickActions = [
            ['Add to favorites', 'fa-star'],
            ['Blacklist server', 'fa-ban'],
            ['Spectate game', 'fa-eye'],
        ];

        /*
         *
         * Server Filter
         *
         */ 

        // Filter Dropdowns
        const locationOptions = ['Location', 'Europe', 'America', 'Australia', 'Russia', 'Asia' ];
        const vacOptions = ['Anti-Cheat', 'With Vac', 'No Vac'];
        const passwordOptions = ['Password', 'With Password', 'No Password'];
        const latencyOptions = ['Latency', '< 50 MS', '< 100 MS', '< 150 MS', '< 250 MS', '< 500 MS'];
        const serverOptions = ['Server Status', 'Active', 'Not Full', 'Active & Not Full'];

        /*
         *
         * Server List Actions
         *
         */

        // List Label Buttons
        const listLabels = _.map(this.state.serverLabels, (label, index) => {
            const labelClass = classNames('list-action-button', {
                'is-selected': index === this.state.selectedServerLabel,
            });

            return (
                <p key={'listLabel' + index} className={labelClass} onClick={this._selectListLabel.bind(this, index)}>{label}</p>
            );
        });

        // Display nr of currently showing servers
        let nrOfservers = 0
        _.each(serverList, (server) => {
            if (server !== null) {
                nrOfservers += 1;
            }
        });
        const serversFoundString = (nrOfservers === 1) ? `1 Server found` : `${nrOfservers} Servers found` ;

        return (
            <div className='browse-view'>
                <AnimationHolder zIndex={1}>
                    <div className='browse-search-block'>
                        <RuiSearch hint='Add Keywords' onUpdate={this._searchServerUpdate} />
                    </div>
                    <div className='browse-filter-block'>
                        <RuiSelect options={locationOptions} icon='fa-map-marker' onChange={this._updateFilter.bind(this, 'Location')} />
                        <RuiSelect options={vacOptions} icon='fa-shield' onChange={this._updateFilter.bind(this, 'Vac')} />
                        <RuiSelect options={passwordOptions} icon='fa-lock' onChange={this._updateFilter.bind(this, 'Password')} />
                        <RuiSelect options={latencyOptions} icon='fa-globe' onChange={this._updateFilter.bind(this, 'Latency')} />
                        <RuiSelect options={serverOptions} icon='fa-user' onChange={this._updateFilter.bind(this, 'Server')} />
                    </div>
                </AnimationHolder>

                <AnimationHolder>
                    <div className='browse-list-actions-block'>
                        <div className='list-actions-left'>
                            <p className='list-action-label'>{serversFoundString}</p>
                        </div>
                        <div className='list-actions-right'>
                            {listLabels}
                        </div>    
                    </div>
                    <RuiTable
                        header={tableHeader}
                        rows={serverList}
                        widthValues={tableWidthValues}
                        quickActions={tableQuickActions} />
                </AnimationHolder>
            </div>
        );
    },
});

export default BrowseView;