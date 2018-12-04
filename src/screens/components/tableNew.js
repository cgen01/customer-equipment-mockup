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

  const HeaderSpan = ({title, ...rest}) => (
    <div className="header" {...rest}>
      {title}
    </div>
  )

  return (
    <>
      <div className="headers">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={1}>
              <HeaderSpan title="Status" style={{textAlign: 'center'}} />
            </Grid.Column>

            <Grid.Column computer={4}>
              <HeaderSpan title="Name / Description" />
            </Grid.Column>

            <Grid.Column computer={3}>
              <HeaderSpan title="Barcode ID" />
            </Grid.Column>

            <Grid.Column computer={3}>
              <HeaderSpan title="Type" />
            </Grid.Column>

            <Grid.Column computer={3}>
              <HeaderSpan title="Customer / Contact" />
            </Grid.Column>

            <Grid.Column computer={1}>
              <HeaderSpan title="Job Count" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {sortedEquipment.length > 0 ? (
        sortedEquipment.map(e => {
          return (
            <div className="card">
              <Grid>
                <Grid.Row style={{paddingBottom: 0}}>
                  <Grid.Column
                    computer={1}
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <span className="status good" />
                  </Grid.Column>

                  <Grid.Column computer={4} verticalAlign="middle">
                    <div>{e.name}</div>
                    <div>{e.description}</div>
                  </Grid.Column>

                  <Grid.Column
                    className="clickable"
                    computer={3}
                    onClick={() => onSelectEquipment(e.id)}
                    verticalAlign="middle"
                  >
                    {e.barcodeId}
                  </Grid.Column>

                  <Grid.Column computer={3} verticalAlign="middle">
                    {e.type}
                  </Grid.Column>

                  <Grid.Column computer={3} verticalAlign="middle">
                    <div>{e.customer}</div>
                    <div>{e.contact}</div>
                  </Grid.Column>

                  <Grid.Column
                    computer={1}
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    {e.jobCount}
                  </Grid.Column>

                  <Grid.Column
                    className="clickable"
                    computer={1}
                    onClick={() => onSelectEquipment(e.id)}
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <i className="zmdi zmdi-chevron-right open-icon" />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={12}>
                    <div className="show-more">
                      <i className={`zmdi zmdi-chevron-right`} />
                      &nbsp; Show More
                    </div>
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
