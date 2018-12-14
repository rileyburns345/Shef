import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, Item, Icon, Input, Button } from "native-base";
export default class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filter: ''
    }
  }

  onInputChange = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
    if(e.target.value === ''){
      this.props.filtering(this.state.filter)
    }
  }

  // add in 'return' check on input
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.props.filtering(this.state.filter)
    }
  }

  handleSubmit(){
    this.props.filtering(this.state.filter)
    this.props.closeSideBar()
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input id='filter' name='filter'
                onChange={this.onInputChange} placeholder="Search" />
                <Icon name="ios-people" />
              </Item>
              <Button onPress={()=>this.handleSubmit()} transparent>
                <Text>Search</Text>
              </Button>
            </ListItem>
            <ListItem itemDivider>
              <Text>Browse by Diet:</Text>
            </ListItem>
            <ListItem>
              <Text>Vegan</Text>
            </ListItem>
            <ListItem>
              <Text>Sugar-free</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Browse by Course:</Text>
            </ListItem>
            <ListItem>
              <Text>Breakfast</Text>
            </ListItem>
            <ListItem>
              <Text>Brunch</Text>
            </ListItem>
            <ListItem>
              <Text>Lunch</Text>
            </ListItem>
            <ListItem>
              <Text>Dinner</Text>
            </ListItem>
            <ListItem>
              <Text>Midnight Snack</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
