import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Badge, Text, Button } from 'native-base';

class NewRecipe extends Component {
  constructor(props){
    super(props)
    this.state = {
      course: '',
      description: '',
      diet: [],
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: ''
    }
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

  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Recipe Name</Label>
          <Input />
        </Item>
        <Item floatingLabel>
          <Label>Image URL</Label>
          <Input />
        </Item>
        <Item floatingLabel>
          <Label>Description</Label>
          <Input />
        </Item>
        <Item floatingLabel>
          <Label>Course</Label>
          <Input />
        </Item>
        <Item floatingLabel>
          <Label>Diet</Label>
          <Input />
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
            <Badge success><Text>{ingredient}</Text></Badge>
          ))
          : <Badge warning><Text>No Ingredients</Text></Badge>
        }
        </Item>
        <Item>
          <Textarea rowSpan={5} placeholder='Instructions'/>
        </Item>
      </Form>
    )
  }
}

export default NewRecipe
