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
      <Text style={textStyle}> {this.props.searchVal} </Text>
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
