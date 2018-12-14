import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { Container, Header, Content } from 'native-base'
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'
import LoginSignup from './src/components/LoginSignup/LoginSignup'

const API = process.env.API || 'http://localhost:3000'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      singleView: false,
      token: ''
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


  loginClick = async (loginInfo) => {
    // console.log('LOGIN CLICK', username, password);

    const response = await fetch(`${API}/sign-in`, {
     method: 'POST',
     headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(loginInfo)
    })
    console.log('json: ', response);
    if(response.status === 200) {
    const json = await response.json()
    this.setState({
      ...this.state,
      token: JSON.parse(response._bodyInit).token
    })
    console.log(this.state.token);
    }
  }

  render() {
    console.log("here", this.state)
    return (
      <Container >
        <NavBar />
        <Content>
          {this.state.token ? null : <LoginSignup loginClick={this.loginClick}/>}
          {this.state.singleView ? <SingleCardView card={this.state.singleView} backClick={this.backClick}/> : null}
          {this.state.singleView ? null : <RecipeList recipes={this.state.recipes} cardClick={this.cardClick}/>}
        </Content>


      </Container>

    );
  }
}
