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
		if (newProps.hidden === false) {
			this._enterAnimation();
		}

		this.setState({ hidden: newProps.hidden });
	},

	_enterAnimation() {
		const $parent = $(this.refs.popupParent);
		const $popup = $(this.refs.popupChild);

		window.setTimeout(() => {
			const newTop = ($popup.outerHeight(true) / 2) - ($parent.outerHeight(true) / 2);
			$popup.css({ top: -newTop });
		}, 10);	
	},

	render() {
		const parentClass = classNames('table-quick-actions-wrapper', {
			'is-showing': !this.state.hidden,
			'show-actions': this.state.showActions,
		});

		// this.props.quickActions
		const quickActionButtons = _.map(this.props.quickActions, (action, index) => {
			return (
				<div key={'actionButton' + index} className='action-button'>
					<i className={'button-icon fa ' + action[1]} />
					<p className='button-text'>{action[0]}</p>
				</div>
			);
		});

		return (
			<div className={parentClass}>
				<div className='quick-actions-popup-button' ref='popupParent'>
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