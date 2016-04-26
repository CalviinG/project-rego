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
                name: undefined,
                map: undefined,
                mode: undefined,
                ping: undefined,
                location: undefined,
                vac: undefined,
            },
        };
    },

    componentDidMount() {
        console.log(ServerData);
    },

    _updateFilter(type, value) {
        console.log('Filter Updated');
        console.log('Type', type);
        console.log('Value', value);
    },

    render() {
        // Map through all the servers
        const serverList = _.map(ServerData, (server, i) => {
            // VAC
            let vacStatus = <div className='rt-col' />;
            if (server.vac) {
                vacStatus = <div className='rt-col'><i className='fa fa-shield' />VAC</div>;
            }

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