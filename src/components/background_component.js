import React      from 'react';
import classNames from 'classnames';

const BackgroundComponent = React.createClass({
	propTypes: {
		initialize: React.PropTypes.bool.isRequired,
	},

	render() {
		let initialize;
		if (this.props.initialize) {
			initialize = (
				<div className='background-initialize'>
					<div className='background-fade-overlay' />
					<div className='background-made-by'>Made with <i className='fa fa-heart made-by-icon' /> by Dan Andersson</div>
					<div className='background-logotype' />
					<div className='background-particle-overlay-one' />
					<div className='background-particle-overlay-two' />
					<div className='background-particle-overlay-three' />
				</div>
			);
		} else {
			initialize = null;
		}

		const backgroundClass = classNames('background', {
			'project-is-loading': this.props.initialize,
		});

		return (
			<div className={backgroundClass}>
				{initialize}
				<div className='background-overlay-blue' />
				<div className='background-overlay-black' />
				<div className='background-image' />
			</div>
		);
	},
});

export default BackgroundComponent;
