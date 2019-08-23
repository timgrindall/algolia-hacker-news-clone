import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Search from './Search'
import About from './About'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Search}/>
      <Route path="/about" component={About}/> 
    </Router>
  )
}

export default App;