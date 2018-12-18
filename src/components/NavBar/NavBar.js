// import library to help create a component
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

import { Fonts } from '../../utils/Fonts' 

// create a component
class NavBar extends Component {
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
        position: 'relative',
      },
      textStyle: {
        fontSize: 20,
        fontFamily: Fonts.Cinzel
      }
    }
    const {textStyle, viewStyle} = styles
    return (
      <Header>
        <Left>
          {this.props.deck || this.props.singleView || this.props.favoritesView || this.props.loginSignupCheck
            ? <Button onPress={()=>this.props.back()} transparent>
                <Icon name='arrow-back' />
              </Button>
            : <Button onPress={()=>this.props.openDrawer()} transparent>
                <Icon name='menu' />
              </Button>
          }
        </Left>
        <Body>
          <Title style={textStyle}> Shef </Title>
        </Body>
        <Right>
          {this.props.token
            ? <Button transparent>
                <Icon onPress={()=>this.props.favoritesFilter()} name='star' />
              </Button>
            : <Button onPress={()=>this.props.loginSignup()} transparent>
                <Icon name='ios-people' />
              </Button>
          }

        </Right>
      </Header>
    )
  }
}



// make component available to other parts of the app
export default NavBar
