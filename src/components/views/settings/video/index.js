import React from 'react';

// Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoView = React.createClass({
	_changeSettings(index) {
		console.log('index', index);
	},

	render() {
		const qualityOptions = [
			'Low',
			'Medium',
			'High',
			'Ultra',
		];

		const settingsLabels = [
			{
				label: 'Screen',
				icon: 'fa-desktop',
			},
			{
				label: 'Advanced',
				icon: 'fa-flash',
			},
			{
				label: 'Misc.',
				icon: 'fa-gears',
			},
		];

		return (
			<div className='settings-video-view'>
				<AnimationHolder>
					<SettingsHolder labels={settingsLabels} onChange={this._changeSettings}>
					</SettingsHolder>
				</AnimationHolder>
			</div>
		);
	},
});

export default VideoView;