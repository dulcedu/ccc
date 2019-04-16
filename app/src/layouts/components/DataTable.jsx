import React, { Component } from 'react'
import { DrizzleContext } from 'drizzle-react'
import { newContextComponents } from 'drizzle-react-components';

import _ from 'lodash'

const { ContractData } = newContextComponents;

class DataTable extends Component {
  constructor(props) {
    super(props)
    this.style = {
      table: {
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
      },
      tableRow: {
        background: '#000',
        color: '#fff',
        padding: '2px',
        fontWeight: 'bold',
      },
      tableData: {
        _1st: { width: '80%' },
        _2nd: { width: '50%' },
      },
      tableHeader: {
        background: '#777'
      },
    }
  }

  render() {
    return (
      <div>
        <table
          className='pure-table'
          style={this.style.table}
        >
          <tbody>
            <tr style={this.style.tableRow}>
              <th style={this.style.tableHeader}>
                <div>Field</div>
              </th>
              <th style={this.style.tableHeader}>
                <div>Value</div>
              </th>
            </tr>
              {_.map(
                [
                  'playerName',
                  'birthPlace',
                  'birthDate',
                  'heightCm',
                  'weightKg',
                  'college'
                ],
                element => {
                  console.log(element)
                  return (
                    <tr key={element} style={this.style.tableRow}>
                      <td style={this.style.tableData}>{element}</td>
                      <td style={this.style.tableData._2nd}>
                        <div>
                          <ContractData
                            drizzle={this.props.drizzle}
                            drizzleState={this.props.drizzleState}
                            contract={'AthleteToken'}
                            method={element}
                            methodArgs={[
                              this.props.tokenId
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                }
              )}
          </tbody>

        </table>
        <br />
        
        <table
          className='pure-table'
          style={this.style.table}
        >
          <tbody>
            <tr style={this.style.tableRow}>
              <th style={this.style.tableHeader}>
                <div>Field</div>
              </th>
              <th style={this.style.tableHeader}>
                <div>Value</div>
              </th>
            </tr>
            {_.range(11)
              .map(
                index => {
                  let stats = [
                    'gamesPlayed',
                    'gamesStarted',
                    'minutesPerGame',
                    'fieldGoalPercentage',
                    'threPointFieldGoalPercentage',
                    'freeThrowPercentage',
                    'reboundsPerGame',
                    'assistsPerGame',
                    'stealsPerGame',
                    'blocksPerGame',
                    'pointsPerGame'
                  ]
                  return (
                    <tr key={index} style={this.style.tableRow}>
                      <td style={this.style.tableData._1st}>{stats[index]}</td>
                      <td style={this.style.tableData._2nd}>
                        <div>
                          <ContractData
                            drizzle={this.props.drizzle}
                            drizzleState={this.props.drizzleState}
                            contract={'AthleteToken'}
                            method={'basketballStats'}
                            methodArgs={[
                              this.props.tokenId,
                              index
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                }
              )
            }
          </tbody>

        </table>
      </div>
    )
  }
}

export default (props) => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      if (!initialized) {
        return 'Loading...';
      }
      return (
        <DataTable
          drizzle={drizzle}
          drizzleState={drizzleState}
          tokenId={props.tokenId}
        />
      )
    }}
  </DrizzleContext.Consumer>
)
