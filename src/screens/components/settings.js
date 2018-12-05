import React, {useState} from 'react'
import {
  Grid,
  Responsive,
  Dropdown,
  Input,
  Form,
  Button,
  Checkbox,
} from 'semantic-ui-react'

export default ({onSearch, onToggleFilter, searchValue}) => {
  const [onMobile, setOnMobile] = useState(false)
  const [searchCustomFields, setSearchCustomFields] = useState(false)

  const clickDropdownItem = e => {
    e.preventDefault()

    console.log('dropdown item clicked')
  }

  return (
    <Responsive
      fireOnMount
      onUpdate={(e, {width}) =>
        setOnMobile(width <= Responsive.onlyMobile.maxWidth)
      }
    >
      <Grid>
        <Grid.Column computer={6} floated="left" mobile={16} tablet={6}>
          <Button fluid={onMobile} onClick={onToggleFilter}>
            <i className="zmdi zmdi-filter-list" />
            &nbsp; Filter
          </Button>
        </Grid.Column>

        <Grid.Column
          computer={10}
          mobile={16}
          style={{textAlign: 'right'}}
          tablet={10}
          width={10}
        >
          <Input
            action={
              <Dropdown
                button
                basic
                floating
                trigger={
                  <span>
                    <i className="zmdi zmdi-settings" />
                  </span>
                }
              >
                <Dropdown.Menu direction="left">
                  <Dropdown.Item>
                    <Checkbox
                      checked={searchCustomFields}
                      label="Search Custom Fields"
                      onChange={() =>
                        setSearchCustomFields({searchCustomFields})
                      }
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
            fluid={onMobile}
            icon="search"
            iconPosition="left"
            onChange={onSearch}
            placeholder="Search..."
            style={{marginRight: 15}}
            value={searchValue}
          />

          <Dropdown
            button
            fluid={onMobile}
            style={{marginTop: onMobile ? 20 : 0}}
            trigger={
              <span>
                <i className="zmdi zmdi-more" />
                &nbsp; Options
              </span>
            }
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Item>
                <a href="#" onClick={clickDropdownItem}>
                  Download CSV
                </a>
              </Dropdown.Item>

              <Dropdown.Item>
                <a href="#" onClick={clickDropdownItem}>
                  Settings
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
    </Responsive>
  )
}
