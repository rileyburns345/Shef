// import library to help create a component
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

// create a component
class NavBar extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render(){
    const styles = {
      viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 90,
        paddingBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2,  },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      textStyle: {
        fontSize: 20
      }
    }
    const {textStyle, viewStyle} = styles

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.props.openDrawer()} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={textStyle}> Shef </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='profile' />
            </Button>
          </Right>
        </Header>
      </Container>
    )
  }
}



// make component available to other parts of the app
export default NavBar
