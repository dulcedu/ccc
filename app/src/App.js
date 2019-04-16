import React, { Component } from 'react'
import { Drizzle, generateStore } from 'drizzle'
import { DrizzleContext } from 'drizzle-react'
import drizzleOptions from './drizzleOptions'
import { Route, NavLink, HashRouter } from "react-router-dom";

// Layouts
import Home from './layouts/home/Home'
import Home2 from './layouts/home/Home2'

// Stylesy
import './css/pure-min.css'
import './App.css'

class App extends Component {

  render() {
    var drizzleStore = generateStore(drizzleOptions)
    var drizzle = new Drizzle(drizzleOptions, drizzleStore)
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <HashRouter>
          <div>
            <div>
              <h1 style={{ display: 'inline-block' }}>Menu</h1>
              <ul className="header" style={{display: 'inline-block'}}>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/home2">Home2</NavLink></li>
              </ul>
            </div>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/home2" component={Home2} />
            </div>
          </div>
        </HashRouter>
      </DrizzleContext.Provider>
    )
  }
}

export default App