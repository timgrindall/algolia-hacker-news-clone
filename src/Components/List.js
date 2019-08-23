import React, {Component} from 'react'
import './List.css'

import Item from './Item.js'

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const hits = this.props.data.hits

		const items = hits.map((itemData) => {
			return <Item key={itemData.objectID} data={{title: (itemData._tags[0] == "comment" ? (this.props.highlight ? itemData._highlightResult.story_title.value : itemData.story_title) : (this.props.highlight ? itemData._highlightResult.title.value : itemData.title)), points: itemData.points, comments: itemData.num_comments, user: itemData.author, date: itemData.created_at, link: ( this.props.comment ? itemData.story_url : itemData.url ), comment_text: itemData.comment_text}} story_text={itemData._highlightResult.story_text ? itemData._highlightResult.story_text.value : null} comment={itemData._tags[0] == "story" ? false : true}/>
		})

		return (
			<div className="results-wrapper">
				{items}
			</div>
		);
	}
}

export default List;