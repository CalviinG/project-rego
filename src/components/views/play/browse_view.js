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

const BrowseView = React.createClass({
    getInitialState() {
        return {
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
        console.log(ServerData);
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

        return true
    },

    _searchServerUpdate(keywords) {
        let updatedFilter = this.state.serverFilter;
        updatedFilter.Keywords = keywords;
        this.setState({ serverFilter: updatedFilter });
    },

    render() {
        // Map through all the servers
        const serverList = _.map(ServerData, (server, i) => {

            // Password
            const passwordClass = classNames('rt-col icon-col', {
                'active-status': server.password,
                'disabled-status': !server.password,
            });

            // Players
            const playersClass = classNames('rt-col icon-col', {
                'good-status': (server.curPlayers < server.maxPlayers),
                'bad-status': (server.curPlayers === server.maxPlayers),
                'normal-status': (server.curPlayers === 0),
            });

            // Latency
            const latencyClass = classNames('rt-col icon-col', {
                'good-status': (server.latency < 100),
                'bad-status': (server.latency > 250),
                'normal-status': (server.latency > 99 && server.latency < 251),
            });

            // VAC
            const vacClass = classNames('rt-col icon-col', {
                'active-status': server.vac,
                'disabled-status': !server.vac,
            });

            if(this._filterServer(server)) {
                return (
                    <div className='rt-row' key={i}>
                        <div className={passwordClass} style={{width: 20}}>
                            <i className='col-icon fa fa-lock' />
                        </div>
                        <div className='rt-col' style={{width: 350}}>{server.name}</div>
                        <div className='rt-col' style={{width: 150}}>{server.mode}</div>
                        <div className='rt-col' style={{width: 200}}>{server.map}</div>
                        <div className='rt-col' style={{width: 100}}>{server.location}</div>
                        <div className={playersClass} style={{width: 100}}>
                            <i className='col-icon fa fa-circle-o' />
                            <p className='col-text'>{server.curPlayers} / {server.maxPlayers}</p>
                        </div>
                        <div className={latencyClass} style={{width: 100}}>
                            <i className='col-icon fa fa-circle-o' />
                            <p className='col-text'>{server.latency} MS</p>
                        </div>
                        <div className={vacClass} style={{width: 100}}>
                            <i className='col-icon fa fa-shield' />
                            <p className='col-text'>VAC</p>
                        </div>
                    </div>
                );
            } else {
                return
            }
        });

        // Filter Dropdowns
        const locationOptions = ['Location', 'Europe', 'America', 'Australia', 'Russia', 'Asia' ];
        const vacOptions = ['Anti-Cheat', 'With Vac', 'No Vac'];
        const passwordOptions = ['Password', 'With Password', 'No Password'];
        const latencyOptions = ['Latency', '< 50 MS', '< 100 MS', '< 150 MS', '< 250 MS', '< 500 MS'];
        const serverOptions = ['Server Status', 'Active', 'Not Full', 'Active & Not Full'];

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
                    <div className='rego-table-wrapper'>
                        {serverList}
                    </div>
                </AnimationHolder>
            </div>
        );
    },
});

export default BrowseView;