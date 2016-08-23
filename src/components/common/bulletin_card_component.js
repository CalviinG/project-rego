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
		const sliderRunMs = 7500;

		this.setTimeout(() => {
			this.setState({
				sliderIndex: (this.state.sliderIndex === this.sliderLength - 1) ? 0 : this.state.sliderIndex + 1 ,
			});

			this._sliderAutomaticRun();
		}, sliderRunMs);
	},

	_buildSliders() {
		const sliders = [];

		// Slide #1 - ESL Pro League Season 4
		sliders.push(
			<div className=''>
				Slide #1 - ESL Pro League Season 4
			</div>
		);

		// Slide #2 - Cologne 2016 Champions
		sliders.push(
			<div className=''>
				Slide #2 - Cologne 2016 Champions
			</div>
		);

		// Slide #3 - CS:GO Weapon Finish Contest Winners
		sliders.push(
			<div className=''>
				Slide #3 - CS:GO Weapon Finish Contest Winners
			</div>
		);

		// Slide #4 - CS:GO Game Patch
		sliders.push(
			<div className=''>
				Slide #4 - CS:GO Game Patch
			</div>
		);

		return sliders;
	},

	_changeSlider(index) {
		if (index != this.state.sliderIndex) {
			this.setState({ sliderIndex: index });
		}
	},

	render() {
		// Build Bulletin Sliders
		const bulletinSliders = _.map(this._buildSliders(), (slider, i) => {
			const sliderStyle = {
				transform: `translate(-${(100 * this.state.sliderIndex)}%, 0)`,
				opacity: (i === this.state.sliderIndex) ? 1 : 0,
			};

			return (
				<div key={'SliderKey' + i} style={sliderStyle} className='slider-box'>
					{slider}
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

		return (
			<Card label='News & Updates'>
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
