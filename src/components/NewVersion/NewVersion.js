import React, { Component } from 'react';
import { Container, Header, Content, Form, Body, CardItem, Item, Input, Label, Textarea, Badge, Text, Button, Picker, Icon, Footer, Left, Right } from 'native-base';
import { Dimensions } from 'react-native'

class NewVersion extends Component {
  constructor(props){
    super(props)
    this.state = {
      dietOptions: ['Dairy-free', 'Egg-free', 'Gluten-free', 'Nut-free', 'Soy-free', 'Sugar-free', 'Vegetarian'],
      courseOptions: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert'],
      course: this.props.recipe.course.toLowerCase() || '',
      description: this.props.recipe.description || '',
      diet: JSON.parse(this.props.recipe.diet) || '',
      dietInputStr: '',
      image_url: this.props.recipe.image_url || '',
      ingredients: JSON.parse(this.props.recipe.ingredients) || [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: this.props.recipe.recipe_name || '',
      instructionsList: JSON.parse(this.props.recipe.instructions) || []
    }
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
    const newState = [...this.state.diet, value].filter((v, i, a) => a.indexOf(v) === i)
    this.setState({
      ...this.state,
      diet: newState
    });
  }
  removeIngredient(value){
    const newIngList = this.state.ingredients.filter((ingredient)=>(
      ingredient !== value
    ))
    this.setState({
      ...this.state,
      ingredients: newIngList,
      ingredientsStr: ''
    })
  }

  submit(){
    const { recipe_name, description, ingredients, course, diet, image_url, instructionsList } = this.state
    const newVersion = { recipe_name, description, ingredients: JSON.stringify(ingredients), course, diet: JSON.stringify(diet), image_url, instructions: JSON.stringify(instructionsList) }
    this.props.newVersion(newVersion)
    this.dismiss()
  }

  dismiss(){
    this.setState({
      ...this.state,
      course: '',
      description: '',
      diet: [],
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: '',
      instructionsList: []
    })
    this.props.dismiss()
  }

  addInstruction(){
    const newState = [...this.state.instructionsList, this.state.instructions]
    this.setState({
      ...this.state,
      instructionsList: newState,
      instructions: ''
    })
  }

  removeInstruction(value){
    const newInstList = this.state.instructionsList.filter((instructions)=>(
      instructions !== value
    ))
    this.setState({
      ...this.state,
      instructionsList: newInstList,
      instructions: ''
    })
  }

  removeDiet(value){
    const newState = this.state.diet.filter((_diet)=>(
      _diet !== value
    ))
    this.setState({
      ...this.state,
      diet: newState
    })
  }

  moveUp(value){
    const index = this.state.instructionsList.indexOf(value)
    if(index-1 < 0)return
    const toMove = this.state.instructionsList[index]
    const moveHere = this.state.instructionsList[index-1]
    console.log(toMove, moveHere);
    const newState = this.state.instructionsList.map((instruction)=>{
      if(instruction === toMove){
        return moveHere
      }else if(instruction === moveHere){
        return toMove
      }else{
        return instruction
      }
    })
    this.setState({
      ...this.state,
      instructionsList: newState
    })

  }

  moveDown(value){
    const index = this.state.instructionsList.indexOf(value)
    if(index+2 > this.state.instructionsList.length)return
    const toMove = this.state.instructionsList[index]
    const moveHere = this.state.instructionsList[index+1]
    console.log(toMove, moveHere);
    const newState = this.state.instructionsList.map((instruction)=>{
      if(instruction === toMove){
        return moveHere
      }else if(instruction === moveHere){
        return toMove
      }else{
        return instruction
      }
    })
    this.setState({
      ...this.state,
      instructionsList: newState
    })
  }

  render() {
    const { containerStyle, ingredientContainer, instructionContainer } = styles
    return (
      <Form style={ containerStyle }>
        <Item>
          <Text>{this.state.recipe_name}</Text>
        </Item>
        <Item floatingLabel>
          <Label>Image URL</Label>
          <Input value={this.state.image_url} onChangeText={this.onImgURLChangeHandler} required/>
        </Item>
        <Item floatingLabel>
          <Label>Description</Label>
          <Input value={this.state.description} onChangeText={this.onDescChangeHandler} required/>
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
              selectedValue={null}
              onValueChange={this.onDietChange.bind(this)}
            >
              {this.state.dietOptions.map((option, idx)=>(
                <Picker.Item label={option} value={option.toLowerCase()} />
              ))}
            </Picker>
          </Item>
          <Item>
          {this.state.diet.length > 0
            ? this.state.diet.map((_diet)=>(
              <Button rounded small success><Text>{_diet}</Text><Icon onPress={() =>this.removeDiet(_diet)} name='close-circle'/></Button>
            ))
            : <Badge warning><Text>No Ingredients</Text></Badge>
          }
          </Item>
        <Item>
          <Input value={this.state.ingredientsStr} name='ingredientsStr' onChangeText={this.onIngChangeHandler} placeholder='Ingredients' required/>
          <Button primary small rounded disabled={this.state.ingredientsStr === '' ? true : false} onPress={()=>this.addIngredient()}>
            <Text>Add Ingredient</Text>
          </Button>
        </Item>

        <Item style={ingredientContainer}>
        {this.state.ingredients.length > 0
          ? this.state.ingredients.map((ingredient)=>(
            <Button rounded small success><Text>{ingredient}</Text><Icon onPress={() =>this.removeIngredient(ingredient)} name='close-circle'/></Button>
          ))
          : <Badge warning><Text>No Ingredients</Text></Badge>
        }
        </Item>

        <Item>
          <Text>Instructions:</Text>
        </Item>
        <Item>
        {this.state.instructionsList.length > 0
	         ? this.state.instructionsList.map((instruction, idx)=>(
		      <CardItem>
        	<Left style={{width: 10}}>
                <Icon onPress={()=>this.moveUp(instruction)} name='arrow-up'/>
            </Left>
              	<Body>
                <Text>
					{idx+1}: {instruction}
					<Icon onPress={() =>this.removeInstruction(instruction)} name='close-circle'/>
				</Text>
              </Body>
              <Right>
				<Icon onPress={()=>this.moveDown(instruction)} name='arrow-down'/>
              </Right>
            </CardItem>
          ))
	: <CardItem><Badge warning><Text>No Instructions</Text></Badge></CardItem>
}
        </Item>

        <Item>
          <Textarea value={this.state.instructions} onChangeText={this.onInstChangeHandler} rowSpan={5} placeholder='Instructions'/>
          <Button primary small rounded disabled={this.state.instructions === '' ? true : false} onPress={()=>this.addInstruction()}>
            <Text>Add Step</Text>
          </Button>
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

const styles = {
  containerStyle: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    // justifyContent: 'center',
    // width: 'auto'
    // flexDirection:'row'
    maxWidth: Dimensions.get('window').width
  },
  ingredientContainer: {
    flexWrap: 'wrap'
  },
  instructionContainer: {
    width: '100%'
  }
}

export default NewVersion
