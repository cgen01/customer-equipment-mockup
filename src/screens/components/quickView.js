import React, {useState, useEffect} from 'react'
import {Button, Dropdown, Form} from 'semantic-ui-react'

import {getCustomers, getEquipmentTypes} from '../../api/request'

import './quickView.scss'

export default ({onClose, onSubmit, selectedEquipment}) => {
  if (!selectedEquipment) return null

  const [equipment, setEquipment] = useState({...selectedEquipment})
  const [customers, setCustomers] = useState([])
  const [equipmentTypes, setEquipmentTypes] = useState([])

  useEffect(() => {
    setCustomers(getCustomers())
    setEquipmentTypes(getEquipmentTypes())
  }, [])

  const handleEditMoreFields = e => {
    e.preventDefault()

    alert('Open ASPX Page.')
  }

  const updateField = (value, field) =>
    setEquipment(prevEquipment => ({...prevEquipment, [field]: value}))

  return (
    <>
      <div className="quick-view animation-in">
        <h2>{selectedEquipment.name || 'New Customer Equipment'}</h2>

        <hr style={{marginBottom: 20}} />

        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              onChange={e => updateField(e.target.value, 'name')}
              placeholder="Name"
              value={equipment.name}
            />
          </Form.Field>

          <Form.Field>
            <label>Customer</label>
            <Dropdown
              fluid
              onChange={(e, data) => updateField(data.value, 'customer')}
              options={customers.map(c => ({text: c, value: c}))}
              selection
              value={equipment.customer}
            />
          </Form.Field>

          <Form.Field>
            <label>Type</label>
            <Dropdown
              fluid
              onChange={(e, data) => updateField(data.value, 'type')}
              options={equipmentTypes.map(e => ({text: e, value: e}))}
              selection
              value={equipment.type}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea
              onChange={e => updateField(e.target.value, 'description')}
              rows={4}
              value={equipment.description}
            />
          </Form.Field>

          <div className="header">Details</div>

          <Form.Field>
            <label>Manufacturer</label>
            <input
              onChange={e => updateField(e.target.value, 'manufacturer')}
              placeholder="Manufacturer"
              value={equipment.manufacturer}
            />
          </Form.Field>

          <Form.Field>
            <label>Model</label>
            <input
              onChange={e => updateField(e.target.value, 'model')}
              placeholder="Model"
              value={equipment.model}
            />
          </Form.Field>

          <Form.Field>
            <label>Serial</label>
            <input
              onChange={e => updateField(e.target.value, 'serial')}
              placeholder="Serial"
              value={equipment.serial}
            />
          </Form.Field>

          {/* <div className="header">Service Dates</div> */}
        </Form>
      </div>

      <div className="quick-view--actions animation-in">
        <hr style={{marginBottom: 15}} />

        <Button floated="left" onClick={onClose}>
          Cancel
        </Button>

        <Button floated="right" onClick={() => onSubmit(equipment)} primary>
          {equipment.id === 0 ? 'Add' : 'Update'}
        </Button>

        <Button basic floated="right" onClick={handleEditMoreFields}>
          Edit more fields
        </Button>
      </div>
    </>
  )
}
