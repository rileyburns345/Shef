import React, {Component} from 'react';
import { View, AsyncStorage, ScrollView } from 'react-native';
import { Container, Header, Content, Drawer, Root, Toast, Footer, Button, Text, Icon, Left, Right } from 'native-base'
import SideBar from './src/components/SideBar/SideBar'
import NavBar from './src/components/NavBar/NavBar'
import RecipeList from './src/components/RecipeList/RecipeList'
import SingleCardView from './src/components/SingleCardView/SingleCardView'
import LoginSignup from './src/components/LoginSignup/LoginSignup'
import NewRecipe from './src/components/NewRecipe/NewRecipe'
import NewVersion from './src/components/NewVersion/NewVersion'
import CardSwiper from './src/components/CardSwiper/CardSwiper'

const API = process.env.API || 'https://shef-backend.herokuapp.com'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      filteredRecipes: [],
      singleView: false,
      searchVal: 'Popular Recipes',
      newView: false,
      token: '',
      loginSignup: false,
      newVersion: false,
      versionFilter: [],
      deck: false,
      favorites: [],
      favoritesView: false,
      actualToken: ''
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
        const auth = response.headers.map.auth.slice(8, response.headers.map.auth.length)
        const json = await response.json()
        this.setState({
          ...this.state,
          token: json.id,
          loginSignup: false,
          actualToken: auth
        })
        this.storeToken(json.id, auth)
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
          const auth = response.headers.map.auth.slice(8, response.headers.map.auth.length)
          const json = await response.json()
          this.setState({
            ...this.state,
            token: json.id,
            loginSignup: false,
            actualToken: auth
          })
          this.storeToken(json.id, auth)
          console.log('TOKEN', this.state.token);
        }
      }

      logoutClick = async () => {
          this.setState({
            ...this.state,
            token: ''
          })
          this.storeToken("", "")
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
    this.getFavorites()
    this.getToken()
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
    const versions = this.state.recipes.filter((recipe)=>recipe.recipe_name === clickedRecipe.recipe_name)
    if (versions.length > 1){
      this.setState({
        ...this.state,
        deck: versions
      })
    }else{
      this.setState({
        ...this.state,
        singleView: versions[0]
      })
    }
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
  }

  cardClick2 = (clickedRecipe) => {
    this.setState({
      ...this.state,
      deck: false,
      singleView: clickedRecipe
    })
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
  }

  backClick = () => {
    this.setState({
      ...this.state,
      singleView: false
      })
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
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
        setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
      }else{
        this.setState({
          ...this.state,
          filteredRecipes: this.state.versionFilter,
          searchVal: 'Popular Recipes'
        })
        setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
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
      setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
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
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
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
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
  }

  dismissNewVersion(){
    this.setState({
      ...this.state,
      newVersion: false
    })
  }

  postNewVersion(recipe){
    recipe.user_id = this.state.token
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
         'Content-Type': 'application/json',
         'token': this.state.actualToken
       },
       body: JSON.stringify(recipe)
     })
     setTimeout(()=>this.getAllAPI(), 100)
 }

  deckNullify(){
   this.setState({
     ...this.state,
     deck: false,
     singleView: false,
     searchVal: 'Popular Recipes',
     filteredRecipes: this.state.versionFilter,
     favoritesView: false,
     loginSignup: false
   })
  }

  async getFavorites() {
    try {
      const value = await AsyncStorage.getItem('favorites');
      if (value !== null) {
        // We have data!!
        this.setState({
          ...this.state,
          favorites: JSON.parse(value)
        })
      }else{
        this.setState({
          ...this.state,
          favorites: []
        }, this.storeFavorites())
      }
     } catch (error) {
       this.storeFavorites()
     }
  }

  async storeFavorites(){
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    } catch (error) {
      // Error saving data
      console.log('error at store');
    }
  }

  async getToken() {
    console.log('looking for TOKEN');
    const token = await AsyncStorage.getItem('token')
    const user_id = await AsyncStorage.getItem('user_id')
    console.log(token, user_id);
    const parsed = JSON.parse(user_id)
    this.setState({
      ...this.state,
      token: parsed || "",
      actualToken: token | ""
    })
  }

  async storeToken(user_id=this.state.token, token=this.state.actualToken){
    console.log(user_id, token);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user_id', JSON.stringify(user_id));
  }

  addDeleteFavorite(id){
    if(this.state.favorites.includes(id)){
      const newState = this.state.favorites.filter((favorite)=>favorite !== id)
      this.setState({
        ...this.state,
        favorites: newState
      })
    }else{
      const newState = [...this.state.favorites, id].sort((a, b)=> a-b)
      this.setState({
        ...this.state,
        favorites: newState
      })
    }
    setTimeout(()=>this.storeFavorites(), 10)
  }

  favoritesFilter(){
    let results = []
    const { recipes } = this.state
    this.state.favorites.forEach(function(favorite){
      const value = recipes.filter((recipe)=>recipe.id === favorite)[0]
      results.push(value)
    })
    this.setState({
      ...this.state,
      favoritesView: true,
      filteredRecipes: results,
      searchVal: 'My Favorites'
    })
    setTimeout(()=>this.scrollView.scrollTo({x: 0, y: 0, animated: true}), 1)
  }

  myRecipes(){
    if(!this.state.token)return
    const filtered = this.state.recipes.filter((recipe)=>recipe.user_id === this.state.token)
    if(filtered.length > 0){
      this.setState({
        ...this.state,
        filteredRecipes: filtered,
        favoritesView: true,
        searchVal: 'My Recipes'
      })
    }else{
      Toast.show({
        text: 'You have no recipes',
        buttonText: 'Okay'
      })
    }
  }

  async deleteRecipeClick(recipeID){
    console.log('BEFORE DELETE', this.state);
    letRecipeToDelete = this.state.recipes.filter(recipe => (recipe.id === recipeID))[0]
    console.log('letRecipeToDelete',  letRecipeToDelete);
    const response = await fetch(`${API}/recipes/${recipeID}`, {
       method: 'DELETE',
       mode: "cors", // no-cors, cors, *same-origin
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       credentials: "same-origin", // include, *same-origin, omit
       headers: {
         'Accept': 'application/JSON',
         'Content-Type': 'application/json',
         'token': this.state.actualToken
       },
      })
      if(response.status === 200) {
      const json = await response.json()
      this.getAllAPI()
      this.setState({
        ...this.state,
        singleView: false
      })
      }
      let newFavorites = this.state.favorites
      if(this.state.favorites.includes(recipeID)){ newFavorites = this.state.favorites.filter((favorite)=>favorite !== recipeID}
      this.setState({
        ...this.state,
        favorites: newFavorites
      })
    }

    forceAnUpdate(){
      setTimeout(()=>this.forceUpdate(),1)
    }


  render() {
    const styles = {
      footerText: {
        color: 'white'
      },
      footerStyle: {
        backgroundColor: 'maroon'
      }
    }
    const { footerText, footerStyle } = styles

    let logger = []
    return (
      <Root>
        <Container >
          <NavBar loginSignupCheck={this.state.loginSignup} favoritesFilter={this.favoritesFilter.bind(this)} favoritesView={this.state.favoritesView} singleView={this.state.singleView} back={this.deckNullify.bind(this)} deck={this.state.deck} loginSignup={this.loginSignup.bind(this)} token={this.state.token} openDrawer={this.openDrawer}/>
          <Drawer ref={(ref) => { this.drawer = ref; }}
          content={<SideBar token={this.state.token} filtering={this.filtering.bind(this)} navigator={this.navigator} closeSideBar={this.closeDrawer} logoutClick={this.logoutClick}/>}
          onClose={() => this.closeDrawer()}>
          <ScrollView ref={(ref) => { this.scrollView = ref; }}>
            {this.state.deck ? <CardSwiper cardClick={this.cardClick2.bind(this)} deck={this.state.deck}/> : null}
            {this.state.newVersion ? <NewVersion forceAnUpdate={this.forceAnUpdate.bind(this)} recipe={this.state.newVersion} dismiss={this.dismissNewVersion.bind(this)} newVersion={this.postNewVersion.bind(this)} /> : null }
            {this.state.newView ? <NewRecipe dismiss={this.dismissNewView.bind(this)} newRecipe={this.newRecipe.bind(this)} /> : null}
            {this.state.loginSignup ? <LoginSignup loginClick={this.loginClick} signUpClick={this.signUpClick}/> : null}
            {this.state.singleView ? <SingleCardView
              deleteRecipeClick={this.deleteRecipeClick.bind(this)} newVersion={this.newVersion.bind(this)} token={this.state.token} favorites={this.state.favorites} addRemoveFavorite={this.addDeleteFavorite.bind(this)} backClick={this.backClick} card={this.state.singleView}/> : null}
            {this.state.singleView || this.state.newView || this.state.loginSignup || this.state.newVersion || this.state.deck ? null : <RecipeList token={this.state.token} newVersion={this.newVersion.bind(this)} searchVal={this.state.searchVal} recipes={this.state.filteredRecipes} cardClick={this.cardClick}/>}
          </ScrollView>
          {this.state.token && !this.state.newView && !this.state.deck && !this.state.singleView
            ? <Footer style={footerStyle}>
                <Left>
                  <Button onPress={()=>this.myRecipes()} transparent>
                    <Icon style={footerText} name='list'/><Text style={footerText}>My Recipes</Text>
                  </Button>
                </Left>
                <Right>
                  <Button onPress={()=>this.newRecipeOpen()} transparent>
                    <Text style={footerText}>
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
