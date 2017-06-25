import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuComponent extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu inverted>
          <Menu.Item name='home' href="/" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='create_contact' href="/create" active={activeItem === 'create_contact'} onClick={this.handleItemClick} />
        </Menu>
    )
  }
}