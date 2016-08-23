import React 	  from 'react';
import classNames from 'classnames';

const RuiCard = React.createClass({
	propTypes: {
		style: React.PropTypes.object,
		noPadding: React.PropTypes.bool,
	},

	render() {
		const cardStyle = {
			padding: (this.props.noPadding) ? 0 : 20 ,
			...this.props.style,
		};

		return (
			<div className='rui-card-base' style={cardStyle}>
				{this.props.children}
			</div>
		);
	},
});

export default RuiCard;
