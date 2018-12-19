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
        backgroundColor: 'maroon',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 80,
        paddingBottom: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      iconStyle: {
        color: 'white'
      },
      textStyle: {
        fontSize: 40,
        color: 'white',
        fontFamily: Fonts.Cinzel
      }
    }
    const {textStyle, viewStyle, iconStyle} = styles
    return (
      <Header style={viewStyle}>
        <Left>
          {this.props.deck || this.props.singleView || this.props.favoritesView || this.props.loginSignupCheck || this.props.newView
            ? <Button onPress={()=>this.props.back()} transparent>
                <Icon style={iconStyle} name='arrow-back' />
              </Button>
            : <Button onPress={()=>this.props.openDrawer()} transparent>
                <Icon style={iconStyle} name='menu' />
              </Button>
          }
        </Left>
        <Body>
          <Title style={textStyle}> shef </Title>
        </Body>
        <Right>
          {this.props.token && !this.props.singleView && !this.props.deck && !this.props.newView
            ? <Button transparent>
                <Icon style={iconStyle} onPress={()=>this.props.favoritesFilter()} name='ios-heart' />
              </Button>
            : null
          }
          {this.props.token
            ? null
            : <Button onPress={()=>this.props.loginSignup()} transparent>
                <Icon style={iconStyle} name='ios-people' />
              </Button>
          }

        </Right>
      </Header>
    )
  }
}



// make component available to other parts of the app
export default NavBar
