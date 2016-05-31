import React from 'react';

// Components
import AnimationHolder from '../../../common/animation_holder.js';

// Rui
import {FormSelect} from '../../../ui';

const AdvancedView = React.createClass({
	render() {
		const qualityOptions = [
			'Low',
			'Medium',
			'High',
			'Ultra',
		];

		return (
			<div className='settings-advanced-view'>
				<AnimationHolder>
					<FormSelect label='Global Shadow Quality' options={qualityOptions} />
					<FormSelect label='Model / Texture Detail' options={qualityOptions} />
					<FormSelect label='Effect Detail' options={qualityOptions} />
					<FormSelect label='Shader Detail' options={qualityOptions} />
				</AnimationHolder>
			</div>
		);
	},
});

export default AdvancedView;