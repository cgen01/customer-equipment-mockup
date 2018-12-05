import React, {useState, useEffect} from 'react'
import {Dimmer} from 'semantic-ui-react'

import {getEquipment} from '../api/request'
import {generateRandomNumber, pad} from '../helpers'

import Header from './components/header'
import Filter from './components/filter'
import Table from './components/tableNew'
import Settings from './components/settings'
import QuickView from './components/quickView'

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
  const [showFilters, setShowFilters] = useState(true)
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

  const handleSearchChange = (e, {value}) =>
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

  const handleFilterChange = filters => {
    const updatedFilteredEquipment = filteredEquipment || equipment

    if (filters.equipmentTypes && filters.equipmentTypes.length > 0) {
      updatedFilteredEquipment.filter(x =>
        filters.equipmentTypes.includes(x.type),
      )
    }

    if (filters.customers && filters.customers.length > 0) {
      updatedFilteredEquipment.filter(x =>
        filters.customers.includes(x.customer),
      )
    }

    if (filters.manufacturer && filters.manufacturer.length > 0) {
      updatedFilteredEquipment.filter(x =>
        x.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase()),
      )
    }

    setFilteredEquipment(updatedFilteredEquipment)
  }

  return (
    <div style={mainStyles}>
      <Dimmer.Dimmable dimmed={!!selectedEquipment}>
        <Header />

        <Settings
          onAdd={handleNewEquipment}
          onSearch={handleSearchChange}
          onToggleFilter={handleToggleShowFilters}
        />

        {showFilters && <Filter onApplyFilters={handleFilterChange} />}

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
