import React from 'react';
import _ 	 from 'underscore';

import TableQuickActions from './table_quick_actions.js';

const TableRow = React.createClass({
	propTypes: {
		row: React.PropTypes.object.isRequired,
		rowKey: React.PropTypes.number.isRequired,
		widthValues: React.PropTypes.array.isRequired,
		quickActions: React.PropTypes.array,
	},

	getInitialState() {
		return {
			showQuickActions: false,
		};
	},

	_onMouseEnter() {
		this.setState({ 
			showQuickActions: (_.isArray(this.props.quickActions) && this.props.quickActions.length > 0) ? true : false
		});
	},

	_onMouseLeave() {
		this.setState({ showQuickActions: false });
	},

	render() {
		const rowData = this.props.row;
		const rowNumber = this.props.rowKey;

		let rowColumnCounter = -1; // Great initial value ..

		// Builds the row
		const row = _.map(rowData, (key) => {
			rowColumnCounter++;
			const columnWidth = ({width: this.props.widthValues[rowColumnCounter]});

			if (_.isArray(key)) {
				const statusCircle = (key.length === 2) ? <div className='status-circle' /> : null ;
				const statusIcon = (key[2]) ? <i className={'table-icon row-icon fa ' + key[2]} /> : null ;
				const statusText = (key[1]) ? <p className='row-text'>{key[1]}</p> : null ;
				return (
					<div key={'rowKey' + key} className={'row-icon-holder is-' + key[0]} style={columnWidth}>
						{statusCircle}
						{statusIcon}
						{statusText}
					</div>
				);
			} else {
				return (
					<div key={'rowKey' + key} className='row-value' style={columnWidth}>
						<p className='row-text'>{key}</p>
					</div>
				);
			}
		});

		// this.props.quickActions
		let quickActions = null;
		if (_.isArray(this.props.quickActions) && this.props.quickActions.length > 0) {
			quickActions = <TableQuickActions quickActions={this.props.quickActions} hidden={!this.state.showQuickActions} indexKey={rowNumber} />
		}

		return (
			<div key={'tableRow' + rowNumber} className='body-row' onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
				{row}
				{quickActions}
			</div>
		);
	},
});

const Table = React.createClass({
	propTypes: {
		header: React.PropTypes.array.isRequired,
		rows: React.PropTypes.array.isRequired,
		widthValues: React.PropTypes.array.isRequired,
		quickActions: React.PropTypes.array,
	},

	_createHeader(headerData) {
		const headerLabels = _.map(headerData, (label, index) => {
			const headerLabel = (_.isArray(label))
				? <i className={'table-icon header-icon fa ' + label[1]} />
				: <p className='header-text'>{label}</p> ;

			return (
				<div key={'headerLabel' + index} className='header-value' style={{width: this.props.widthValues[index]}}>
					{headerLabel}
				</div>
			);
		});

		return (
			<div className='table-header'>
				{headerLabels}
			</div>
		);
	},

	render() {
		// Table Header
		const header = this._createHeader(this.props.header);

		// Table Rows
		const list = _.map(this.props.rows, (row, index) => {
			return (
				<TableRow
					key={'row' + index}
					row={row}
					rowKey={index}
					widthValues={this.props.widthValues}
					quickActions={this.props.quickActions} />
			);
		});

		return (
			<div className='rui-table-wrapper'>
				{header}
				<div className='table-body'>
					{list}
				</div>
			</div>
		);
	},
});

export default Table;