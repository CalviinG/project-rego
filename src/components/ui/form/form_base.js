import React 	  from 'react';
import classNames from 'classnames';

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
		const parentClass = classNames('rui-form-base', {
			'is-disabled': this.props.disabled,
		});

		const disableOverlay = (this.props.disabled)
			? <div className='form-disable-overlay' />
			: null ;

		return (
			<div className={parentClass}>
				<div className='form-left'>{this.props.label}</div>
				{disableOverlay}
				<div className='form-right'>{this.props.children}</div>
			</div>
		);
	},
});

export default FormBase;
