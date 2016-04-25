import React from 'react';
import $	 from 'jquery';
import _	 from 'underscore';

const ContentHolder = React.createClass({
	propTypes: {
        nextMain: React.PropTypes.number.isRequired,
        nextSub:  React.PropTypes.number.isRequired,
    },

	componentDidMount() {
		const $ch = $(this.refs.contentHolder);
		const speed = 50;

		// Maps the children in the view and allows them to enter with an animation
		_.map($ch.children(), (child, index) => {
			setTimeout(() => {
				$(child).addClass('enter-animation');
			},  speed * (index + 1));
		});
	},

	componentWillUnmount() {
		console.log('change view');
	},

	render() {
		return (
			<div className='content' ref='contentHolder'>
				{this.props.children}
			</div>
		);
	},
});

export default ContentHolder;