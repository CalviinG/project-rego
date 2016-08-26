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
					<div className='content-one-teams'></div>
					<div className='content-one-sponsors'>
						<span className='sponsor'>BenQ</span>
						<span className='sponsor'>Alienware</span>
						<span className='sponsor'>Logitech</span>
						<span className='sponsor'>G2A.com</span>
						<span className='sponsor'>gamed!de</span>
					</div>
				</div>
			),
			date: '2016-08-10',
		});

		// Slide #2 - CS:GO Patch - Second Shot
		sliders.push({
			content: (
				<div className=''>
					Slide #2
				</div>
			),
			date: '2016-08-03',
		});

		// Slide #3 - Cologne 2016 Champions
		sliders.push({
			content: (
				<div className=''>
					Slide #3
				</div>
			),
			date: '2016-07-10',
		});

		// Slide #4 - CS:GO Game Patch - Gamma Exposure
		sliders.push({
			content: (
				<div className=''>
					Slide #4
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
