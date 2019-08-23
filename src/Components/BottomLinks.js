import React, {Component} from 'react'
import './BottomLinks.css'

import {Link} from 'react-router-dom'

class BottomLinks extends Component {

	render () {
		return <div className="footer">
			<Link to="/">Main</Link>&bull;
			<Link to="/about">About</Link>&bull;
      <Link to="/help">Help</Link>&bull;
      <Link to="/status">Status</Link>&bull;
      <Link to="/github">Github</Link>
		</div>
	}

}

export default BottomLinks