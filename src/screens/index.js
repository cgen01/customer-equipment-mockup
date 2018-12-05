import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {Dimmer} from 'semantic-ui-react'

import {getEquipment} from '../api/request'
import {generateRandomNumber, pad} from '../helpers'

import Header from './components/header'
import Filter from './components/filter'
import Table from './components/tableNew'
import Settings from './components/settings'
import QuickView from './components/quickView'
import QuickFilters from './components/quickFilters'

const mainStyles = {
  padding: 50,
}

const newEquipmentObject = {
  id: 0,
  name: '',
  description: '',
  type: 'Gadget',
  customer: 'Tim Taylor',
  contact: '',
  manufacturer: '',
  model: '',
}

export default () => {
  const [equipment, setEquipment] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [quickFilter, setQuickFilter] = useState('all')
  const [filteredEquipment, setFilteredEquipment] = useState(null)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null)

  useEffect(() => {
    setEquipment(getEquipment())
  }, [])

  useEffect(
    () => {
      setSelectedEquipment(
        selectedEquipmentId !== null
          ? selectedEquipmentId === 0
            ? newEquipmentObject
            : equipment.find(x => x.id === selectedEquipmentId)
          : null,
      )
    },
    [selectedEquipmentId],
  )

  const handleSelectEquipment = id => setSelectedEquipmentId(id)

  const handleNewEquipment = () => setSelectedEquipmentId(0)

  const handleCloseEquipment = () => setSelectedEquipmentId(null)

  const handleToggleShowFilters = () => setShowFilters(prevVal => !prevVal)

  const handleUpdateEquipment = updatedEquipment => {
    setEquipment(prevEquipment => {
      if (updatedEquipment.id === 0) {
        return [
          ...prevEquipment,
          {
            ...updatedEquipment,
            id: prevEquipment.length + 1,
            barcodeId: `${pad(
              generateRandomNumber(1, 999999999),
              9,
            )}-${generateRandomNumber(1, 9)}`,
            jobCount: 0,
          },
        ]
      }

      return prevEquipment.map(e => {
        if (e.id === selectedEquipmentId) {
          return updatedEquipment
        }

        return e
      })
    })
    handleCloseEquipment()
  }

  const handleSearchChange = (e, {value}) => {
    setSearchValue(value)
    setFilteredEquipment(
      value
        ? equipment.filter(
            x =>
              x.name.toLowerCase().includes(value.toLowerCase()) ||
              x.barcodeId.toLowerCase().includes(value.toLowerCase()) ||
              x.description.toLowerCase().includes(value.toLowerCase()),
          )
        : null,
    )
  }

  const filterByStatus = (e, status) => {
    if (status === 'none') {
      return e.filter(x => x.nextServiceDue === null)
    }

    if (status === 'past') {
      return e.filter(x => moment().isAfter(x.nextServiceDue))
    }

    if (status === 'upcoming') {
      return e.filter(
        x =>
          moment().isAfter(moment(x.nextServiceDue).subtract(45, 'days')) &&
          moment().isBefore(x.nextServiceDue),
      )
    }

    if (status === 'future') {
      return e.filter(
        x =>
          x.nextServiceDue !== null &&
          moment().isBefore(moment(x.nextServiceDue).subtract(45, 'days')),
      )
    }

    return e
  }

  const getQuickFilterData = () => ({
    all: filterByStatus(equipment, 'all').length,
    future: filterByStatus(equipment, 'future').length,
    none: filterByStatus(equipment, 'none').length,
    past: filterByStatus(equipment, 'past').length,
    upcoming: filterByStatus(equipment, 'upcoming').length,
  })

  const handleQuickFilter = status => {
    setSearchValue('')
    setQuickFilter(status)
    setFilteredEquipment(filterByStatus(equipment, status))
  }

  const handleFilterChange = filters => {
    setQuickFilter('all')
    setFilteredEquipment(
      equipment.filter(x => {
        if (
          (filters.equipmentTypes &&
            filters.equipmentTypes.length > 0 &&
            !filters.equipmentTypes.includes(x.type)) ||
          (filters.customers &&
            filters.customers.length > 0 &&
            !filters.customers.includes(x.customer)) ||
          (filters.manufacturer &&
            filters.manufacturer.length > 0 &&
            !x.manufacturer
              .toLowerCase()
              .includes(filters.manufacturer.toLowerCase())) ||
          (filters.model &&
            filters.model.length > 0 &&
            !x.model.toLowerCase().includes(filters.model.toLowerCase())) ||
          (filters.serial &&
            filters.serial.length > 0 &&
            !x.serial.toLowerCase().includes(filters.serial.toLowerCase())) ||
          (filters.installDateStart &&
            filters.installDateEnd &&
            filters.installDateStart.length > 0 &&
            filters.installDateEnd.length > 0 &&
            !moment(x.installDate).isBetween(
              moment(filters.installDateStart),
              moment(filters.installDateEnd),
            )) ||
          (filters.lastServiceDateStart &&
            filters.lastServiceDateEnd &&
            filters.lastServiceDateStart.length > 0 &&
            filters.lastServiceDateEnd.length > 0 &&
            !moment(x.lastServiceDate).isBetween(
              moment(filters.lastServiceDateStart),
              moment(filters.lastServiceDateEnd),
            )) ||
          (filters.nextServiceDueStart &&
            filters.nextServiceDueEnd &&
            filters.nextServiceDueStart.length > 0 &&
            filters.nextServiceDueEnd.length > 0 &&
            !moment(x.nextServiceDue).isBetween(
              moment(filters.nextServiceDueStart),
              moment(filters.nextServiceDueEnd),
            ))
        ) {
          return false
        }
        return true
      }),
    )
  }

  return (
    <div style={mainStyles}>
      <Dimmer.Dimmable dimmed={!!selectedEquipment}>
        <Header />

        <Settings
          onAdd={handleNewEquipment}
          onSearch={handleSearchChange}
          onToggleFilter={handleToggleShowFilters}
          searchValue={searchValue}
        />

        {showFilters && <Filter onApplyFilters={handleFilterChange} />}

        <QuickFilters
          activeFilter={quickFilter}
          filterData={getQuickFilterData()}
          onApplyQuickFilter={handleQuickFilter}
        />

        <Table
          equipment={filteredEquipment || equipment}
          onSelectEquipment={handleSelectEquipment}
        />

        <Dimmer
          active={!!selectedEquipment}
          className="fade-in"
          onClickOutside={handleCloseEquipment}
          page
        >
          <QuickView
            onClose={handleCloseEquipment}
            onSubmit={handleUpdateEquipment}
            selectedEquipment={selectedEquipment}
          />
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  )
}
