import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import { newContextComponents } from 'drizzle-react-components';

import DataTable from '../components/DataTable';

import _ from 'lodash'

import ZionWilliamson from '../../img/1.png'
import CamRedish from '../../img/2.png'
import NassirLittle from '../../img/3.png'
import RJBarrett from '../../img/4.png'
import EdwardCarsen from '../../img/5.png'


const { ContractData } = newContextComponents;

class CardSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drizzle: props.drizzle,
      drizzleState: props.drizzleState,
      initialized: false,
      tokenId: 0,
    }
    this.accounts = this.state.drizzleState.accounts
    this.images = [
      ZionWilliamson,
      ZionWilliamson,
      ZionWilliamson,
      CamRedish,
      CamRedish,
      CamRedish,
      NassirLittle,
      NassirLittle,
      NassirLittle,
      RJBarrett,
      RJBarrett,
      RJBarrett,
      // EdwardCarsen,
      // EdwardCarsen,
      // EdwardCarsen,
    ]
    this.componentDidMount = this.componentDidMount.bind(this)
    this.changeCard = this.changeCard.bind(this)
  }

  componentDidMount() {
    var CardSelector = this
    this.unsubscribe = this.props.drizzle.store.subscribe(function () {
      /**
      * It's important to refresh drizzleState by calling this method
      * from drizzle.store, otherwise, even though a change is observed
      * in drizzle.store drizzleState will remain the same.
     */
      var drizzle = CardSelector.state.drizzle
      var drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        CardSelector.setState((state, prevState) => {
          return {
            drizzle: drizzle,
            drizzleState: drizzleState,
            initialized: true,
            ...prevState
          }
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  changeCard(event) {
    const { value } = event.target
    this.setState((state, prevState) => {
      return {
        tokenId: value,
        ...prevState,
      }
    })
  }

  render() {
    return (
      <div className="pure-g" style={{ backgroundColor: '#f50' }}>
        <div className='pure-u-1'>
          
          <div className='pure-u-1-2'>
            <div className='container'>

              <h2>Visualize Fair Share eCard by ID</h2>

              <form
                className='pure-form'
                style={{ width: '100%' }}
              >
                <fieldset>
                  <label htmlFor='selectedCard'>
                    <strong>Select card by ID: </strong>
                  </label>

                  <input
                    id='selectedCard'
                    type='number'
                    value={this.state.tokenId}
                    onChange={this.changeCard}
                  />
                  <br />
                </fieldset>
              </form>

              <DataTable
                tokenId={this.state.tokenId}
              />

            </div>
          </div>

          <div className='pure-u-1-2'>
            <div className='container'>
              <div>
                {/* <ContractData
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
                  contract={'AthleteToken'}
                  method={'playerName'}
                  methodArgs={[this.state.tokenId]}
                  value={this.state.playerName}
                /> */}
              </div>
              <div>
                <img
                  src={this.images[this.state.tokenId]}
                  alt={this.state.tokenId}
                  style={{ width: '100%' }}
                />
              </div>
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
        return 'Loading...';
      }
      return (
        <CardSelector
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      )
    }}
  </DrizzleContext.Consumer>
)