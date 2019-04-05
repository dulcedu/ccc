import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

// Components
import _ from 'lodash'

import { abi } from '../../contracts/AthleteToken.json'

class ContractView extends Component {

  render() {
    var ContractView = this
    if (_.isEmpty(this.props.drizzleState.accounts)) {
      return (
        <div>
          503 - Service unavailable - ContractView.js: _.isEmpty(this.state.drizzleState.contracts)
        </div>
      )
    }
    else {
      const filteredABI = abi.filter((v) => v.stateMutability === 'view')
      return (
        <table className="pure-table" style={{ width: "100%" }}>
          <tbody>{
            _.range(0,filteredABI.length).map(
              function (index) {
                var method = filteredABI[index]
                const defaultArgs = method.inputs.map((i) => {
                  switch (i.type) {
                    case 'address':
                      return '0xf17f52151ebef6c7334fad080c5704d77216b732';
                    case 'string':
                      return 'whitelist';
                    case 'number':
                      return 37;
                    default:
                      return 37;
                  }
                })
                return (
                  <tr key={index}>
                    <td>
                      <strong>
                        {method.name + ': '}
                      </strong>
                    </td>
                    <td>
                      <ContractData
                        contract={ContractView.props.contract}
                        drizzle={ContractView.props.drizzle}
                        drizzleState={ContractView.props.drizzleState}
                        key={index + index}
                        method={method.name}
                        methodArgs={defaultArgs}
                      />
                    </td>
                  </tr>
                )
              }
            )
          }</tbody>
        </table>
      )
    }
  }
  
}

export default (props) => (
  <DrizzleContext.Consumer>
    {
      drizzleContext => {
        var drizzle = drizzleContext.drizzle
        var drizzleState = drizzle.store.getState()
        return (
          <ContractView
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract={props.contract} />
        )
      }
    }
  </DrizzleContext.Consumer >
)