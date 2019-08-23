import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
	constructor (props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<div className="header-wrapper">
				<div className="logo-wrapper">
					<img src="icons/logo-hn-search.webp" className="header-logo" alt="Hacker News logo"></img><div className="header-title">Search<br />Hacker News</div>
				</div>
				{ this.props.search ? <div className="search-wrapper">
					<div className="item-input-wrapper">
						<input type="text" value={this.props.query} onChange={this.props.handleInputChange} className="search-bar"></input>
					</div>
					<div className="powered-by">
						<div className="by-algolia">by</div>
						<a href="https://www.algolia.com/"><img className="algolia-logo" alt="Algolia" src="icons/logo-algolia-nebula-blue-full-edited.svg"></img></a>
					</div>
				</div> : null }
			</div>
		)
	}
}

export default Header;