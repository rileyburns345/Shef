import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Recipe from '../Recipe/Recipe'

class RecipeList extends Component {

  renderRecipes() {
    console.log(this.props);
      return this.props.recipes.map((recipe, id) => (
        <Recipe recipe={recipe} key={id}/>
      ))
    }

render() {
const { viewStyle, textStyle } = styles
  return (
  <View>
    <View>
      <Text style={textStyle}> Popular Recipes </Text>
    </View>
    <ScrollView style={viewStyle}>
      {this.renderRecipes()}
    </ScrollView>
  </View>
    )
  }
}

const styles = {
  textStyle: {
    fontSize: 40,
    alignItems: 'center'
  }
}

export default RecipeList
