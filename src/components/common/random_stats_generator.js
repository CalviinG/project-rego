import _ from 'underscore';

// Json
import CsgoData from '../../json/csgo_data.json';
import Ranks 	from '../../json/ranks.json';
import Levels 	from '../../json/levels.json';

class RandomStatsGenerator {
	static generateUserData() {
		// Almost every stat depends on **stats_matchesPlayed**.
		// The more matches a user has played,
		// the more kills, deaths, stars, etc has he gained.

		// matchStats
		const stats_matchesPlayed = this._getRandomInt(60, 1800);
		const stats_matchesWon = this._getRandomInt(stats_matchesPlayed / 3, stats_matchesPlayed / 1.5);
		const stats_roundsPlayed = this._forEachInt(16, 30, stats_matchesPlayed);
		const stats_roundsWon = this._forEachInt(0, 15, stats_matchesPlayed - stats_matchesWon) + (stats_matchesWon * 16);
		const stats_mvpStars = Math.floor(this._forEachInt(0, 1, stats_roundsWon) / 1.5 );
		const stats_wlr = parseFloat((stats_matchesWon / stats_matchesPlayed).toFixed(2));

		// fragStats
		const stats_kills = this._forEachInt(2, 28, stats_matchesPlayed);
		const stats_deaths = this._forEachInt(1, 22, stats_matchesPlayed);
		const stats_headshots = this._getRandomInt(stats_kills / 10, stats_kills / 2.5);
		const stats_kdr = parseFloat((stats_kills / stats_deaths).toFixed(2));
		const stats_headshotPercent = parseFloat((stats_headshots / stats_kills).toFixed(2)) * 100;
		const stats_accuracy = this._getRandomPercentInt(10, 35);

		// rankData
		let data_rankNumber = Math.floor(stats_matchesPlayed / 80)
		if (data_rankNumber > 20) { data_rankNumber = 20; }
		else if (data_rankNumber < 1) { data_rankNumber = 1; }

		// levelData
		let data_levelNumber = Math.floor(stats_matchesPlayed / 40)
		if (data_levelNumber > 40) { data_levelNumber = 40; }
		else if (data_levelNumber < 1) { data_levelNumber = 1; }

		// gameInfo
		const gameInfo = this._buildOnlineMetaData();

		const data = {
			matchStats: {
				matchesPlayed: stats_matchesPlayed,
				matchesWon: stats_matchesWon,
				roundsPlayed: stats_roundsPlayed,
				roundsWon: stats_roundsWon,
				mvpStars: stats_mvpStars,
				wlr: stats_wlr,
			},
			fragStats: {
				kills: stats_kills,
				deaths: stats_deaths,
				headshots: stats_headshots,
				kdr: stats_kdr,
				headshotPercent: stats_headshotPercent,
				accuracy: stats_accuracy,
			},
			rankData: {
				rank: data_rankNumber,
				name: Ranks[data_rankNumber - 1],
				icon: `solo_ranks/rank_${data_rankNumber}.png`,
			},
			levelData: {
				level: data_levelNumber,
				name: Levels[data_levelNumber - 1],
				curExp: this._getRandomInt(1500, 8500),
				maxExp: 10000,
			},
			gameData: {
				...gameInfo,
			},

		};

		return data;
	}

	/**
	 * _buildGame()
	 * This function builds data for a game or a lobby
	 */

	static _buildGame(type) {
		const game = {
			map: null,
			score: null,
			type: null,
			desc: null,
			stats: null,
		}

		if (type === 'Match') {
			game.map = CsgoData.Maps.Defusal[_.random(0, CsgoData.Maps.Defusal.length - 1)];
			game.score = `${_.random(0, 15)} - ${_.random(0, 14)}`;
			game.type = (_.random(0, 1) === 0)
				? 'Competitive Play'
				: 'Matchmaking';
		} else if (type === 'Lobby') {
			game.type = CsgoData.GameModes[_.random(0, CsgoData.GameModes.length - 1)];
			game.desc = (_.random(0, 1) === 0)
			 	? 'Looking for players'
				: null;
		}

		return game;
	}

	/**
	 * _buildOnlineMetaData()
	 * This function randoms the users game status.
	 */

	static _buildOnlineMetaData() {
		const gameMeta = {
			status: 'Offline',
			inGameStatus: null,
		};

		// 70% - User is Online
		if (this._getRandomInt(1, 100) > 30) {
			gameMeta.status = 'Online';

			// 70% - User is Idle
			if (this._getRandomInt(1, 100) > 30) {
				gameMeta.status = 'Idle';

				// 50% - User is In-Match
				if (this._getRandomInt(1, 100) > 55) {
					gameMeta.status = 'Match';
					gameMeta.inGameStatus = this._buildGame('Match');

					return gameMeta;
				}

				// 50% - User is In-Lobby
				if (this._getRandomInt(1, 100) > 65) {
					gameMeta.status = 'Lobby';
					gameMeta.inGameStatus = this._buildGame('Lobby')

					return gameMeta;
				}

			}
		}

		return gameMeta;
	}

	/**
	 * Functions to determine random data for the user object.
	 */

	static _getRandomInt(min, max) {
  		return parseFloat((Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0));
	}

	static _getRandomPercentInt(min, max) {
		return parseFloat(((Math.floor(Math.random() * ((max * 10) - (min * 10) + 1)) + (min * 10)) / 10).toFixed(1));
	}

	static _forEachInt(min, max, matches) {
		const matchesArray = Array(matches).fill(min);

		_.each(matchesArray, (value, i) => {
			matchesArray[i] = this._getRandomInt(min, max);
		});

		return matchesArray.reduce( ( acc, cur ) => acc + cur, 0 );
	}
}

export default RandomStatsGenerator;
