import React      from 'react';
import ReactDOM   from 'react-dom';
import $ 		  from 'jquery';
import _	      from 'underscore';
import classNames from 'classnames';

// Components
import ScrollHolder from './scroll_holder.js';

// Rui
import {Card} from '../ui';

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

		let openHeight = 0;
		_.each(this.props.children, (child, i) => {
			openHeight += $el.children().eq(i).outerHeight(true);
		});

		$el.css({ height: (this.state.open) ? 0 : openHeight });


		if (typeof this.props.onToggle === 'function') {
			this.props.onToggle();
		}

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
			'is-online':   gameData.status === 'Online',
			'is-offline':  gameData.status === 'Offline',
			'is-idle':     gameData.status === 'Idle',
			'is-in-match': gameData.status === 'Match',
			'is-in-lobby': gameData.status === 'Lobby',
		});

		// Description String
		let descString;
		if (gameData.inGameStatus) {
			descString = (gameData.status === 'Match')
				? `${gameData.inGameStatus.type}, ${gameData.inGameStatus.map.name}, ${gameData.inGameStatus.score}`
				: gameData.inGameStatus.desc
					? `${gameData.inGameStatus.type} Lobby, ${gameData.inGameStatus.desc}`
					: `${gameData.inGameStatus.type} Lobby`;
		} else {
			descString = (gameData.status === 'Idle')
				? 'In-Game'
				: gameData.status;
		}

		return (
			<div className='friend-list-user-block'>
				<img className='user-block-avatar' src={`sass/images/${user.image}`} />
				<div className='user-block-text'>
					<p className='header-text'>{user.name}</p>
					<p className={descClass}>{descString}</p>
				</div>
			</div>
		);
	},
});

const FriendListCardComponent = React.createClass({
	propTypes: {
		friends: React.PropTypes.array.isRequired,
	},

	_onToggle() {
		this.refs.scrollHolderRef.updateScrollBar(250);
	},

	render() {
		const friends = this.props.friends;

		const onlineFriends = [];
		const offlineFriends = [];
		const lobbyFriends = [];
		const matchFriends = [];
		const idleFriends = [];
		const inGameFriends = [];
		const inGameFriendList = [];

		_.each(friends, (friend) => {
			const status = friend.gameData.status;
			const friendBlock = <UserBlock key={friend.userId} user={friend} />

			if (status === 'Online') {
				onlineFriends.push(friendBlock);
			} else if (status === 'Offline') {
				offlineFriends.push(friendBlock);
			} else {
				if (status === 'Lobby') {
					lobbyFriends.push(friend);
				} else if (status === 'Match') {
					matchFriends.push(friend);
				} else {
					idleFriends.push(friend);
				}
			}
		});

		// Push users in-game into the array in correct order
		_.each(matchFriends, (user) => { inGameFriends.push(user) });
		_.each(lobbyFriends, (user) => { inGameFriends.push(user) });
		_.each(idleFriends, (user) => { inGameFriends.push(user) });

		_.each(inGameFriends, (friend) => {
			const friendBlock = <UserBlock key={friend.userId} user={friend} />

			inGameFriendList.push(friendBlock);
		});

		return (
			<Card style={{height: '100%'}}>
				<ScrollHolder showScrollOnHover={true} friendListStyle={true} ref='scrollHolderRef'>
					<div className='friend-list-card-wrapper'>
						<ToggleBlock open={true} label='In-Game' amount={inGameFriends.length} onToggle={this._onToggle}>
							{inGameFriendList}
						</ToggleBlock>
						<ToggleBlock open={true} label='Online' amount={onlineFriends.length} onToggle={this._onToggle}>
							{onlineFriends}
						</ToggleBlock>
						<ToggleBlock open={false} label='Offline' amount={offlineFriends.length} onToggle={this._onToggle}>
							{offlineFriends}
						</ToggleBlock>
					</div>
				</ScrollHolder>
			</Card>
		);
	},
});

export default FriendListCardComponent;
