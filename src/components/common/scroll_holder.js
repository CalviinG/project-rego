import React from 'react';
import $ 	 from 'jquery';

const ScrollHolder = React.createClass({
	componentDidMount() {
		this._setBarHeight();	
	},

	_listenOnScroll(e) {
		const scrollTop = e.target.scrollTop;
		const $scroll = $(this.refs.scrollRef);
		const $bar = $(this.refs.barRef);

		const sH = $scroll.outerHeight(true);
		const barTop = 100 / (sH / scrollTop);

		// Update scrollbar transform translateY value
		$bar.css({
			transform: `translate(0px, ${barTop}%)`,
		});
	},

	_setBarHeight() {
		const $content = $(this.refs.contentRef).children().eq(0); // Can this be written smarter?
		const $scroll = $(this.refs.scrollRef);
		const $bar = $(this.refs.barRef);

		const cH = $content.outerHeight(true);
		const sH = $scroll.outerHeight(true);

		// Check if content is bigger than holder
		// If not, then hide the scroll bar
		$scroll.css({ display: (cH < sH) ? 'none' : 'block' });

		if (cH > sH) {
			const newHeight = `${(sH / cH) * 100}%`
			$bar.css({ height: newHeight });

			// Add event listener to scroll
			$(this.refs.contentRef)[0].addEventListener('scroll', this._listenOnScroll);
		}	
	},

	render() {
		return (
			<div className='scroll-holder'>
				<div className='scroll-content' ref='contentRef'>
					{this.props.children}
				</div>
				<div className='scroll-indicator' ref='scrollRef'>
					<div className='indicator-bar' ref='barRef' />
					<div className='indicator-area' />
				</div>
			</div>
		);
	},
});

export default ScrollHolder;