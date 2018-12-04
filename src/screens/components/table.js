import React, {useState, useEffect} from 'react'
import {Segment, Table} from 'semantic-ui-react'

import {commonSort} from '../../helpers'

const segmentStyles = {
  padding: 0,
  overflow: 'auto',
}

export const headersArray = [
  {
    key: 'barcodeId',
    name: 'Barcode ID',
    sortOrder: 'ascending',
  },
  {
    key: 'name',
    name: 'Name',
    sortOrder: null,
  },
  {
    key: 'description',
    name: 'Description',
    sortOrder: null,
  },
  {
    key: 'type',
    name: 'Type',
    sortOrder: null,
  },
  {
    key: 'customer',
    name: 'Customer',
    sortOrder: null,
  },
  {
    key: 'contact',
    name: 'Contact',
    sortOrder: null,
  },
  {
    key: 'jobCount',
    name: 'Job Count',
    sortOrder: null,
  },
]

export function useHeaders(initialState) {
  const [headers, setHeaders] = useState(initialState)

  function setSortOrder(headerKey) {
    const newHeaders = headers.map(x =>
      x.key === headerKey
        ? {
            ...x,
            sortOrder: x.sortOrder === 'ascending' ? 'descending' : 'ascending',
          }
        : x.sortOrder !== null
        ? {...x, sortOrder: null}
        : x,
    )

    setHeaders(newHeaders)
  }

  return [headers, setSortOrder]
}

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
    <Segment style={segmentStyles}>
      <Table celled sortable striped style={{border: 0}}>
        <Table.Header>
          <Table.Row>
            {headers.map(x => (
              <Table.HeaderCell
                key={x.key}
                onClick={() => setSortOrder(x.key)}
                sorted={x.sortOrder}
              >
                {x.name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedEquipment.length > 0 ? (
            sortedEquipment.map(e => (
              <Table.Row key={e.id}>
                <Table.Cell>
                  <a href="#" onClick={event => onSelectEquipment(event, e.id)}>
                    {e.barcodeId}
                  </a>
                </Table.Cell>
                <Table.Cell>{e.name}</Table.Cell>
                <Table.Cell>{e.description}</Table.Cell>
                <Table.Cell>{e.type}</Table.Cell>
                <Table.Cell>{e.customer}</Table.Cell>
                <Table.Cell>{e.contact}</Table.Cell>
                <Table.Cell>{e.jobCount}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={7}>
                <em>No Customer Equipment to Display.</em>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Segment>
  )
}
