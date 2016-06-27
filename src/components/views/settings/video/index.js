import React from 'react';

// Components
import VideoAdvancedComponent from './video_advanced_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const VideoView = React.createClass({
    getInitialState() {
        return {
            changesMade: false,
        };
    },
    
    _onChange(value) {
        this.setState({ changesMade: value });
    },

    _onEdit(type) {
        this.refs.vac.updateValues(type);
    },

    render() {
        const settingsLabels = [
            {
                label: 'Screen',
                icon: 'fa-desktop',
                block: <p>Screen</p>, 
            },
            {
                label: 'Advanced',
                icon: 'fa-flash',
                block: <VideoAdvancedComponent ref='vac' onChange={this._onChange} />,
            },
            {
                label: 'Misc.',
                icon: 'fa-gears',
                block: <p>Misc.</p>,
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