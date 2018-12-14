import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { Container, Header, Content, Drawer, Root, Toast } from 'native-base'
import SideBar from './src/components/SideBar/SideBar'
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
      filteredRecipes: [],
      singleView: false,
      searchVal: 'Popular Recipes',
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
      // console.log(this.state.token);
      }
    }

  async componentDidMount() {
    //get data from the API
    console.log('*&%*$&$&(*(&%764746');
    // try {
    const response = await fetch(`${API}/recipes`)
    console.log('response', response);
    const json = await response.json()
    console.log('JSON', json);

    console.log('parsedJson', parsedJson);
    // }
    //   catch(err) {
    //     console.log('========', err);
    //   }


    this.setState({
      ...this.state,
      recipes: json,
      filteredRecipes: json
    })
    console.log('AFTER GET CALL', this.state);
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
    console.log('IN FILTER', this.state);
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
    console.log("here", this.state)
    let logger = []
    return (
      <Root>
        <Container >
          <NavBar openDrawer={this.openDrawer}/>
          <Drawer ref={(ref) => { this.drawer = ref; }}
          content={<SideBar filtering={this.filtering.bind(this)} navigator={this.navigator} closeSideBar={this.closeDrawer}/>}
          onClose={() => this.closeDrawer()}>
          <Content>
            {this.state.token ? null : <LoginSignup loginClick={this.loginClick}/>}
            {this.state.singleView ? <SingleCardView backClick={this.backClick} card={this.state.singleView}/> : null}
            {this.state.singleView ? null : <RecipeList searchVal={this.state.searchVal} recipes={this.state.filteredRecipes} cardClick={this.cardClick}/>}
          </Content>
          </Drawer>
        </Container>
      </Root>
    );
  }

}
