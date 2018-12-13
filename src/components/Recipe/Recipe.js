import React, { Component } from 'react'
import { View, Text, Image, Button, Alert } from 'react-native'
import ImageGenerator from '../ImageGenerator/ImageGenerator'

class Recipe extends Component {
  constructor(props) {
  super(props)
}

_onPressButton() {
    Alert.alert('You tapped the button!')
  }

render() {
const { viewStyle, textStyle } = styles
const { recipe } = this.props
  return (
    <View>
    <View>
      <Text style={textStyle}>
      {recipe.recipe_name}
      </Text>
    </View>
    <View style={viewStyle}>
      <ImageGenerator recipe={recipe}/>
      <Button
        onPress={this._onPressButton}
        title="read more"
        color="green"
        accessibilityLabel="Learn more about this green button"
        />
    </View>
    </View>
  )

  }
}

const styles = {
  viewStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
}

export default Recipe
