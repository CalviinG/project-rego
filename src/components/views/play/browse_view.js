import React from 'react';
import _     from 'underscore';

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
                return (server.curPlayers > 0) ? true : false
            // Check for full servers
            } else if (activeFilter.Server === 'Not Full') {
                return (server.curPlayers < server.maxPlayers) ? true : false
            // Check for active server with open slots
            } else if (activeFilter.Server === 'Active & Not Full') {
                return (server.curPlayers > 0 && server.curPlayers != server.maxPlayers) ? true : false
            } 
        }

        // Password 
        if (activeFilter.Password != undefined) {
            // Check for servers without password
            if (activeFilter.Password === 'With Password') {
                return (server.password) ? true : false
            // Check for servers without password
            } else if (activeFilter.Password === 'No Password') {
                return (!server.password) ? true : false
            }
        }

        // Vac
        if (activeFilter.Vac != undefined) {
            // Check for vac protected servers
            if (activeFilter.Vac === 'With Vac') {
                return (server.vac) ? true : false
            // Check for servers without vac protection
            } else if (activeFilter.Vac === 'No Vac') {
                return (!server.vac) ? true : false
            }
        }

        // Location
        if (activeFilter.Location != undefined) {
            // Check for servers in Europe
            if (activeFilter.Location === 'Europe') {
                return (_.contains(['Sweden', 'Germany', 'France', 'Denmark', 'United Kingdom'], server.location)) ? true : false
            // Check for servers in America
            } else if (activeFilter.Location === 'America') {
                return (_.contains([''], server.location)) ? true : false
            // Check for servers in Australia
            } else if (activeFilter.Location === 'Australia') {
                return (_.contains([''], server.location)) ? true : false
            // Check for servers in Russia
            } else if (activeFilter.Location === 'Russia') {
                return (_.contains([''], server.location)) ? true : false
            // Check for servers in Australia
            } else if (activeFilter.Location === 'Asia') {
                return (_.contains([''], server.location)) ? true : false
            // Everything not matching should return false
            } else {
                return false
            }
        }

        // Latency
        if (activeFilter.Latency != undefined) {
            // Check for less than 50 ms
            if (activeFilter.Latency === '< 50 MS') {
                return (server.latency < 50) ? true : false
            // Check for less than 100 ms
            } else if (activeFilter.Latency === '< 100 MS') {
                return (server.latency < 100) ? true : false
            // Check for less than 150 ms
            } else if (activeFilter.Latency === '< 150 MS') {
                return (server.latency < 150) ? true : false
            // Check for less than 250 ms
            } else if (activeFilter.Latency === '< 250 MS') {
                return (server.latency < 250) ? true : false
            // Check for less than 500 ms
            } else if (activeFilter.Latency === '< 500 MS') {
                return (server.latency < 500) ? true : false
            }
        }

        return true
    },

    render() {
        // Map through all the servers
        const serverList = _.map(ServerData, (server, i) => {
            // VAC
            let vacStatus = <div className='rt-col' />;
            if (server.vac) {
                vacStatus = <div className='rt-col'><i className='fa fa-shield' />VAC</div>;
            }

            if(this._filterServer(server)) {
                return (
                    <div className='rt-row' key={i}>
                        <div className='rt-col'>{server.name}</div>
                        <div className='rt-col'>{server.map}</div>
                        <div className='rt-col'>{server.mode}</div>
                        <div className='rt-col'><i className='fa fa-user' />{server.curPlayers} / {server.maxPlayers}</div>
                        <div className='rt-col'><i className='fa fa-globe' />{server.latency} MS</div>
                        <div className='rt-col'><i className='fa fa-map-marker' />{server.location}</div>
                        {vacStatus}
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
                        <RuiSearch />
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