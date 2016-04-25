import React 	  from 'react';
import classNames from 'classnames';
import $		  from 'jquery';

const AnimationHolder = React.createClass({
	propTypes: {
        
    },

	_enterAnimation() {
		const $ap = $(this.refs.animationParent);

		setTimeout(() => {
			$ap.addClass('animation');
		}, 0);
	},

	render() {
		return (
			<div className='animation-holder' ref='animationParent'>
				{this.props.children}
			</div>
		);
	},
});

export default AnimationHolder;