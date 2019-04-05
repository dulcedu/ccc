import React, { Component } from 'react'
import { Drizzle, generateStore } from 'drizzle'
import { DrizzleContext } from 'drizzle-react'
import drizzleOptions from './drizzleOptions'

// Layouts
import Home from './layouts/home/Home'

// Stylesy
import './App.css'

class App extends Component {

  render() {
    var drizzleStore = generateStore(drizzleOptions)
    var drizzle = new Drizzle(drizzleOptions, drizzleStore)
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <Home />
      </DrizzleContext.Provider>
    )
  }
}

export default App