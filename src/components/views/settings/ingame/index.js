import React from 'react';

// Components
import SettingsComponent from '../settings_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const InGameView = React.createClass({
    getInitialState() {
        return {
            changesMade: false,
        };
    },

    // This function runs when a value is changed in SettingsComponent
    _onChange(value) {
        this.setState({ changesMade: value });
    },

    // This function runs when you press 'Cancel' or 'Save Changes'
    _onEdit(type) {
        this.refs.game.updateValues(type);
        this.refs.hud.updateValues(type);
        this.refs.crosshair.updateValues(type);
        this.refs.team.updateValues(type);
        this.refs.spectator.updateValues(type);
        this.refs.items.updateValues(type);
        this.refs.radar.updateValues(type);
    },

    render() {
        const settingsLabels = [
            {
                label: 'Game',
                icon: 'fa-gamepad',
                block: <SettingsComponent ref='game' view='game' onChange={this._onChange} />,
            },
            {
                label: 'HUD',
                icon: 'fa-tv',
                block: <SettingsComponent ref='hud' view='hud' onChange={this._onChange} />,
            },
            {
                label: 'Crosshair',
                icon: 'fa-crosshairs',
                block: <SettingsComponent ref='crosshair' view='crosshair' onChange={this._onChange} />,
            },
            {
                label: 'Team',
                icon: 'fa-shield',
                block: <SettingsComponent ref='team' view='team' onChange={this._onChange} />,
            },
            {
                label: 'Spectator',
                icon: 'fa-eye',
                block: <SettingsComponent ref='spectator' view='spectator' onChange={this._onChange} />,
            },
            {
                label: 'Items',
                icon: 'fa-dollar',
                block: <SettingsComponent ref='items' view='items' onChange={this._onChange} />,
            },
            {
                label: 'Radar',
                icon: 'fa-map',
                block: <SettingsComponent ref='radar' view='radar' onChange={this._onChange} />,
            },
        ];

        return (
            <div className='settings-view'>
                <AnimationHolder>
                    <SettingsHolder labels={settingsLabels} changesMade={this.state.changesMade} onEdit={this._onEdit} />
                </AnimationHolder>
            </div>
        );
    },
});

export default InGameView;
