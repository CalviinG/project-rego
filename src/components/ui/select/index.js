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
			selectionMade: false,
			showOptions: false,
		};
	},

	componentWillUnmount() {
        window.removeEventListener('mousedown', this._checkClick);
    },

	_onMouseDown() {
		this.mouseIsDownOnComponent = true;
	},

	_onMouseUp() {
		this.mouseIsDownOnComponent = false;
	},

	_toggleDropdown() {
		const $oH = $(this.refs.optionsHolder);
		if (!this.state.showOptions) {
			window.addEventListener('mousedown', this._checkClick);
			$oH.css({ 'height': $oH.children().length * 35 });
		} else {
			window.removeEventListener('mousedown', this._checkClick);
			$oH.css({ 'height': 0 });
		}
		this.setState({ showOptions: !this.state.showOptions });
	},

	_changeOption(option) {
		this._toggleDropdown();
		if (option != this.state.selectedOption) {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange(option);
			}

			this.setState({
				selectedOption: option,
				seleclectionMade: (option != this.props.options[0]) ? true : false,
			});
		}
	},

	_checkClick(e) {
		// const $target = $(e.target);
		//
		// if (this.state.showOptions) {
		// 	if (!($target.parents().is('.rui-select-wrapper'))) {
		// 		this._toggleDropdown();
		// 	}
		// }

		if (this.mouseIsDownOnComponent) {
            return;
        }

		this._toggleDropdown();
	},

	render() {
		const parentClass = classNames('rui-select-wrapper', {
			'option-selected': this.state.seleclectionMade,
			'show-dropdown': this.state.showOptions,
		});

		const selectOptions = _.map(this.props.options, (option, index) => {
			if (option === this.props.options[0]) {
				return (
					<div className='dropdown-option' key={index} onClick={this._changeOption.bind(this, this.props.options[0])}>
						<i className='option-icon fa fa-remove' /><p className='option-label'>Reset</p>
					</div>
				);
			}
			return (
				<div className='dropdown-option' key={index} onClick={this._changeOption.bind(this, option)}>
					<p className='option-label'>{option}</p>
				</div>
			);
		});

		return (
			<div className={parentClass} onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp}>
				<div className='select-button-holder' onClick={this._toggleDropdown}>
					<div className='button-icon'><i className={'select-type-icon fa ' + this.props.icon} /></div>
					<div className='button-label'>{this.state.selectedOption}</div>
					<div className='button-arrow'><i className='select-arrow-icon fa fa-chevron-down' /></div>
					<div className='button-effect' />
				</div>
				<div className='select-dropdown-holder' ref='optionsHolder'>
					{selectOptions}
				</div>
			</div>
		);
	},
});

export default RuiSelect;
