import React, {Component} from 'react'
import './Dropdown.css'

class Dropdown extends Component {
	constructor (props) {
		super(props)
		this.state = {
			displayMenu: false
		}

		this.showDropdownMenu = this.showDropdownMenu.bind(this)
		this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
	}

	showDropdownMenu(event) {
		event.preventDefault();
		this.setState({displayMenu: true}, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		})
	}

	hideDropdownMenu() {
		this.setState({displayMenu: false}, () => {
			document.removeEventListener('click', this.hideDropdownMenu);
		})
	}

	render () {
		const links = this.props.links;

		const linksList = links.map((linkItem, index) => {
			return <li><a href="#" key={index} onClick={this.props.onClick}>{linkItem.label}</a></li>
		});

		return (
			<div className="dropdown" style = {{background: "white", width: "auto"}} >
			<div className="button" onClick={this.showDropdownMenu}>{this.props.selection}</div>

				{ this.state.displayMenu ? (
					<ul className="dropdown-list">
						{linksList}
					</ul>
				):
				(
					null
				)
				}
			</div>
		);
	}
}

export default Dropdown;