import React, {useEffect} from 'react'
import {Grid} from 'semantic-ui-react'

import {commonSort} from '../../helpers'

import {headersArray, useHeaders} from './table'

import './tableNew.scss'

export default ({equipment, onSelectEquipment}) => {
  const [headers, setSortOrder] = useHeaders(headersArray)
  const sortedColumn = headers.find(x => x.sortOrder !== null)
  const sorting = {
    sortOrder: sortedColumn.sortOrder,
    sortColumn: sortedColumn.key,
  }
  let sortedEquipment = equipment.sort(commonSort(sorting))

  useEffect(
    () => {
      sortedEquipment = equipment.sort(commonSort(sorting))
    },
    [headers, equipment],
  )

  return (
    <>
      <div className="headers">
        <ul>
          {headers.map(h => (
            <li>{h.name}</li>
          ))}
        </ul>
      </div>

      {sortedEquipment.length > 0 ? (
        sortedEquipment.map(e => {
          return (
            <div className="card">
              <Grid>
                <Grid.Row>
                  <Grid.Column computer={1}>
                    <span className="status good" />
                  </Grid.Column>

                  <Grid.Column computer={8}>
                    <span class="title">Name</span>
                    {e.name}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          )
        })
      ) : (
        <div style={{textAlign: 'center'}}>
          <em>No Customer Equipment to Display.</em>
        </div>
      )}
    </>
  )
}
