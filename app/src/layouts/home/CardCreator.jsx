import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import { newContextComponents } from 'drizzle-react-components';

const { ContractForm } = newContextComponents;

class CardCreator extends Component {

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
    var CardCreator = this
    this.unsubscribe = this.props.drizzle.store.subscribe(function () {
      /**
      * It's important to refresh drizzleState by calling this method
      * from drizzle.store, otherwise, even though a change is observed
      * in drizzle.store drizzleState will remain the same.
      */
      var drizzle = CardCreator.state.drizzle
      var drizzleState = drizzle.store.getState() 
      if (drizzleState.drizzleStatus.initialized) {
        CardCreator.setState({
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
      <div className="pure-g" style={{ backgroundColor: '#f50' }}>
        <div className='pure-u-1'>
          <div className='pure-u-1-2'>
            <div className='container'>

              <h2>College Card Collectibles Token Fields</h2>

              <form
                className='pure-form'
                style={{ width: '100%' }}
              >
                <fieldset>
                  <label htmlFor='sendFrom'>
                    <strong>Please use Metamask to select the account to send from: </strong>
                  </label>
                  <input
                    id='sendFrom'
                    type='text'
                    value={this.state.drizzleState.accounts[0]}
                    readOnly
                  />
                  <br />
                </fieldset>
              </form>

              <ContractForm
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                contract='CollectiblesCrowdsale'
                method='buyTokens'
              />
            </div>
          </div>
        </div>        
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
          <CardCreator
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        )
      }
    }
  </DrizzleContext.Consumer >
)