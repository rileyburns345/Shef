import React, { Component } from 'react';
import { List, ListItem, Text, Separator } from 'native-base';

class SideBarNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseSubMenu: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert'],
      dietSubMenu: ['Dairy-free', 'Egg-free', 'Gluten-free', 'Nut-free', 'Soy-free', 'Sugar-free', 'Vegan']
    }
  }
  render(){
    return(
      <List>
        <Separator bordered>
          <Text>Browse By Course:</Text>
        </Separator>
        {this.state.courseSubMenu.map((item)=>(
          <ListItem>
            <Text>{item}</Text>
          </ListItem>
        ))}
        <Separator bordered>
          <Text>Browse By Diet:</Text>
        </Separator>
        {this.state.dietSubMenu.map((item)=>(
          <ListItem>
            <Text>{item}</Text>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default SideBarNav
