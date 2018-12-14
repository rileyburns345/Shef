import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { Container, Header, Content, Drawer, Root, Toast } from 'native-base'
import SideBar from './src/components/SideBar/SideBar'
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'
import LoginSignup from './src/components/LoginSignup/LoginSignup'
import NewRecipe from './src/components/NewRecipe/NewRecipe'

const API = process.env.API || 'http://localhost:3000'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      filteredRecipes: [],
      singleView: false,
      searchVal: 'Popular Recipes',
      newView: false,
      token: ''
    }
  }

  loginClick = async (loginInfo) => {

    console.log('before get call', this.state);
    const response = await fetch(`${API}/sign-in`, {
       method: 'POST',
       headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(loginInfo)
      })
      // console.log('json: ', response);
      if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        token: JSON.parse(response._bodyInit).token
      })
      // console. (this.state.token);
      }
    }

    signUpClick = async (signUpInfo) => {

      console.log('BEFORE SIGNUP', this.state);
      const response = await fetch(`${API}/sign-up`, {
         method: 'POST',
         headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(signUpInfo)
        })
        // console.log('json: ', response);
        if(response.status === 200) {
        const json = await response.json()
        console.log('JJJJJSSSOOOOONNN', json);
        console.log('RESPONSE', response);
        this.setState({
          ...this.state,
          token: JSON.parse(response._bodyInit).token
        })
        console.log('TOKEN', this.state.token);
        }
      }

  async componentDidMount() {
    //get data from the API
    // try {
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()
    this.setState({
      ...this.state,
      recipes: json,
      filteredRecipes: json
    })

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

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open() || this.drawer._root.close()
  };

  filtering(searchString){
    if(searchString !== ""){
      const filteredRecipes = this.state.recipes.filter((recipe)=>(recipe.description.includes(searchString) || recipe.diet.includes(searchString) ||  recipe.instructions.includes(searchString) ||  recipe.recipe_name.includes(searchString) || recipe.ingredients.includes(searchString) || recipe.course.includes(searchString)))
      if(filteredRecipes.length > 0){
        this.setState({
          ...this.state,
          filteredRecipes: filteredRecipes,
          searchVal: `Search: ${searchString}`
        })
      }else{
        this.setState({
          ...this.state,
          filteredRecipes: this.state.recipes,
          searchVal: 'Popular Recipes'
        })
        // add toast or notification of 'no results'
        Toast.show({
          text: 'No Results',
          buttonText: 'Okay'
        })
      }
    }else{
      this.setState({
        ...this.state,
        filteredRecipes: this.state.recipes,
        searchVal: 'Popular Recipes'
      })
      // add toast or notification of 'no results'
      Toast.show({
        text: 'No Results',
        buttonText: 'Okay'
      })
    }
  }


  render() {
    let logger = []
    return (
      <Root>
        <Container >
          <NavBar openDrawer={this.openDrawer}/>
          <Drawer ref={(ref) => { this.drawer = ref; }}
          content={<SideBar filtering={this.filtering.bind(this)} navigator={this.navigator} closeSideBar={this.closeDrawer}/>}
          onClose={() => this.closeDrawer()}>
          <Content>
            {this.state.newView ? <NewRecipe /> : null}
            {this.state.token ? null : <LoginSignup loginClick={this.loginClick} signUpClick={this.signUpClick}/>}
            {this.state.singleView ? <SingleCardView backClick={this.backClick} card={this.state.singleView}/> : null}
            {this.state.singleView || this.state.newView ? null : <RecipeList searchVal={this.state.searchVal} recipes={this.state.filteredRecipes} cardClick={this.cardClick}/>}
          </Content>
          </Drawer>
        </Container>
      </Root>
    );
  }

}
