import React, {Component} from 'react';
import { Text, View} from 'react-native';
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'

const API = process.env.API || 'http://localhost:3000'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  async componentWillMount() {
    console.log('**********component mounted *********')
    //get data from the API
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()
    this.setState({recipes: json})
    console.log(json)
  }


  render() {
    console.log("here", this.state.recipes)
    return (
      <View >
        <NavBar />
        <RecipeList recipes={this.state.recipes}/>
      </View>

    );
  }
}
