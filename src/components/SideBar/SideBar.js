import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, Item, Icon, Input, Button } from "native-base";
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
                <Icon name="ios-people" />
              </Item>
              <Button transparent>
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
