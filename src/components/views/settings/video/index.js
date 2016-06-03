import React from 'react';

// Components
import VideoAdvancedComponent from './video_advanced_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const VideoView = React.createClass({
	_changeSettings(index) {
		console.log('index', index);
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
				block: <VideoAdvancedComponent />,
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
					<SettingsHolder
						labels={settingsLabels}
						onChange={this._changeSettings} />
				</AnimationHolder>
			</div>
		);
	},
});

export default VideoView;