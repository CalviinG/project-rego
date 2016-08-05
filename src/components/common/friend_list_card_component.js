import React      from 'react';
import $ 		  from 'jquery';
import _	      from 'underscore';
import classNames from 'classnames';

// Components
import ScrollHolder from './scroll_holder.js';

const ToggleBlock = React.createClass({
	propTypes: {
		label: React.PropTypes.string.isRequired,
		amount: React.PropTypes.number.isRequired,
		open: React.PropTypes.bool,
	},

	getInitialState() {
		return {
			open: this.props.open,
		};
	},

	getDefaultProps() {
		return {
			open: false,
		};
	},

	_toggleContent() {
		const $el = $(this.refs.childrenRef);

		$el.css({ height: (this.state.open) ? 0 : (this.props.amount * 50 ) - 10 });

		this.setState({ open: !this.state.open });
	},

	render() {
		const parentClass = classNames('friend-list-toggle-block', {
			'is-closed': !this.state.open,
		});

		const listStyle = {
			height: (this.state.open) ? (this.props.amount * 50 ) - 10 : 0,
		};

		return (
			<div className={parentClass}>
				<div className='toggle-block-head' onClick={this._toggleContent}>
					<p className='head-label'>Friends {this.props.label} ({this.props.amount})</p>
					<i className='head-icon fa fa-angle-down' />
				</div>
				<div style={listStyle} className='toggle-block-list' ref='childrenRef'>
					{this.props.children}
				</div>
			</div>
		);
	},
});

const UserBlock = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired,
	},

	render() {
		const user = this.props.user;
		const gameData = user.gameData;

		const descClass = classNames('desc-text', {
			'is-online': gameData.status === 'Online',
			'is-offline': gameData.status === 'Offline',
			'is-in-match': gameData.status === 'In-Game' && gameData.inGameStatus !== 'Idle',
			'is-in-game': gameData.status === 'In-Game' && gameData.inGameStatus === 'Idle',
		});

		return (
			<div className='friend-list-user-block'>
				<div className='user-block-avatar'></div>
				<div className='user-block-text'>
					<p className='header-text'>{user.name}</p>
					<p className={descClass}>{gameData.status}</p>
				</div>
			</div>
		);
	},
});

const FriendListCardComponent = React.createClass({
	propTypes: {
		friends: React.PropTypes.array.isRequired,
	},

	render() {
		const friends = this.props.friends;

		let onlineFriends = [];
		let inGameFriends = [];
		let offlineFriends = [];

		_.each(friends, (friend) => {
			const friendBlock = <UserBlock key={friend.userId} user={friend} />
			if (friend.gameData.status === 'Online') {
				onlineFriends.push(friendBlock);
			} else if (friend.gameData.status === 'In-Game') {
				inGameFriends.push(friendBlock);
			} else if (friend.gameData.status === 'Offline') {
				offlineFriends.push(friendBlock);
			}
		});

		// const onlineList = this._buildOnlineList(onlineFriends);

		return (
			<ScrollHolder>
				<div className='friend-list-card-wrapper'>
					<ToggleBlock open={true} label='In-Game' amount={inGameFriends.length}>
						{inGameFriends}
					</ToggleBlock>
					<ToggleBlock open={true} label='Online' amount={onlineFriends.length}>
						{onlineFriends}
					</ToggleBlock>
					<ToggleBlock open={false} label='Offline' amount={offlineFriends.length}>
						{offlineFriends}
					</ToggleBlock>
				</div>
			</ScrollHolder>
		);
	},
});

export default FriendListCardComponent;
