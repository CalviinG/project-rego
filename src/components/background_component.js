import React from 'react';

const BackgroundComponent = React.createClass({
	render() {
		return (
			<div className='background'>
				<div className='background-overlay-blue' />
				<div className='background-overlay-black' />
				<div className='background-image' />
			</div>
		);
	},
});

export default BackgroundComponent;