import React from 'react';
import _     from 'underscore';

// Json
import ServerData from '../../../json/servers.json';

// Components
import AnimationHolder from '../../common/animation_holder.js';

// Rui
import RuiSelect from '../../ui/rui_select.js';

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

        return true
    },

    render() {
        console.log('new server render');
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
        const locationOptions = ['Location', 'Europe', 'North America', 'Asia'];
        const vacOptions = ['Anti-Cheat', 'With Vac', 'No Vac'];
        const passwordOptions = ['Password', 'With Password', 'No Password'];
        const latencyOptions = ['Latency', '0 - 50 MS', '0 - 100 MS', '0 - 150 MS', '0 - 200 MS', '200 + MS'];
        const serverOptions = ['Server Status', 'Active', 'Not Full', 'Active & Not Full'];

        return (
            <div className='browse-view'>
                <AnimationHolder zIndex={1}>
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