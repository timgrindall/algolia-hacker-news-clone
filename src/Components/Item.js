import React, {Component} from 'react'
import './Item.css'


const RawHTML = ({children, className = ""}) => 
<div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />

class Item extends Component {
	constructor(props) {
		super(props);

		this.getDate = this.getDate.bind(this);
	}

	getDate(date) {		// use to convert date object to days, minutes, or seconds, etc.
		const postDate = new Date(date)
		const currentDate = new Date()
		const seconds = (+currentDate/1000) - (+postDate/1000)

		const second = 1
		const minute = 60
		const hour = 3600
		const day = 86400
		const week = 604800
		const month = 2678400
		const year = 31536000

		if (seconds >= year) return (Math.floor(seconds/year)) + " year" + ((seconds/year) > 2 ? "s" : "") + " ago"
		if (seconds >= month) return (Math.floor(seconds/month)) + " month" + ((seconds/month) > 2 ? "s" : "") + " ago"
		if (seconds >= week) return (Math.floor(seconds/week)) + " week" + ((seconds/week) > 2 ? "s" : "") + " ago"
		if (seconds >= day) return (Math.floor(seconds / day)) + " day" + ((seconds/day) > 2 ? "s" : "") + " ago"
		if (seconds >= hour) return (Math.floor(seconds / hour)) + " hour" + ((seconds/hour) > 2 ? "s" : "") + " ago"
		if (seconds >= minute) return (Math.floor(seconds / minute)) + " minute" + ((seconds/minute) > 2 ? "s" : "") + " ago"
		if (seconds >= second) return (Math.floor(seconds / second)) + " second" + ((seconds/second) > 2 ? "s" : "") + " ago"
		else return "less than a second ago"
	}

	render() {
		const data = this.props.data;

		return (
          <div className="item">
            <h2 className="title">
              <a href={data.link}><RawHTML>{data.title}</RawHTML></a>
            </h2>
            <ul className="item-info-list">
              {this.props.comment ? null : 
              	<li className="first-element">
                	<a href={data.link} title="See original post at HN">{data.points} {data.points !== 1 ? "points" : "point"}</a>
              	</li>
          		}
              <li className={this.props.comment ? "first-element" : ""}>
                <a href={"https://news.ycombinator.com/user?id=" + data.user} title={"see " + data.user + " profile"}>{data.user}</a>
              </li>
              <li>
                <a href={data.link} title={data.date}>{this.getDate(data.date)}</a>
              </li>
              <li>
                <a href={data.link} title="See original post at HN">{this.props.comment ? "" : data.comments + " "}{data.comments !== 1 ? "comments" : "comment"}</a>
              </li>
              {this.props.comment || this.props.story_text ? null : <li className="link"><a href={data.link}>({data.link})</a></li>}
            </ul>
            {this.props.story_text !== null ? <div className="comment"><RawHTML>{this.props.story_text}</RawHTML></div> : (this.props.comment ? <div className="comment"><RawHTML>{data.comment_text}</RawHTML></div> : null)}
          </div>
		);
	}
}

export default Item;