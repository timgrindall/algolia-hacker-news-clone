import React, {Component} from 'react'
import './PageNumbers.css'

class PageNumbers extends Component {
  constructor (props) {
    super(props)
    const {page, nbPages} = this.props.data

    this.state = {
      firstPage: Math.floor(page/5),
    }
  }

  nextGroup = () => {
    console.log(this.state.firstPage)
    const firstPage = Math.min(this.state.firstPage+5, this.props.data.nbPages-5)
    this.setState({firstPage: firstPage})
  }

  prevGroup = () => {
    console.log(this.state.firstPage)
    const firstPage = Math.max(this.state.firstPage-5, 0)
    this.setState({firstPage: firstPage})
  }

	render() {
    const {nbPages, page, hitsPerPage} = this.props.data
    var pages = []
    const firstPage = this.state.firstPage

    var i;
    for (i = firstPage; i < Math.min(nbPages, firstPage+5); i++) {
      pages.push(i+1)
    }

    const pagesList = pages.map((number, index) => {
      return <li key={index} className={number === page+1 ? "active" : ""}><button onClick={this.props.getPage}>{number}</button></li>
    })

		return <div className="page-numbers-container">
			<ul className="search-pagination">
        {firstPage > 4 ? <li><button onClick={this.prevGroup}>&lt;&lt;</button></li> : null}
        {pagesList}
        {nbPages > 5 && firstPage + 5 < nbPages ? <span><li><button disabled>...</button></li> {firstPage + 5 < nbPages ? <li className={nbPages === page+1 ? "active" : ""}><button onClick={this.props.getPage}>{nbPages}</button></li> : null } </span> : null}
        {firstPage + 5 < nbPages ? <li><button onClick={this.nextGroup}>&gt;&gt;</button></li> : null}
      </ul>
		</div>
	}
}

export default PageNumbers