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
				</AnimationHolder>
			</div>
		);
	},
});

export default AdvancedView;