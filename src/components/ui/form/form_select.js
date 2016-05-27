import React 	  from 'react';
import _ 	 	  from 'underscore';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormSelect = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		options: React.PropTypes.array.isRequired,
		selectedOption: React.PropTypes.number,
	},

	getInitialState() {
		return {
			showOptions: false,
			selectedOptionIndex: this.props.selectedOption,
			selectedOptionLabel: null,
		};
	},

	getDefaultProps() {
		return {
			selectedOption: 0,
		};
	},

	_selectOption(index) {
		this.setState({
			showOptions: false,
			selectedOptionIndex: index,
			selectedOptionLabel: this.props.options[index],
		});
	},

	_showOptions() {
		this.setState({ showOptions: true });
	},

	_hideOptions() {
		this.setState({ showOptions: false });
	},

	render() {
		const label = (this.state.selectedOptionLabel)
			? this.state.selectedOptionLabel
			: this.props.options[0] ;

		const options = _.map(this.props.options, (option, index) => {
			return (
				<div key={'Option' + index} className='option-button' onClick={this._selectOption.bind(this, index)}>{option}</div>
			);
		});

		const parentClass = classNames('rui-form-select', {
			'options-is-showing': this.state.showOptions,
		});

		return (
			<FormBase label={this.props.label}>
				<div className={parentClass}>
					<div className='select-label' onClick={this._showOptions}>
						<p className='label-text'>{label}</p>
						<i className='label-icon fa fa-chevron-down' />
					</div>
					<div className='select-options'>{options}</div>
				</div>
			</FormBase>
		);
	},
});

export default FormSelect;