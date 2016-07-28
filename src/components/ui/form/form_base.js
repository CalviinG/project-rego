import React 	  from 'react';

const FormBase = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool,
	},

	getDefaultProps() {
		return {
			disabled: false,
		};
	},

	render() {
		const disableOverlay = (this.props.disabled)
			? <div className='form-disable-overlay' />
			: null ;

		return (
			<div className='rui-form-base'>
				<div className='form-left'>{this.props.label}</div>
				{disableOverlay}
				<div className='form-right'>{this.props.children}</div>
			</div>
		);
	},
});

export default FormBase;
