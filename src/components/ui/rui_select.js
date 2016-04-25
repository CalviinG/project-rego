import React 	  from 'react';
import $		  from 'jquery';
import _    	  from 'underscore';
import classNames from 'classnames';

const RuiSelect = React.createClass({
	propTypes: {
		options: React.PropTypes.array.isRequired,
	},

	getInitialState() {
		return {
			selectedOption: this.props.options[0],
		};
	},

	_changeOption(option) {
		if (option === this.state.selectedOption) {
			return
		} else {
			this.setState({ selectedOption: option });
		}
	},

	render() {
		const parentClass = classNames('rui-select-wrapper', {
			'option-selected': false,
		});

		const selectOptions = _.map(this.props.options, (option, index) => {
			if (option === this.props.options[0]) {
				return (
					<div className='dropdown-option' key={index} onClick={this._changeOption.bind(this, this.props.options[0])}>
						<i className='option-icon fa fa-remove' /><p className='option-label'>Reset</p>
					</div>
				);
			}
			return <div className='select-dropdown-option' key={index} onClick={this._changeOption.bind(this, option)}>{option}</div> ;
		});

		return (
			<div className={parentClass}>
				<div className='select-button-holder'>
					<div className='button-icon'><i className={'select-type-icon fa ' + this.props.icon} /></div>
					<div className='button-label'>{this.state.selectedOption}</div>
					<div className='button-arrow'><i className='select-arrow-icon fa fa-chevron-down' /></div>
				</div>
				<div className='select-dropdown-holder'>
					{selectOptions}
				</div>
			</div>
		);
	},
});

export default RuiSelect;