import React, {Component} from 'react'
import './Nav.css'

import Dropdown from './Dropdown.js'

const DropdownMenus = {
	Type: [
		{ label: "All"},
		{ label: "Stories"},
		{ label: "Comments"}
	],
	SortOrder: [
		{ label: "Popularity"},
		{ label: "Date"}
	],
	DateRange: [
		{ label: "All time"},
		{ label: "Last 24h"},
		{ label: "Past Week"},
		{ label: "Past Month"},
		{ label: "Past Year"},
		// { label: "Custom Range"}	// will implement this at some point
	]
}

class Nav extends Component {
	constructor (props) {
		super(props)
		this.state = {
			searchType: this.props.searchType,
			sortBy: this.props.sortOrder,
			dateRange: this.props.dateRange
		}

		// Dropdown should call a function which sets the state in Nav Component for changing values
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
		this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
	}

	handleTypeChange(event) {
		console.log(event.target.innerHTML)
		const type = event.target.innerHTML;
		this.setState({searchType: type});
		this.props.handleTypeChange(type);
	}

	handleSortOrderChange(event) {
		console.log(event.target.innerHTML)
		const sortOrder = event.target.innerHTML;
		this.setState({sortBy: sortOrder});
		this.props.handleSortOrderChange(sortOrder);
	}

	handleDateRangeChange(event) {
		console.log(event.target.innerHTML)
		const dateRange = event.target.innerHTML;
		this.setState({dateRange: dateRange});
		this.props.handleDateRangeChange(dateRange)
	}

	render () {
		return <div className="nav-wrapper">
		Search <Dropdown selection={this.state.searchType} links={DropdownMenus.Type} onClick={this.handleTypeChange}/>
		by <Dropdown selection={this.state.sortBy} links={DropdownMenus.SortOrder} onClick={this.handleSortOrderChange}/>
		for <Dropdown selection={this.state.dateRange} links={DropdownMenus.DateRange} onClick={this.handleDateRangeChange}/>
		<div className="processing-time">{this.props.nbHits} results ({this.props.processingTime/1000} seconds)</div>
		</div>
	}
}

export default Nav;

/* missing fragment
by <Dropdown selection="Date" /> for <Dropdown selection="Last Month"/>
*/