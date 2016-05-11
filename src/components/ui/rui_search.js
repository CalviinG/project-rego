import React 	  from 'react';
import classNames from 'classnames';
import _ 		  from 'underscore';

const Keyword = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		type: React.PropTypes.string,
	},

	_onClick() {
		if (typeof this.props.onClick === 'function') this.props.onClick();
	},

	render() {
		const parentClass = classNames('search-keyword', {
			'normal-type': this.props.type === 'normal',
			'map-type': this.props.type === 'map',
			'mode-type': this.props.type === 'mode',
		});

		return (
			<div className={parentClass}>
				<p className='keyword-label'>{this.props.label}</p>
				<i className='keyword-icon fa fa-remove' onClick={this._onClick} />
			</div>
		);
	},
});

const RuiSearch = React.createClass({
	propTypes: {
		hint: React.PropTypes.string,
		value: React.PropTypes.string,
	},

	getInitialState() {
		return {
			hasFocus: false,
			value: this.props.value,
			keywords: [],
		};
	},

	getDefaultProps() {
		return {
			value: null,
		};
	},

	_onChange(event) {
		if (typeof this.props.onChange === 'function') this.props.onChange(event);
		this.setState({ value: event.target.value });
	},

	_onFocus(event) {
		if (typeof this.props.onFocus === 'function') this.props.onFocus(event);
		this.setState({ hasFocus: true });
	},

	_onBlur(event) {
		if (typeof this.props.onBlur === 'function') this.props.onBlur(event);
		this.setState({ hasFocus: false });
	},

	_onKeyPress(event) {
		if (event.charCode === 13) {
			this._addKeyword(event.target.value);
			this.setState({ value: '' });
		}
	},

	_addKeyword(keyword) {
		// Keyword filtering
		if (keyword === '' || keyword === ' ' || keyword === '  ') { return }

		if (!(_.contains(this.state.keywords, keyword))) {
			let newKeywords = this.state.keywords;
			newKeywords.push(keyword.toLowerCase());
			if (typeof this.props.onUpdate === 'function') this.props.onUpdate(newKeywords);
			this.setState({ keywords: newKeywords });
		} 
	},

	_removeKeyword(label) {
		let newKeywords = _.without(this.state.keywords, label);
		if (typeof this.props.onUpdate === 'function') this.props.onUpdate(newKeywords);
		this.setState({ keywords: newKeywords });
	},

	render() {
		const parentClass = classNames('rui-search-wrapper', {
			'has-focus': this.state.hasFocus,
			'has-value': this.state.value,
		});

		const fieldProps = {
			value: this.state.value,
		};

		// Keywords
		const mapKeys = [
			'de_aztec', 
			'de_dust', 
			'de_dust2', 
			'de_cache', 
			'de_cobblestone', 
			'de_inferno', 
			'de_mirage', 
			'de_nuke', 
			'de_overpass', 
			'de_train', 
			'de_vertigo',
		];

		const modeKeys = [
			'defusal',
			'deathmatch',
			'arms race',
			'demolition',
			'hostage',
		];

		const keywords = _.map(this.state.keywords, (value, index) => {
			let highlightType = 'normal';
			if (_.contains(mapKeys, value)) {
				highlightType = 'map';
			} else if (_.contains(modeKeys, value)) {
				highlightType = 'mode';
			}

			return <Keyword type={highlightType} label={value} key={index} onClick={this._removeKeyword.bind(this, value)} />
		});

		return (
			<div className={parentClass}>
				<i className='search-icon fa fa-search' />
				<div className='search-hint'>{this.props.hint}</div>
				<input className='search-field' {...fieldProps} ref='searchField' onKeyPress={this._onKeyPress}  onChange={this._onChange} onFocus={this._onFocus} onBlur={this._onBlur} />
				<div className='search-keywords-holder'>{keywords}</div>
			</div>
		);
	},
});

export default RuiSearch;