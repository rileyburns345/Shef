import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, Item, Icon, Input, Button, Footer } from "native-base";
export default class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      diets: ['Dairy-free', 'Egg-free', 'Gluten-free', 'Nut-free', 'Soy-free', 'Sugar-free', 'Vegetarian'],
      courses: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert'],
      filter: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      ...this.state,
      filter: e
    })
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

  handleCategory(category){
    this.props.filtering(category)
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
                onChangeText={this.onInputChange} placeholder="Search" />
              </Item>
              <Button onPress={()=>this.handleSubmit()} transparent>
                <Text>Search</Text>
              </Button>
            </ListItem>
            <ListItem itemDivider>
              <Text>Browse by Diet:</Text>
            </ListItem>
            {this.state.diets.map((diet)=>(
              <ListItem onPress={()=>this.handleCategory(diet.toLowerCase())}>
                <Text>{diet}</Text>
              </ListItem>
            ))}
            <ListItem itemDivider>
              <Text>Browse by Course:</Text>
            </ListItem>
            {this.state.courses.map((course)=>(
              <ListItem onPress={()=>this.handleCategory(course.toLowerCase())}>
                <Text>{course}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
        {this.props.token
          ? <Footer>
              <Button transparent>
                <Text>
                  Logout
                </Text>
              </Button>
            </Footer>
          : null
        }
      </Container>
    );
  }
}
