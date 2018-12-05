import React, {useEffect, useState} from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import {Button, Dropdown, Grid, Input, Segment} from 'semantic-ui-react'

import {statuses, states} from '../../helpers/constants'
import {getCustomers, getEquipmentTypes} from '../../api/request'

import './filter.scss'
import 'react-datepicker/dist/react-datepicker.css'

const DateStart = props => <Input {...props} placeholder="Start" />
const DateEnd = props => (
  <Input {...props} placeholder="End" style={{marginLeft: 5}} />
)

export default ({onApplyFilters}) => {
  const [filters, setFilters] = useState({})
  const [customers, setCustomers] = useState([])
  const [equipmentTypes, setEquipmentTypes] = useState([])

  useEffect(() => {
    setCustomers(getCustomers().map((x, i) => ({key: i, text: x, value: x})))
    setEquipmentTypes(
      getEquipmentTypes().map((x, i) => ({key: i, text: x, value: x})),
    )
  }, [])

  const updateFilters = (filter, value) =>
    setFilters(prevFilters => ({...prevFilters, [filter]: value}))

  const handleClearFilters = () => {
    setFilters({})
    onApplyFilters({})
  }

  return (
    <Segment style={{margin: '30px 0'}}>
      <h4>Filters</h4>

      <Grid>
        <Grid.Row>
          <Grid.Column computer={2} />

          <Grid.Column computer={4} verticalAlign="middle">
            {/* <div className="filter">
              <label>Status</label>

              <Dropdown
                fluid
                multiple
                onChange={(e, data) => updateFilters('statuses', data.value)}
                options={statuses}
                placeholder="Status"
                search
                selection
                value={filters.statuses || []}
              />
            </div> */}

            <div className="filter">
              <label>Types</label>

              <Dropdown
                fluid
                multiple
                onChange={(e, data) =>
                  updateFilters('equipmentTypes', data.value)
                }
                options={equipmentTypes}
                placeholder="Types"
                search
                selection
                value={filters.equipmentTypes || []}
              />
            </div>

            <div className="filter">
              <label>City</label>

              <Input
                fluid
                onChange={(e, data) => updateFilters('city', data.value)}
                placeholder="City"
                value={filters.city || ''}
              />
            </div>

            <div className="filter">
              <label>State</label>

              <Dropdown
                fluid
                multiple
                onChange={(e, data) => updateFilters('state', data.value)}
                options={states}
                placeholder="State"
                search
                selection
                value={filters.state || []}
              />
            </div>

            <div className="filter">
              <label>Zip</label>

              <Input
                fluid
                onChange={(e, data) => updateFilters('zip', data.value)}
                placeholder="Zip"
                value={filters.zip || ''}
              />
            </div>
          </Grid.Column>

          <Grid.Column computer={4} verticalAlign="middle">
            <div className="filter">
              <label>Customer</label>

              <Dropdown
                fluid
                multiple
                onChange={(e, data) => updateFilters('customers', data.value)}
                options={customers}
                placeholder="Customers"
                search
                selection
                value={filters.customers || []}
              />
            </div>

            <div className="filter">
              <label>Manufacturer</label>

              <Input
                fluid
                onChange={(e, data) =>
                  updateFilters('manufacturer', data.value)
                }
                placeholder="Manufacturer"
                value={filters.manufacturer || ''}
              />
            </div>

            <div className="filter">
              <label>Model</label>

              <Input
                fluid
                onChange={(e, data) => updateFilters('model', data.value)}
                placeholder="Model"
                value={filters.model || ''}
              />
            </div>

            <div className="filter">
              <label>Serial</label>

              <Input
                fluid
                onChange={(e, data) => updateFilters('serial', data.value)}
                placeholder="Serial"
                value={filters.serial || ''}
              />
            </div>
          </Grid.Column>

          <Grid.Column computer={6}>
            <div className="filter">
              <label>Install Date</label>

              <DatePicker
                customInput={<DateStart />}
                selected={filters.installDateStart || null}
                selectsStart
                startDate={filters.installDateStart || null}
                endDate={filters.installDateEnd || null}
                onChange={value =>
                  updateFilters('installDateStart', new Date(value))
                }
              />

              <DatePicker
                customInput={<DateEnd />}
                selected={filters.installDateEnd || null}
                selectsEnd
                startDate={filters.installDateEnd || null}
                startDate={filters.installDateStart || null}
                onChange={value =>
                  updateFilters('installDateEnd', new Date(value))
                }
              />
            </div>

            <div className="filter">
              <label>Last Service Date</label>

              <DatePicker
                customInput={<DateStart />}
                selected={filters.lastServiceDateStart || null}
                selectsStart
                startDate={filters.lastServiceDateStart || null}
                endDate={filters.lastServiceDateEnd || null}
                onChange={value =>
                  updateFilters('lastServiceDateStart', new Date(value))
                }
              />

              <DatePicker
                customInput={<DateEnd />}
                selected={filters.lastServiceDateEnd || null}
                selectsEnd
                startDate={filters.lastServiceDateEnd || null}
                startDate={filters.lastServiceDateStart || null}
                onChange={value =>
                  updateFilters('lastServiceDateEnd', new Date(value))
                }
              />
            </div>

            <div className="filter">
              <label>Next Service Due</label>

              <DatePicker
                customInput={<DateStart />}
                selected={filters.nextServiceDueStart || null}
                selectsStart
                startDate={filters.nextServiceDueStart || null}
                endDate={filters.nextServiceDueEnd || null}
                onChange={value =>
                  updateFilters('nextServiceDueStart', new Date(value))
                }
              />

              <DatePicker
                customInput={<DateEnd />}
                selected={filters.nextServiceDueEnd || null}
                selectsEnd
                startDate={filters.nextServiceDueEnd || null}
                startDate={filters.nextServiceDueStart || null}
                onChange={value =>
                  updateFilters('nextServiceDueEnd', new Date(value))
                }
              />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={16} textAlign="right">
            <Button onClick={handleClearFilters}>Clear Filters</Button>

            <Button primary onClick={() => onApplyFilters(filters)}>
              Apply Filters
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
