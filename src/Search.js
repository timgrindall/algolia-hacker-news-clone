import React, {Component} from 'react';
import './App.css';

import Header from './Components/Header.js'
import Nav from './Components/Nav.js'
import List from './Components/List.js'
import PageNumbers from './Components/PageNumbers.js'
import BottomLinks from './Components/BottomLinks.js'
// import './Results.css';

/* steps to bring in data:
	1. get search filters (from Nav Component)
	2. make fetch request
	3. display results

  Start with static results
*/

const staticResults = [
  {
    title: "Steam Zero-Day Vulnerability Affects over 100M Users",
    points: 1,  // change to number
    user: "lisp",
    date: "a day ago",  // change to date object
    comments: 0, //change to number
    link: "https://www.bleepingcomputer.com/news/security/steam-zero-day-vulnerability-affects-over-100-million-users/"
  },
  {
    title: "Zero-day exploit found in Delta eBMGR industrial and data centre control system",
    points: 6,
    user: "farukx",
    date: "3 days ago",
    comments: 0,
    link: "https://techerati.com/news-hub/zero-day-vulnerability-discovered-in-popular-industrial-and-data-centre-control-system/"
  },
]

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: "story",
      queryType: "search_by_date",
      dateRange: 0,
      numericFilters: false,
      data: {},
      error: null,
      isLoaded: false,
      loadAgain: true,
      query: "",
      comment: false,
      page: 0,
      navInitialState: {
        searchType: "Stories",
        sortOrder: "Date",
        dateRange: "Past Week"
      }
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.getQuery = this.getQuery.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  componentDidMount() {
    this.handleDateRangeChange(this.state.navInitialState.dateRange)
    // console.log(this.state.queryType)
    // const query = this.getQuery();
    // console.log(query)

    /* window.fetch(query)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({data: result, isLoaded: true})
        },
        (error) => {
          this.setState({error: error})
        }
      ) */
  }

  componentDidUpdate() {
    var comment = false;

    if (this.state.loadAgain) {
      if (this.state.tags === "comment") comment = true;
      else comment = false;

      const query = this.getQuery();
      console.log(query)

      window.fetch(query)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({data: result, isLoaded: true, loadAgain: false, comment: comment, page: 0})
        },
        (error) => {
          this.setState({error: error, loadAgain: false, comment: comment})
        }
      )
    }
  }

  getPage(event) {
    console.log(event.target.innerHTML)
    const page = (+event.target.innerHTML)-1
    console.log(typeof(page))
    this.setState({page: page, loadAgain: true})
  }

  getQuery() {
    const searchTerms = this.state.query.split(' ').join('+')  // much better than regex in my opinion!
    const query = "https://hn.algolia.com/api/v1/" + this.state.queryType + "?query=" + searchTerms + "&page=" + this.state.page + "&tags=" + this.state.tags + (this.state.numericFilters ? "&numericFilters=created_at_i>" + this.state.dateRange : "")
    return query
  }

  handleTypeChange(type) {
    console.log(type)
    var tags = "";

    if (type === "Stories") tags = "story";
    else if (type === "Comments") tags = "comment";
    else if (type === "All") tags = "";
    else tags = "";

    this.setState({tags: tags, loadAgain: true})
  }

  handleSortOrderChange(sortBy) {
    // console.log(sortBy)
    // console.log(this.state.queryType)
    var queryType = ""

    if (sortBy === "Date") queryType = "search_by_date"
    else if (sortBy === "Popularity") queryType = "search"
    else queryType = "search"

    this.setState({queryType: queryType, loadAgain: true})
  }

  handleDateRangeChange(dateRange) {
    console.log(dateRange)
    var secondsAgo = 0;
    var seconds = 0;
    var currentDate = new Date();
    var currentSeconds = Math.floor(currentDate / 1000)
    // console.log(currentSeconds)

    var numericFilters = false;

    switch (dateRange) {
      case "All time":
        seconds = 0;
        numericFilters = false;
        break;
      case "Past Year":
        secondsAgo = 31536000
        seconds = currentSeconds - secondsAgo;
        numericFilters = true;
        break;
      case "Past Month":
        secondsAgo = 2678400
        seconds = currentSeconds - secondsAgo;
        numericFilters = true;
        break;
      case "Past Week":
        secondsAgo = 604800
        seconds = currentSeconds - secondsAgo;
        numericFilters = true;
        break;
      case "Last 24h":
        secondsAgo = 86400
        seconds = currentSeconds - secondsAgo;
        numericFilters = true;
        break;
      default:
        // default here
        seconds = 0;
        numericFilters = false;
    }

    this.setState({ dateRange: seconds, numericFilters: numericFilters, loadAgain: true })
    console.log(seconds)
  } 

  handleInputChange(event) {
    // console.log(event.target.value)
    const query = event.target.value
    this.setState({query: query, loadAgain: true})
    event.preventDefault();
  }

  render () {
    if (this.state.isLoaded === false) {
      return (
        <div className="page-wrapper">
          <Header search={true} query={this.state.query} handleInputChange={this.handleInputChange} />
          <Nav handleDateRangeChange={this.handleDateRangeChange} handleSortOrderChange={this.handleSortOrderChange} handleTypeChange={this.handleTypeChange} searchType={this.state.navInitialState.searchType} sortOrder={this.state.navInitialState.sortOrder} dateRange={this.state.navInitialState.dateRange}/>
          <div className="error-message">Loading . . .</div>
        </div>
      );
    } else if (this.state.error != null) {
      return (
        <div className="page-wrapper">
          <Header search={true} query={this.state.query} handleInputChange={this.handleInputChange} />
          <Nav handleDateRangeChange={this.handleDateRangeChange} handleSortOrderChange={this.handleSortOrderChange} handleTypeChange={this.handleTypeChange} searchType={this.state.navInitialState.searchType} sortOrder={this.state.navInitialState.sortOrder} dateRange={this.state.navInitialState.dateRange}/>
          <div className="error-message">Sorry, there was an error loading the request. Please refresh the page to try again.</div>
        </div>
      );
    } else if (this.state.data.hits.length === 0) {
      return (
        <div className="page-wrapper">
          <Header search={true} query={this.state.query} handleInputChange={this.handleInputChange} />
          <Nav handleDateRangeChange={this.handleDateRangeChange} handleSortOrderChange={this.handleSortOrderChange} handleTypeChange={this.handleTypeChange} searchType={this.state.navInitialState.searchType} sortOrder={this.state.navInitialState.sortOrder} dateRange={this.state.navInitialState.dateRange}/>
          <div className="error-message">No results</div>
        </div>
      );
    } else {
      return (
      	<div className="page-wrapper">
    	    <Header search={true} query={this.state.query} handleInputChange={this.handleInputChange} />
    	    <Nav handleDateRangeChange={this.handleDateRangeChange} handleSortOrderChange={this.handleSortOrderChange} handleTypeChange={this.handleTypeChange} searchType={this.state.navInitialState.searchType} sortOrder={this.state.navInitialState.sortOrder} dateRange={this.state.navInitialState.dateRange} processingTime={this.state.data.processingTimeMS} nbHits={this.state.data.nbHits}/>
          <List comment={this.state.comment} highlight={true} data={this.state.data}/>
          <PageNumbers data={this.state.data} getPage={this.getPage}/>
          <BottomLinks />
        </div>
      );
    }
  }
}

export default Search;
