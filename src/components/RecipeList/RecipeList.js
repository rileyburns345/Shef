import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Recipe from '../Recipe/Recipe'

class RecipeList extends Component {
  constructor(props) {
    super(props)
  }

  renderRecipes() {
    console.log('this.props; ',this.props);
    // this.props.cardClick()
    // return (<Text>blah</Text>)
      return this.props.recipes.map((recipe, id) => (
        <Recipe recipe={recipe} key={id} cardClick={this.props.cardClick}/>
      ))
    }

render() {
const { viewStyle, textStyle } = styles
  return (
  <View>
    <View>
      <Text> {this.props.searchVal} </Text>
    </View>
    <ScrollView style={viewStyle}>
      {this.props.recipes.map((recipe, id) => (
        <Recipe token={this.props.token} newVersion={this.props.newVersion} recipe={recipe} key={id} cardClick={this.props.cardClick}/>
      ))}
    </ScrollView>
  </View>
    )
  }
}

const styles = {
  textStyle: {
    fontSize: 25,
    alignItems: 'center'
  }
}

export default RecipeList
