import React from 'react';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoAdvancedComponent = React.createClass({
	render() {
		const qualityOptions = [
			'Low',
			'Medium',
			'High',
			'Ultra',
		];

		return (
			<div className='video-advanced-wrapper'>
				<FormSelect label='Hej' options={qualityOptions} />
			</div>
		);
	},
});

export default VideoAdvancedComponent;