import React 	  from 'react';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormToggle = React.createClass({
	propTypes: {
        label: React.PropTypes.string.isRequired,
        enabled: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
    },

    getInitialState() {
    	return {
    		enabled: this.props.enabled,
    	};
    },

    componentWillReceiveProps(newProps) {
        this.setState({ enabled: newProps.enabled });
    },

    getDefaultProps() {
    	return {
    		enabled: false,
    	};
    },

    _toggle() {
    	this.setState({ enabled: !this.state.enabled });

    	if (typeof this.props.onChange === 'function') {
    		this.props.onChange(!this.state.enabled);
    	}
    },

	render() {
		const parentClass = classNames('rui-form-toggle', {
			'is-disabled': !this.state.enabled,
		});

		const toggleLabel = (this.state.enabled) ? 'Enabled' : 'Disabled' ;

		return (
			<FormBase label={this.props.label} disabled={this.props.disabled}>
				<div className={parentClass} onClick={this._toggle}>
					<div className='toggle-label'>{toggleLabel}</div>
					<div className='toggle-animation'>
						<div className='animation-circle' />
						<div className='animation-background' />
					</div>
				</div>
			</FormBase>
		);
	},
});

export default FormToggle;
