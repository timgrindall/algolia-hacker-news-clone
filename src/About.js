import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './About.css'
import './App.css'

import Header from './Components/Header.js'

import BottomLinks from './Components/BottomLinks.js'

function About() {
  return (
    <div className="page-wrapper">
      <Header search={false} />
      <h2 className="about-title">About</h2>
      <div className="about-content">
        <p>This app was an excercise in learning ReactJS which is the library I used to build it. It is a working clone/copy of the Algolia Hacker News Search. It uses the Hacker News Search API which allows it to pull in the same data the real site does. You can see the Algolia Hacker News site at <a href="https://hn.algolia.com/">https://hn.algolia.com/</a>. The AHN site pulls data from the <a href="https://news.ycombinator.com/">Y Combinator</a> Hacker News site. This was an excercise suggested by <a href="https://daveceddia.com/react-practice-projects/">Dave Ceddia</a>.
        </p>
        <p>I created all the styles for the app myself and attempted to make them responsive so it is not a verbatim copy of the Algolia Hacker News site. Also, I created the code for the pagination myself and did not use a library. The site was designed with minimal code to get the job done.</p>
        <p>This project took me about two weeks to finish and taught me a lot along the way about React and the ReactJS ecosystem. You can view the code on GitHub at the GitHub link below.</p>
        <p>You can see other projects I have created on <a href="http://wordpress.timothygrindall.com/">my blog</a></p>
      </div>
      <BottomLinks />
    </div>
  )
}

export default About;