import React	  from 'react';
import _	 	  from 'underscore';
import classNames from 'classnames';

// Mixins
import TimerMixin from 'react-timer-mixin';

// Rui
import {Card} from '../ui';

const BulletinCardComponent = React.createClass({
	mixins: [TimerMixin],
	getInitialState() {
		return {
			sliderIndex: 0,
		};
	},

	componentDidMount() {
		this._sliderAutomaticRun();
	},

	_sliderAutomaticRun() {
		const sliderRunMs = 75000;

		this.sliderTimeout = setTimeout(() => {
			this.setState({
				sliderIndex: (this.state.sliderIndex === this.sliderLength - 1) ? 0 : this.state.sliderIndex + 1 ,
			});

			this._sliderAutomaticRun();
		}, sliderRunMs);
	},

	_buildSliders() {
		const sliders = [];

		// Slide #1 - ESL Pro League Season 4
		sliders.push({
			content: (
				<div className='box-content-one'>
					<div className='content-one-header'>ESL & ESEA Presents</div>
					<div className='content-one-big'>
						<div className='big-label'>ESL Pro League Season 4</div>
						<div className='big-date'>2016-08-17 to 2016-10-13</div>
					</div>
					<div className='content-one-locations'>North America & Europe</div>
					<div className='content-one-sponsors'>
						<span className='sponsor'>ESEA</span>
						<span className='sponsor'>Logitech G</span>
						<span className='sponsor'>theScore esports</span>
						<span className='sponsor'>xfinity</span>
						<span className='sponsor'>Mountain Dew</span>
					</div>
				</div>
			),
			date: '2016-08-10',
		});

		// Slide #2 - CS:GO Patch - Second Shot
		sliders.push({
			content: (
				<div className='box-content-two patch-content'>
					<div className='patch-header'>Second Shot</div>
					<div className='patch-note'>Game Patch</div>
					<div className='patch-text'>
						Today we’re shipping a new accuracy recovery method and new recovery rates for the AK-47, M4A1-S, and M4A4. The goal is to allow players to develop and express their skill using a variety of methods of firing a weapon, by increasing the effectiveness of tapping/bursting relative to that of spraying.
					</div>
				</div>
			),
			date: '2016-08-03',
		});

		// Slide #3 - Cologne 2016 Champions
		sliders.push({
			content: (
				<div className='box-content-three'>
					<div className='content-three-title'>Cologne 2016 <span className='bold-title'>Champions</span></div>
					<div className='content-three-team'>SK-Gaming</div>
					<div className='content-three-text'>
						Congratulations to SK Gaming on winning the The ESL One Cologne 2016 Championship! They take home $500,000 of the $1,000,000 prize pool. This is their second consecutive Major title.
					</div>
				</div>
			),
			date: '2016-07-10',
		});

		// Slide #4 - CS:GO Game Patch - Gamma Exposure
		sliders.push({
			content: (
				<div className='box-content-four patch-content'>
					<div className='patch-header'>Gamma Exposure</div>
					<div className='patch-note'>Game Patch</div>
					<div className='patch-text'>
						Today’s update includes some new sounds, the Gamma Case (featuring community designs and knives with the all-new Gamma finishes), and adjustments to the Prime Account Matchmaking beta. In addition, we’re extending Operation Wildfire for one month so you’ve still got time to finish up your missions and upgrade your Challenge Coin!
					</div>
				</div>
			),
			date: '2016-06-15',
		});

		return sliders;
	},

	_changeSlider(index) {
		if (index != this.state.sliderIndex) {
			clearTimeout(this.sliderTimeout);
			this._sliderAutomaticRun();
			this.setState({ sliderIndex: index });
		}
	},

	render() {
		// Build Bulletin Sliders
		const bulletinObjects = this._buildSliders();
		const bulletinSliders = _.map(bulletinObjects, (slider, i) => {
			const sliderStyle = {
				transform: `translate(-${(100 * this.state.sliderIndex)}%, 0)`,
				opacity: (i === this.state.sliderIndex) ? 1 : 0,
			};

			return (
				<div key={'SliderKey' + i} style={sliderStyle} className='slider-box'>
					{slider.content}
				</div>
			);
		});

		// Build Slider Controls
		const sliderControls = _.map(bulletinSliders, (slider, i) => {
			const controllerClass = classNames('controller-button', {
				'is-active': i === this.state.sliderIndex,
			});

			return (
				<div key={'ControllerKey' + i} className={controllerClass} onClick={this._changeSlider.bind(this, i)} />
			);
		});

		// Set Slider Length For _sliderAutomaticRun()
		this.sliderLength = bulletinSliders.length;

		// Slider Date
		const sliderDate = bulletinObjects[this.state.sliderIndex].date;

		return (
			<Card label='News & Updates' extra={sliderDate}>
				<div className='bulletin-card-wrapper'>
					<div className='bulletin-slider-content'>
						{bulletinSliders}
					</div>
					<div className='bulletin-slider-controls'>
						{sliderControls}
					</div>
				</div>
			</Card>
		);
	},
});

export default BulletinCardComponent;
