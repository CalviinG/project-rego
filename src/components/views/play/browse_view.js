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

        return (
            <div className='browse-view'>
                <AnimationHolder>
                    <div className='browse-filter-block'>
                        <RuiSelect options={locationOptions} icon='fa-globe' />
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