import React from 'react';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoAdvancedComponent = React.createClass({
	render() {
		const qualityOptions = [
			'Low',
			'Medium',
			'High',
		];

		const antiAliasingOptions = [
			'None',
			'FXAA',
			'2x MSAA',
			'4x MSAA',
			'8x MSAA',
			'2x EQAA',
			'16xQ CSAA',
		];

		const textureFilteringOptions = [
			'Bilinear',
			'Anisotropic 16X',
		];

		const verticalSyncOptions = [
			'Disabled',
			'Tripple Buffered',
		];

		return (
			<div className='video-advanced-wrapper'>
				<FormSelect selectedOption={2} label='Global Shadow Quality' options={qualityOptions} />
				<FormSelect label='Model / Texture Detail' options={qualityOptions} />
				<FormSelect label='Effect Detail' options={qualityOptions} />
				<FormSelect selectedOption={2} label='Shader Detail' options={qualityOptions} />
				<FormToggle enabled label='Multicore Rendering' />
				<FormSelect label='Multisampling Anti-Aliasing Mode' options={antiAliasingOptions} />
				<FormSelect label='Texture Filtering Mode' options={textureFilteringOptions} />
				<FormToggle label='FXAA Anti-Aliasing' />
				<FormSelect label='Wait for Vertical Sync' options={verticalSyncOptions} />
				<FormToggle label='Motion Blur' />
			</div>
		);
	},
});

export default VideoAdvancedComponent;