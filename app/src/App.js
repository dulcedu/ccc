import React, { Component } from 'react'
import { Drizzle, generateStore } from 'drizzle'
import { DrizzleContext } from 'drizzle-react'
import drizzleOptions from './drizzleOptions'
import { Route, NavLink, HashRouter } from "react-router-dom"

// Layouts
import Title from './layouts/components/Title'
import CardViewer from './layouts/home/CardViewer'
import CardCreator from './layouts/home/CardCreator'

// Stylesy
import './css/pure-min.css'
import './css/App.css'

class App extends Component {

  render() {
    var drizzleStore = generateStore(drizzleOptions)
    var drizzle = new Drizzle(drizzleOptions, drizzleStore)
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <Title />
        <HashRouter>
          <div>
            <nav>
              <ul className="header" style={{display: 'inline-block'}}>
                <li><NavLink to="/CardViewer">CardViewer</NavLink></li>
                <li><NavLink to="/CardCreator">CardCreator</NavLink></li>
              </ul>
            </nav>
            <div className="content">
              <Route exact path="/CardViewer" component={CardViewer} />
              <Route path="/CardCreator" component={CardCreator} />
            </div>
          </div>
        </HashRouter>
      </DrizzleContext.Provider>
    )
  }
}

export default App