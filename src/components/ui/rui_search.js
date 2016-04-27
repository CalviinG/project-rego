import React 	  from 'react';
import classNames from 'classnames';

const RuiSearch = React.createClass({
	render() {
		const parentClass = classNames('rui-search-wrapper', {

		});

		return (
			<div className={parentClass}>
				search baby
			</div>
		);
	},
});

export default RuiSearch;