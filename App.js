import React, {Component} from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Drawer, Root, Toast, Footer, Button, Text, Icon, Left, Right } from 'native-base'
import SideBar from './src/components/SideBar/SideBar'
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'
import LoginSignup from './src/components/LoginSignup/LoginSignup'
import NewRecipe from './src/components/NewRecipe/NewRecipe'
import NewVersion from './src/components/NewVersion/NewVersion'

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
      token: false,
      loginSignup: false,
      newVersion: false,
      versionFilter: []
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
      if(response.status === 200) {
      const json = await response.json()
      this.setState({
        ...this.state,
        token: json.id,
        loginSignup: false
      })
      console.log(this.state.token);
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
          token: json.id,
          loginSignup: false
        })
        console.log('TOKEN', this.state.token);
        }
      }

  async componentDidMount() {
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()
    const filtered = this.versionControlFilter(json)
    this.setState({
      ...this.state,
      recipes: json,
      filteredRecipes: filtered,
      versionFilter: filtered
    })
  }

  versionControlFilter(data){
    // sort by date
    const sortedByDate = data.sort((a, b)=> new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    // filter by unique recipe_name
    const unique = []
    const map = new Map();
    for (const item of sortedByDate) {
        if(!map.has(item.recipe_name)){
            map.set(item.recipe_name, true);    // set any value to Map
            unique.push(item);
        }
    }
    // sort by id to retain order
    const newState = unique.sort((a, b)=> a.id-b.id)

    return newState
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
          filteredRecipes: this.state.versionFilter,
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
        filteredRecipes: this.state.versionFilter,
        searchVal: 'Popular Recipes'
      })
      // add toast or notification of 'no results'
      Toast.show({
        text: 'No Results',
        buttonText: 'Okay'
      })
    }
  }

  newRecipe(recipe){
    // TIES INTO STATE WHEN LOGGED IN
    recipe.user_id = this.state.token
    console.log(recipe);
    this.postAPI(recipe)
  }

  newRecipeOpen(){
    this.setState({
      ...this.state,
      newView: true
    })
  }

  loginSignup(){
    if(this.state.loginSignup){
      this.setState({
        ...this.state,
        loginSignup: false
      })
    }
    if(!this.state.loginSignup){
      this.setState({
        ...this.state,
        loginSignup: true
      })
    }

  }

  dismissNewView(){
    this.setState({
      ...this.state,
      newView: false
    })
  }

  newVersion(recipe){
    this.setState({
      ...this.state,
      newVersion: recipe
    })
  }

  dismissNewVersion(){
    this.setState({
      ...this.state,
      newVersion: false
    })
  }

  postNewVersion(recipe){
    this.setState({
      ...this.state,
      newVersion: false
    })
    this.postAPI(recipe)
    setTimeout(()=>this.getAllAPI(), 100)
  }

  async getAllAPI() {
    const response = await fetch(`${API}/recipes`)
    const json = await response.json()
    const versionFiltered = this.versionControlFilter(json)
    this.setState({
      ...this.state,
      recipes: json,
      filteredRecipes: versionFiltered,
      versionFilter: versionFiltered
    })
  }

  async postAPI(recipe){
   const response = await fetch (`${API}/recipes/`, {
       method: 'POST',
       mode: "cors", // no-cors, cors, *same-origin
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       credentials: "same-origin", // include, *same-origin, omit
       headers: {
         'Accept': 'application/JSON',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(recipe)
     })
     setTimeout(()=>this.getAllAPI(), 100)
 }

  render() {
    let logger = []
    return (
      <Root>
        <Container >
          <NavBar loginSignup={this.loginSignup.bind(this)} token={this.state.token} openDrawer={this.openDrawer}/>
          <Drawer ref={(ref) => { this.drawer = ref; }}
          content={<SideBar token={this.state.token} filtering={this.filtering.bind(this)} navigator={this.navigator} closeSideBar={this.closeDrawer}/>}
          onClose={() => this.closeDrawer()}>
          <Content>
            {this.state.newVersion ? <NewVersion recipe={this.state.newVersion} dismiss={this.dismissNewVersion.bind(this)} newVersion={this.postNewVersion.bind(this)} /> : null }
            {this.state.newView ? <NewRecipe dismiss={this.dismissNewView.bind(this)} newRecipe={this.newRecipe.bind(this)} /> : null}
            {this.state.loginSignup ? <LoginSignup loginClick={this.loginClick} signUpClick={this.signUpClick}/> : null}
            {this.state.singleView ? <SingleCardView backClick={this.backClick} card={this.state.singleView}/> : null}
            {this.state.singleView || this.state.newView || this.state.loginSignup || this.state.newVersion ? null : <RecipeList token={this.state.token} newVersion={this.newVersion.bind(this)} searchVal={this.state.searchVal} recipes={this.state.filteredRecipes} cardClick={this.cardClick}/>}
          </Content>
          {this.state.token && !this.state.newView
            ? <Footer>
                <Left>
                  <Button transparent>
                    <Text>My Recipes</Text><Icon name='list'/>
                  </Button>
                </Left>
                <Right>
                  <Button onPress={()=>this.newRecipeOpen()} transparent>
                    <Text>
                      Add New Recipe
                    </Text>
                  </Button>
                </Right>
              </Footer>
            : null
          }
          </Drawer>
        </Container>
      </Root>
    );
  }

}
