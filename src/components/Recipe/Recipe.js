import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImageGenerator from '../ImageGenerator/ImageGenerator'

const Recipe = ({recipe}) => {
const { viewStyle, textStyle } = styles
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
        title="read more"
        color="green"
        accessibilityLabel="Learn more about this green button"
        />
    </View>
    </View>
  )
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
