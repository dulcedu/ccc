import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import _ from 'lodash'

// Components
import { newContextComponents } from "drizzle-react-components";
const { ContractData } = newContextComponents;

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drizzle: props.drizzle,
      drizzleState: props.drizzleState,
      initialized: false,
      address: {
        color: '#000',
        display: 'inline',
        fontSize: '12px',
      },
      balance: {
        color: 'white',
        backgroundColor: '#000',
        borderRadius: '4px',
        boxShadow: 'inset 1px 1px 4px #333',
        fontWeight: 'bold',
        padding: '3px 7px',
      },
      tableRow: {
        backgroundColor: '#eee',
      },
      tableData: {
        width: '50%',
        padding: '2px'
      },
      tokenId: 12345,
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

  changeCard(event) {
    const { value } = event.target
    if (0 <= value && value < 10) {
      this.setState(prevState => {return {
        tokenId: value,
        ...prevState,
      }})
    }
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
              <h1>College Card Collectibles!</h1>
            </div>
          </div>

          <div className="pure-u-1-2">
            
            <div className="container">
              <h2>College Card Collectibles Token Fields</h2>
              <table className="pure-table" style={{ width: "100%" }}>
                <tbody>
                  {
                    _.map([
                      "JerseyNumber",
                      "PassYards",
                      "RushYards",
                      "Touchdowns",
                      "PointsPerGame"],
                      index => (
                        <tr key={index} style={this.state.tableRow}>
                          <td style={this.state.tableData}>{index}</td>
                          <td style={this.state.tableData}>
                            <div>
                              <ContractData
                                drizzle={this.props.drizzle}
                                drizzleState={this.props.drizzleState}
                                contract={"AthleteToken"}
                                method={"JerseyNumber"}
                                methodArgs={[12345]}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="pure-u-1-2">
            {/* <form className="pure-form">
              <fieldset>
                <label htmlFor="selectedCard">
                  <strong>send from: </strong>
                </label>
                <input
                  id="selectedCard"
                  type="number"
                  value={this.state.tokenId}
                  onChange={this.changeCard} />
              </fieldset>
            </form>  */}           
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