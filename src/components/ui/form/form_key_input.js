import React 	  from 'react';
import ReactDOM   from 'react-dom';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormKeyInput = React.createClass({
	propTypes: {
		input: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool,
    },

	getInitialState() {
		return {
			editing: false,
			key: this.props.input,
		};
	},

	getDefaultProps() {
		return {
			input: '',
		};
	},

	componentDidMount() {
		window.addEventListener('keypress', this._cancelPropagations);
		window.addEventListener('keydown', this._cancelPropagations);

		this.recordClick = false;
	},

	componentWillReceiveProps(newProps) {
		if (newProps.input !== this.state.key) {
			this.setState({ key: newProps.input });
		}
	},

	componentWillUnmount() {
		window.removeEventListener('keypress', this._cancelPropagations);
		window.removeEventListener('keydown', this._cancelPropagations);
	},

	_cancelPropagations() {
		console.log('CANCEL THAT SHIT!');
		event.preventDefault();
	},

	_startInputMode() {
		window.addEventListener('keypress', this._inputMode);
		window.addEventListener('keydown', this._inputMode);
		window.addEventListener('click', this._checkClick);

		this.setState({ editing: true });
	},

	_endInputMode(newKey) {
		window.removeEventListener('keypress', this._inputMode);
		window.removeEventListener('keydown', this._inputMode);
		window.removeEventListener('click', this._checkClick);

		this.recordClick = false;

		if (typeof this.props.onChange === 'function'){
			this.props.onChange(newKey);
		}

		this.setState({
			key: newKey,
			editing: false,
		});
	},

	_checkClick(event) {
		const parentRefID = this.refs.keyInputParentRef._reactInternalComponent._rootNodeID;
		const childRefID = this.refs.keyInputChildRef._reactInternalComponent._rootNodeID;
		const targetID = (event.toElement._reactInternalComponent !== undefined)
			? event.toElement._reactInternalComponent._rootNodeID
			: null ;

		if ((targetID === parentRefID || targetID === childRefID) && this.state.editing && this.recordClick) {
			if (event.button === 0) {
				this._endInputMode('Left Mouse');
			} else if (event.button === 1) {
				this._endInputMode('Middle Mouse');
			}
		} else if ((targetID === parentRefID || targetID === childRefID) && this.state.editing) {
			this.recordClick = true;
		} else {
			this._endInputMode(this.state.key);
		}
	},

	_inputMode(event) {
		let key;

		if (event.keyCode === 32) {
			key = 'Space';
		} else if (event.keyCode === 17) {
			key = 'Ctrl';
		} else if (event.keyCode === 16) {
			key = 'Shift';
		} else if (event.keyCode === 13) {
			key = 'Space';
		} else if (event.keyCode === 9) {
			key = 'Tab';
		} else {
			key = String.fromCharCode(event.keyCode).toUpperCase();
		}

		this._endInputMode(key);
	},

	_onContextMenu(event) {
		if (this.state.editing && this.recordClick) {
			event.preventDefault();
			this._endInputMode('Right Mouse');
		}
	},

	render() {
		const parentClass = classNames('rui-form-key-input', {
			'input-mode': this.state.editing,
		});

		const renderValue = (this.state.editing)
			? 'Press a button'
			: this.state.key ;

		return (
			<FormBase label={this.props.label} disabled={this.props.disabled}>
				<div className={parentClass} onClick={this._startInputMode} onContextMenu={this._onContextMenu} ref='keyInputParentRef'>
					<p className='input-text' ref='keyInputChildRef'>{renderValue}</p>
				</div>
			</FormBase>
		);
	},
});

export default FormKeyInput;
