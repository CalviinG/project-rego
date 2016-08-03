import React from 'react';
import $	 from 'jquery';
import _	 from 'underscore';

// Json
import Leagues from '../../json/leagues.json';

const UserProfileCardComponent = React.createClass({
	propTypes: {
        userData: React.PropTypes.object.isRequired,
    },

	componentDidMount() {
		const user = this.props.userData;
		$(this.refs.experienceBarRef).css({ width: 0 });
		$(this.refs.experienceBarRef).animate({ width: `${(user.levelData.curExp / user.levelData.maxExp) * 100}%`}, 450);
	},

	_buildTeam(team) {
		if (team === null) {
			return (
				<div className='profile-card-team'>
					<div className='team-no-team'>No Team</div>
				</div>
			);
		} else {
			return (
				<div className='profile-card-team'>
					<div className='team-name'>{team.name}</div>
					<div className='team-league'>
						<i className="fa fa-trophy team-league-icon" />
						{team.leagueData.shortName}
					</div>
				</div>
			);
		}
	},

	render() {
		const user = this.props.userData;
		const leagueData = _.findWhere(Leagues, {leagueId: user.teamData.leagueId} );
		const teamRankImageRender = (user.teamData !== null)
			? <img className='images-team-rank' src={`../../../sass/images/${leagueData.emblemSmall}`} />
			: <div className='images-team-rank' />
		const levelString = `Level ${user.levelData.level} ${user.levelData.name}`;
		user.teamData.leagueData = leagueData;
		const teamRender = this._buildTeam(user.teamData);

		return (
			<div className='user-profile-card-wrapper'>
				<div className='profile-card-content'>
					<div className='profile-card-images'>
						<img className='images-solo-rank' src={`../../../sass/images/solo_ranks/rank_${user.rankData.rank}.png`} />
						<img className='images-profile-image' src={`../../../sass/images/user_images/${user.image}.png`} />
						{teamRankImageRender}
					</div>
					<div className='profile-card-name'>
						{user.name}
					</div>
					<div className='profile-card-level'>
						<p className='level-text'>{levelString}</p>
						<div className='level-progress-bar'>
							<div className='bar-experience' ref='experienceBarRef' />
						</div>
					</div>
					<div className='profile-card-stats'>
						<div className='stats-block'>
							<p className='stats-block-desc'>Games</p>
							<p className='stats-block-data'>{user.statsData.matchStats.matchesPlayed}</p>
						</div>
						<div className='stats-block'>
							<p className='stats-block-desc'>Wins</p>
							<p className='stats-block-data'>{user.statsData.matchStats.matchesWon}</p>
						</div>
						<div className='stats-block'>
							<p className='stats-block-desc'>Kills</p>
							<p className='stats-block-data'>{user.statsData.fragStats.kills}</p>
						</div>
					</div>
					{teamRender}
				</div>
				<div className='profile-card-corners-top' />
				<div className='profile-card-corners-bottom' />
			</div>
		);
	},
});

export default UserProfileCardComponent;
