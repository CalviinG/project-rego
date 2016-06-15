import React from 'react';
import classNames from 'classnames';

const FormButton = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string,
		primary: React.PropTypes.bool,
		secondary: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
	},

	getDefaultProps() {
		return {
			primary: false,
			secondary: true,
		};
	},

	render() {
		const buttonClass = classNames('rui-form-button', {
			'is-primary': this.props.primary,
			'is-secondary': this.props.secondary && !this.props.primary,
			'is-disabled': this.props.disabled,
		});

		const icon = (this.props.icon) ? <i className={'button-icon fa ' + this.props.icon} /> : null ;

		return (
			<div className={buttonClass}>
				{icon}
				<p className='button-label'>{this.props.label}</p>
			</div>
		);
	},
});

export default FormButton;