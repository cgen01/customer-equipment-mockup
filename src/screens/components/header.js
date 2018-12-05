import React from 'react'
import {Button, Grid} from 'semantic-ui-react'

import './header.scss'

export default ({onAdd}) => (
  <div className="main-header">
    <Grid>
      <Grid.Row>
        <Grid.Column computer={10}>
          <h1>Customer Equipment</h1>
        </Grid.Column>

        <Grid.Column computer={6} textAlign="right">
          <Button
            onClick={onAdd}
            primary
            style={{marginRight: 15, marginLeft: 8}}
          >
            <i className="zmdi zmdi-plus" />
            &nbsp; Add
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
