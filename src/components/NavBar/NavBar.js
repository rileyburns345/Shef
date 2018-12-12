// import library to help create a component
import React from 'react'
import { Text, View } from 'react-native'


// create a component
const NavBar = (props) => {
  const {textStyle, viewStyle} = styles
  return (
    <View style={viewStyle}>
      <Text style={textStyle}> Shef </Text>
    </View>
  )
}
// EXAMPLE (View Tag): View style and Text stlye

// EXAMPLE (Flexbox)
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

// make component available to other parts of the app
export default NavBar
