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
            <Left>
              <Button transparent>
                <Text>Like</Text>
                <Icon name='thumbs-up'/>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Text>Comment</Text>
                <Icon name='chatbubbles'/>
              </Button>
            </Body>
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
