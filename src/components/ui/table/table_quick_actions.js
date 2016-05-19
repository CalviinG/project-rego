import React 	  from 'react';
import _ 		  from 'underscore';
import $ 		  from 'jquery';
import classNames from 'classnames';

const TableQuickActions = React.createClass({
	propTypes: {
		quickActions: React.PropTypes.array.isRequired,
	},

	getInitialState() {
		return {
			hidden: this.props.hidden,
			showActions: false,
		};
	},

	getDefaultProps() {
		return {
			hidden: true,
		};
	},

	componentWillReceiveProps(newProps) {
		if (this.state.showActions === true) {
			// Do nothing
		} else if (newProps.hidden === false) {
			window.addEventListener('click', this._checkClick);
			this.setState({ hidden: newProps.hidden });
		} else {
			this.setState({ hidden: true })
		}
	},

	componentWillUnmount() {
        window.removeEventListener('click', this._checkClick);
    },

	_openActions() {
		this._enterAnimation();
		this.setState({ showActions: true });
	},

	_enterAnimation() {
		const $parent = $(this.refs.popupParent);
		const $popup = $(this.refs.popupChild);

		// Get correct height
		const newTop = ($popup.outerHeight(true) / 2) - ($parent.outerHeight(true) / 2);
		$popup.css({ top: -newTop });
	},

	_checkClick(e) {
		const $target = $(e.target);
		const $parent = $(this.refs.popupParent);

		if (this.state.showActions) {
			if ($target.parents().is($parent) || $target.is($parent)) {
				// Do nothing
			} else {
				if ($target.parents().is('.action-button')) {
					// Hmm?
				}
				this.setState({ showActions: false });
			}
		}
	},

	_onAction(index) {
		if (typeof this.props.quickActions[index][2] === 'function') {
			this.props.quickActions[index][2](this.props.indexKey);
		}
	},

	render() {
		const parentClass = classNames('table-quick-actions-wrapper', {
			'is-showing': !this.state.hidden,
			'show-actions': this.state.showActions,
		});

		// this.props.quickActions
		const quickActionButtons = _.map(this.props.quickActions, (action, index) => {
			return (
				<div key={'actionButton' + index} className='action-button' onClick={this._onAction.bind(this, index)}>
					<i className={'button-icon fa ' + action[1]} />
					<p className='button-text'>{action[0]}</p>
				</div>
			);
		});

		return (
			<div className={parentClass}>
				<div className='quick-actions-popup-button' ref='popupParent' onClick={this._openActions}>
					<div className='button-circle circle-one' />
					<div className='button-circle circle-two' />
					<div className='button-circle circle-three' />
				</div>
				<div className='quick-actions-popup-holder' ref='popupChild'>
					{quickActionButtons}
				</div>
			</div>
		);
	},
});

export default TableQuickActions;