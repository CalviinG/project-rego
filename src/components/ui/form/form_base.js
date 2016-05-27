import React from 'react';

const FormBase = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
	},

	render() {
		return (
			<div className='rui-form-base'>
				<div className='form-left'>{this.props.label}</div>
				<div className='form-right'>{this.props.children}</div>
			</div>
		);
	},
});

export default FormBase;