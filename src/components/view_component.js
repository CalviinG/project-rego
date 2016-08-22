import React from 'react';
import $	 from 'jquery';
import _     from 'underscore';

// Mixins
import TimerMixin from 'react-timer-mixin';

// ** Views **
// Home
import HomeView from './views/home';
// Play
import BrowseView from './views/play/browse';
// Settings
import InGameView   from './views/settings/ingame';
import ControlsView from './views/settings/controls';
import AudioView    from './views/settings/audio';
import VideoView    from './views/settings/video';

const ViewComponent = React.createClass({
	mixins: [TimerMixin],
	propTypes: {
        activeMain: React.PropTypes.number.isRequired,
        activeSub:  React.PropTypes.number.isRequired,
		users: 		React.PropTypes.object.isRequired,
    },

    getInitialState() {
    	return {
    		fading: true,
    		nextView: [this.props.activeMain, this.props.activeSub],
    		prevView: [0, 0],
    	};
    },

    componentWillReceiveProps(nextProps) {
    	this.setState({
    		fading: true,
    		nextView: [nextProps.activeMain, nextProps.activeSub],
    		prevView: this.state.nextView,
    	});
    },

    componentDidMount() {
    	this._fadingPhase('in');
    },

    componentDidUpdate() {
    	if (this.state.fading) {
    		console.log('fade out');
    		this._fadingPhase('out');
    	} else {
    		console.log('fade in');
    		this._fadingPhase('in');
    	}
    },

    _fadingPhase(type) {
    	const $ch = $(this.refs.contentHolder);
		const speed = 50;
		const phaseOutSpeed = 250; // Min 250 (because of css transition speed)

    	if (type === 'out') {
    		// Fades out children
    		_.map($ch.find('.animation-holder'), (child, index) => {
    			// $(child).addClass('leave-animation');
    		});

    		// Change state to fade in new view
    		this.setTimeout(() => {
	    		this.setState({ fading: false });
	    	}, phaseOutSpeed);
    	} else if (type === 'in') {
    		// Maps the children in the view and allows them to enter with an animation
			_.map($ch.find('.animation-holder'), (child, index) => {
				setTimeout(() => {
					$(child).addClass('enter-animation');
				},  speed * (index + 1));
			});
    	}
    },

	render() {
		const view = this.props;
		const users = this.props.users;

		const viewLibrary = [
			[
				/* Home */
				<HomeView users={users} />,
			],
			[
				/* Play */
				null,
				null,
				null,
				null,
				<BrowseView />,
			],
			[
				/* Inventory */
				null,
				null,
				null,
			],
			[
				/* Store */
				null,
				null,
			],
			[
				/* Watch */
				null,
				null,
				null,
			],
			[
				/* Settings */
				<InGameView />,
				<ControlsView />,
				<AudioView />,
				<VideoView />,
			],
		];

		let renderView = (this.state.fading)
			? viewLibrary[this.state.prevView[0]][this.state.prevView[1]]
			: viewLibrary[this.state.nextView[0]][this.state.nextView[1]] ;

		return (
			<div className='content' ref='contentHolder'>
				{renderView}
			</div>
		);
	},
});

export default ViewComponent;
