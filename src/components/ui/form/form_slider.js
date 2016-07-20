import React 	  from 'react';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormSlider = React.createClass({
	propTypes: {
        label: React.PropTypes.string.isRequired,
    },

	render() {
		return (
			<FormBase label={this.props.label}>
				<div className='rui-form-slider'>
					Slider v0.1
				</div>
			</FormBase>
		);
	},
});

export default FormSlider;
