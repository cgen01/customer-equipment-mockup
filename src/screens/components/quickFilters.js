import React from 'react'
import {Label, Menu} from 'semantic-ui-react'

export default ({activeFilter, filterData, onApplyQuickFilter}) => (
  <div style={{backgroundColor: '#fff'}}>
    <Menu pointing secondary>
      <Menu.Item
        active={activeFilter === 'all'}
        onClick={() => onApplyQuickFilter('all')}
      >
        All<Label color="blue">{filterData.all}</Label>
      </Menu.Item>

      <Menu.Item
        active={activeFilter === 'past'}
        onClick={() => onApplyQuickFilter('past')}
      >
        Past<Label color="red">{filterData.past}</Label>
      </Menu.Item>

      <Menu.Item
        active={activeFilter === 'upcoming'}
        onClick={() => onApplyQuickFilter('upcoming')}
      >
        Upcoming<Label color="yellow">{filterData.upcoming}</Label>
      </Menu.Item>

      <Menu.Item
        active={activeFilter === 'future'}
        onClick={() => onApplyQuickFilter('future')}
      >
        Future<Label color="green">{filterData.future}</Label>
      </Menu.Item>

      <Menu.Item
        active={activeFilter === 'none'}
        onClick={() => onApplyQuickFilter('none')}
      >
        None<Label>{filterData.none}</Label>
      </Menu.Item>
    </Menu>
  </div>
)
