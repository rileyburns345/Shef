import React, {Component} from 'react';
import { Text, View} from 'react-native';
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'

const API = process.env.API || 'http://localhost:3000'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      singleView: false
    }
  }

  async componentDidMount() {
    console.log('**********component mounted *********')
    //get data from the API
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()
    this.setState({recipes: json})
    console.log(json)
  }

  cardClick = (clickedRecipe) => {
    this.state.recipes.map(recipe => {
      if (clickedRecipe.id === recipe.id) {
        this.setState({
          ...this.state,
          singleView: recipe
          })
      }
      })
  }

  backClick = () => {
    this.setState({
      ...this.state,
      singleView: false
      })
  }

  render() {
    console.log("here", this.state)
    return (
      <View >
        <NavBar />
        {this.state.singleView ? <SingleCardView card={this.state.singleView} backClick={this.backClick}/> : null}
        {this.state.singleView ? null : <RecipeList recipes={this.state.recipes} cardClick={this.cardClick}/>}
      </View>

    );
  }
}
