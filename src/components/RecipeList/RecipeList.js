import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { H2, ListItem } from 'native-base'
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
  const styles = {
    textStyle: {
      fontSize: 20,
      color: 'white'
    },
    backgroundStyle: {
      backgroundColor: 'maroon',
      justifyContent: 'space-around',
      padding: 20,
      margin: 15
    }
  }

const { viewStyle, textStyle, backgroundStyle } = styles
  return (
  <View>
    <ListItem style={backgroundStyle}>
      <Text style={textStyle}>{this.props.searchVal}</Text>
    </ListItem>
    <ScrollView style={viewStyle}>
      {this.props.recipes.map((recipe, id) => (
        <Recipe token={this.props.token} newVersion={this.props.newVersion} recipe={recipe} key={id} cardClick={this.props.cardClick}/>
      ))}
    </ScrollView>
  </View>
    )
  }
}

export default RecipeList