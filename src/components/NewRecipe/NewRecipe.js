import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Badge, Text, Button, Picker, Icon, Footer, Left, Right } from 'native-base';

class NewRecipe extends Component {
  constructor(props){
    super(props)
    this.state = {
      dietOptions: ['Dairy-free', 'Egg-free', 'Gluten-free', 'Nut-free', 'Soy-free', 'Sugar-free', 'Vegetarian'],
      courseOptions: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert'],
      course: '',
      description: '',
      diet: '',
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: ''
    }
  }

  onNameChangeHandler = (e) => {
    this.setState({
      ...this.state,
      recipe_name: e
    })
  }

  onDescChangeHandler = (e) => {
    this.setState({
      ...this.state,
      description: e
    })
  }

  onImgURLChangeHandler = (e) => {
    this.setState({
      ...this.state,
      image_url: e
    })
  }

  onInstChangeHandler = (e) => {
    this.setState({
      ...this.state,
      instructions: e
    })
  }

  addIngredient(){
    const newIngredients = [...this.state.ingredients, this.state.ingredientsStr]
    this.setState({
      ...this.state,
      ingredients: newIngredients,
      ingredientsStr: ''
    })
  }

  onIngChangeHandler = (e) => {
    this.setState({
      ...this.state,
      ingredientsStr: e
    })
  }

  onCourseChange(value: string) {
    this.setState({
      ...this.state,
      course: value
    });
  }
  onDietChange(value: string) {
    this.setState({
      ...this.state,
      diet: value
    });
  }
  removeIngredient(value){
    console.log(value);
    const newIngList = this.state.ingredients.filter((ingredient)=>(
      ingredient !== value
    ))
    this.setState({
      ...this.state,
      ingredients: newIngList
    })
  }

  submit(){
    const { recipe_name, description, ingredients, course, diet, image_url, instructions } = this.state
    const newRecipe = { recipe_name, description, ingredients: JSON.stringify(ingredients), course, diet, image_url, instructions }
    this.props.newRecipe(newRecipe)
  }

  dismiss(){
    this.setState({
      ...this.state,
      course: '',
      description: '',
      diet: '',
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: ''
    })
    this.props.dismiss()
  }

  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Recipe Name</Label>
          <Input onChangeText={this.onNameChangeHandler}/>
        </Item>
        <Item floatingLabel>
          <Label>Image URL</Label>
          <Input onChangeText={this.onImgURLChangeHandler}/>
        </Item>
        <Item floatingLabel>
          <Label>Description</Label>
          <Input onChangeText={this.onDescChangeHandler}/>
        </Item>
        <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Select Course"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.course}
              onValueChange={this.onCourseChange.bind(this)}
            >
              {this.state.courseOptions.map((option, idx)=>(
                <Picker.Item label={option} value={option.toLowerCase()} />
              ))}
            </Picker>
          </Item>
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select Diet"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.diet}
                onValueChange={this.onDietChange.bind(this)}
              >
                {this.state.dietOptions.map((option, idx)=>(
                  <Picker.Item label={option} value={option.toLowerCase()} />
                ))}
              </Picker>
            </Item>
        <Item>
          <Input value={this.state.ingredientsStr} name='ingredientsStr' onChangeText={this.onIngChangeHandler} placeholder='Ingredients'/>
          <Button onPress={()=>this.addIngredient()} transparent>
            <Text>Add Ingredient</Text>
          </Button>
        </Item>
        <Item>
        {this.state.ingredients.length > 0
          ? this.state.ingredients.map((ingredient)=>(
            <Badge onPress={()=>this.removeIngredient(ingredient)} success><Text>{ingredient}</Text></Badge>
          ))
          : <Badge warning><Text>No Ingredients</Text></Badge>
        }
        </Item>
        <Item>
          <Textarea onChangeText={this.onInstChangeHandler} rowSpan={5} placeholder='Instructions'/>
        </Item>
        <Item>
          <Button onPress={()=>this.submit()} transparent><Text>Submit</Text></Button>
        </Item>
        <Item>
          <Button onPress={()=>this.dismiss()} transparent><Text>Dismiss</Text></Button>
        </Item>
      </Form>
    )
  }
}

export default NewRecipe
