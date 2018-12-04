import React, {useEffect} from 'react'
import moment from 'moment'
import {Grid, Popup} from 'semantic-ui-react'

import {commonSort} from '../../helpers'

import {headersArray, useHeaders} from './table'

import './tableNew.scss'

const StatusIcon = ({date, ...rest}) => {
  const status =
    moment().isAfter(moment(date).subtract(45, 'days')) &&
    moment().isBefore(date)
      ? 'coming'
      : moment().isAfter(date)
      ? 'past'
      : 'good'

  return <span className={`status ${status}`} />
}

const HeaderSpan = ({title, ...rest}) => (
  <div className="header" {...rest}>
    {title}
  </div>
)

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
        <Grid>
          <Grid.Row>
            <Grid.Column computer={1}>
              <HeaderSpan title="Status" style={{textAlign: 'center'}} />
            </Grid.Column>

            <Grid.Column computer={2}>
              <HeaderSpan title="Type" />
            </Grid.Column>

            <Grid.Column computer={5}>
              <HeaderSpan title="Name / Description" />
            </Grid.Column>

            <Grid.Column computer={2}>
              <HeaderSpan title="Details" />
            </Grid.Column>

            <Grid.Column computer={2}>
              <HeaderSpan title="Customer / Contact" />
            </Grid.Column>

            <Grid.Column computer={2}>
              <HeaderSpan title="Address" />
            </Grid.Column>

            <Grid.Column computer={2} textAlign="right">
              <HeaderSpan title="Service Dates" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {sortedEquipment.length > 0 ? (
        sortedEquipment.map(e => (
          <div className="card">
            <Grid>
              <Grid.Row>
                <Grid.Column
                  computer={1}
                  textAlign="center"
                  verticalAlign="middle"
                >
                  <StatusIcon date={e.nextServiceDue} />
                </Grid.Column>

                <Grid.Column computer={2} verticalAlign="middle">
                  {e.type}
                </Grid.Column>

                <Grid.Column
                  computer={5}
                  onClick={() => onSelectEquipment(e.id)}
                >
                  <div>
                    <span className="title">Name</span>
                    <span className="clickable">{e.name}</span>
                  </div>

                  <div>
                    <span className="title">Description</span>
                    {e.description}
                  </div>
                </Grid.Column>

                <Grid.Column computer={2}>
                  <div>
                    <span className="title">Manufacturer</span>
                    {e.manufacturer}
                  </div>

                  <div>
                    <span className="title">Model</span>
                    {e.model}
                  </div>

                  <div>
                    <span className="title">Serial</span>
                    {e.serial}
                  </div>
                </Grid.Column>

                <Grid.Column computer={2}>
                  <div>
                    <span className="title">Customer</span>
                    {e.customer}
                  </div>

                  <div>
                    <span className="title">Contact</span>
                    {e.contact}
                  </div>
                </Grid.Column>

                <Grid.Column computer={2} verticalAlign="middle">
                  {e.serviceLocation}
                </Grid.Column>

                <Grid.Column computer={2} textAlign="right">
                  <div>
                    <span className="title">Install Date</span>
                    {moment(e.installDate).format('MM/DD/YYYY')}
                  </div>

                  <div>
                    <span className="title">Last Service Date</span>
                    {moment(e.lastServiceDate).format('MM/DD/YYYY')}
                  </div>

                  <div>
                    <span className="title">Next Service Due</span>
                    {moment(e.nextServiceDue).format('MM/DD/YYYY')}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ))
      ) : (
        <div style={{textAlign: 'center'}}>
          <em>No Customer Equipment to Display.</em>
        </div>
      )}
    </>
  )
}
