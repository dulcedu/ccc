import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'

// Components
import CardSelector from '../components/CardSelector';
import Title from '../components/Title';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drizzle: props.drizzle,
      drizzleState: props.drizzleState,
      initialized: false,
    }
    // this.componentDidMount = this.componentDidMount.bind(this)
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
    return (
      <div className="pure-g" style={{ backgroundColor:'#f50' }}>        
        <Title/>
        <CardSelector
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
      </div>
    )
  }
  
}

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
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