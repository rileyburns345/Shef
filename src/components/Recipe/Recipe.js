import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import ImageGenerator from '../ImageGenerator/ImageGenerator'

class Recipe extends Component {

    render() {
      const { recipe, cardClick } = this.props
      return (
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{recipe.recipe_name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <ImageGenerator recipe={recipe}/>
          </CardItem>
          <CardItem>
            {this.props.token
              ? <Left>
                  <Button onPress={()=>this.props.newVersion(recipe)} transparent>
                    <Text>Create Your Own</Text>
                    <Icon name='ios-add'/>
                  </Button>
                </Left>
              : <Left>
                </Left>
            }
            <Right>
            <Button onPress={() => cardClick(recipe)} transparent>
              <Text>Read More</Text>
            </Button>
            </Right>
          </CardItem>
        </Card>
    )
  }
}


export default Recipe
