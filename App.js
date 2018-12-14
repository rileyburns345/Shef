import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { Container, Header, Content, Drawer } from 'native-base'
import SideBar from './src/components/SideBar/SideBar'
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'

const API = process.env.API || 'http://localhost:3000'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      filteredRecipes: [],
      singleView: false,
      searchVal: 'Popular Recipes'
    }
  }

  async componentDidMount() {
    console.log('**********component mounted *********')
    //get data from the API
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()


    this.setState({
      ...this.state,
      recipes: json,
      filteredRecipes: json
    })
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
      }
    }else{
      this.setState({
        ...this.state,
        filteredRecipes: this.state.recipes,
        searchVal: 'Popular Recipes'
      })
      // add toast or notification of 'no results'
    }
  }

  render() {
    console.log("here", this.state)
    return (
      <Container >
        <NavBar openDrawer={this.openDrawer}/>
        <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<SideBar filtering={this.filtering.bind(this)} navigator={this.navigator} closeSideBar={this.closeDrawer}/>}
        onClose={() => this.closeDrawer()}>
        <Content>
          {this.state.singleView ? <SingleCardView backClick={this.backClick} card={this.state.singleView}/> : null}
          {this.state.singleView ? null : <RecipeList searchVal={this.state.searchVal} recipes={this.state.filteredRecipes} cardClick={this.cardClick}/>}
        </Content>
        </Drawer>
      </Container>

    );
  }
}
