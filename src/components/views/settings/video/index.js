import React from 'react';

// Components
import SettingsComponent from '../settings_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const VideoView = React.createClass({
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
        this.refs.screen.updateValues(type);
        this.refs.advanced.updateValues(type);
        this.refs.misc.updateValues(type);
    },

    render() {
        const settingsLabels = [
            {
                label: 'Screen',
                icon: 'fa-desktop',
                block: <SettingsComponent ref='screen' view='screen' onChange={this._onChange} />,
            },
            {
                label: 'Advanced',
                icon: 'fa-flash',
                block: <SettingsComponent ref='advanced' view='advanced' onChange={this._onChange} />,
            },
            {
                label: 'Misc.',
                icon: 'fa-gears',
                block: <SettingsComponent ref='misc' view='misc' onChange={this._onChange} />,
            },
        ];

        return (
            <div className='settings-video-view'>
                <AnimationHolder>
                    <SettingsHolder labels={settingsLabels} changesMade={this.state.changesMade} onEdit={this._onEdit} />
                </AnimationHolder>
            </div>
        );
    },
});

export default VideoView;
