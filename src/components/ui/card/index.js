import React 	  from 'react';
import classNames from 'classnames';

const RuiCard = React.createClass({
	propTypes: {
		style: React.PropTypes.object,
		noPadding: React.PropTypes.bool,
		label: React.PropTypes.string,
		extra: React.PropTypes.string,
	},

	getDefaultProps() {
		return {
			label: null,
			extra: null,
		};
	},

	render() {
		const cardStyle = {
			padding: (this.props.noPadding) ? 0 : 20 ,
			...this.props.style,
		};

		const cardLabel = (this.props.label)
			? <div className='card-header-label'>{this.props.label}</div>
			: null ;

		const cardExtra = (this.props.extra)
			? <div className='card-header-extra'>{this.props.extra}</div>
			: null ;

		const headerStyle = {
			marginBottom: (this.props.label || this.props.extra) ? 20 : 0 ,
		};

		return (
			<div className='rui-card-base' style={cardStyle}>
				<div className='card-header' style={headerStyle}>
					{cardLabel}
					{cardExtra}
				</div>
				{this.props.children}
			</div>
		);
	},
});

export default RuiCard;
