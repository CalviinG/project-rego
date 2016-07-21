import React from 'react';

// Components
import SettingsComponent from '../settings_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const AudioView = React.createClass({
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
        this.refs.sound.updateValues(type);
        this.refs.music.updateValues(type);
    },

    render() {
        const settingsLabels = [
            {
                label: 'Sound',
                icon: 'fa-headphones',
                block: <SettingsComponent ref='sound' view='sound' onChange={this._onChange} />,
            },
            {
                label: 'Music',
                icon: 'fa-music',
                block: <SettingsComponent ref='music' view='music' onChange={this._onChange} />,
            },
        ];

        return (
            <div className='settings-audio-view'>
                <AnimationHolder>
                    <SettingsHolder labels={settingsLabels} changesMade={this.state.changesMade} onEdit={this._onEdit} />
                </AnimationHolder>
            </div>
        );
    },
});

export default AudioView;
