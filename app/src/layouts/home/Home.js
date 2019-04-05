import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import _ from 'lodash'
import logo from '../../logo.png'

// Components
import { newContextComponents } from "drizzle-react-components";
const { ContractData } = newContextComponents;

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drizzle: props.drizzle,
      drizzleState: props.drizzleState,
      initialized: false
    }
  }
  
  componentDidMount() {
    var Home = this
    this.unsubscribe = this.props.drizzle.store.subscribe(function () {
      /**
      * It's important to refresh drizzleState by calling this method
      * from drizzle.store, otherwise, even though a change is observed
      * in drizzle.store drizzleState will remain the same.
      */
      var drizzle = Home.state.drizzle
      var drizzleState = drizzle.store.getState() 
      if (drizzleState.drizzleStatus.initialized) {
        Home.setState({
          drizzle: drizzle,
          drizzleState: drizzleState,
          initialized: true
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (_.isEmpty(this.state.drizzleState.accounts)) {
      return (
        <div>
          503 - Service unavailable - Home.js: _.isEmpty(this.state.drizzleState.accounts)
        </div>
      )
    }
    else {
      return (
        <div className="pure-g">
          
          <div className="pure-u-1 header">
            <div className="container">
              <img src={logo} alt="logo"/>
              <p>This is a QA testing application for AthleteToken.</p>
            </div>
          </div>

          <div className="pure-u-1-2">
            <ContractData
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              contract={"AthleteToken"}
              method="passYards"
            />
          </div>

          <div className="pure-u-1-2">
          </div>

          <div className="pure-u-1">            
          </div>
        </div>
      )
    }
  }
  
}

export default () => (
  <DrizzleContext.Consumer>
    {
      drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          return "Loading...";
        }
        return (
          <Home
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        )
      }
    }
  </DrizzleContext.Consumer >
)