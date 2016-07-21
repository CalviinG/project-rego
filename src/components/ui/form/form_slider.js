import React 	  from 'react';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormSlider = React.createClass({
	propTypes: {
        label: React.PropTypes.string.isRequired,
		min: React.PropTypes.number.isRequired,
		max: React.PropTypes.number.isRequired,
		value: React.PropTypes.number,
		interval: React.PropTypes.number,
		decimals: React.PropTypes.number,
    },

	getInitialState() {
		return {
			value: (this.props.value < this.props.min) ? this.props.min : this.props.value,
		};
	},

	getDefaultProps() {
		return {
			value: 0,
			min: 0,
			max: 100,
			interval: 1,
			decimals: 0,
		};
	},

	componentWillReceiveProps(newProps) {
		this.setState({ value: newProps.value });
	},

	_onChange(event) {
		this._changeValue(this._round(event.target.value, this.props.decimals));
	},

	_round(value, precision) {
    	const multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	},

	_incrementValue() {
		this._changeValue((this.state.value === this.props.max) ? this.props.max : this._round(this.state.value + this.props.interval, this.props.decimals));
	},

	_excrementValue() {
		this._changeValue((this.state.value === this.props.min) ? this.props.min : this._round(this.state.value - this.props.interval, this.props.decimals));
	},

	_changeValue(newValue) {
		this.setState({ value: newValue });

		if (typeof this.props.onChange === 'function') {
            this.props.onChange(newValue);
        }
	},

	render() {
		return (
			<FormBase label={this.props.label}>
				<div className='rui-form-slider'>
					<div className='slider-holder'>
						<i className='slider-icon fa fa-chevron-left' onClick={this._excrementValue} />
						<input className='slider-range' type='range' min={this.props.min} max={this.props.max} step={this.props.interval} value={this.state.value} onChange={this._onChange} />
						<i className='slider-icon fa fa-chevron-right' onClick={this._incrementValue} />
						<p className='slider-value'>{this.state.value.toFixed(this.props.decimals)}</p>
					</div>
				</div>
			</FormBase>
		);
	},
});

export default FormSlider;
