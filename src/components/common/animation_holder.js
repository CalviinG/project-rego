import React 	  from 'react';
import classNames from 'classnames';
import $		  from 'jquery';

const AnimationHolder = React.createClass({
	propTypes: {
        zIndex: React.PropTypes.number,
		height: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number,
		]),
    },

    getDefaultProps() {
    	return {
    		zIndex: 0,
    	};
    },

	_enterAnimation() {
		const $ap = $(this.refs.animationParent);

		setTimeout(() => {
			$ap.addClass('animation');
		}, 0);
	},

	render() {
		const animationStyle = ({
			position: 'relative',
			zIndex: this.props.zIndex,
			height: (this.props.height) ? this.props.height : 'auto',
		});

		return (
			<div className='animation-holder' ref='animationParent' style={animationStyle}>
				{this.props.children}
			</div>
		);
	},
});

export default AnimationHolder;
