import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, H3 } from 'native-base';

import ImageGenerator from '../ImageGenerator/ImageGenerator'

class Recipe extends Component {

    render() {
      const { recipe, cardClick } = this.props
      return (
        <Card>
          <CardItem>
            <Left>
              <Body>
                <H3>{recipe.recipe_name}</H3>
              </Body>
            </Left>
          </CardItem>
          <CardItem button onPress={() => cardClick(recipe)} cardBody>
            <ImageGenerator recipe={recipe}/>
          </CardItem>
          <CardItem>
          </CardItem>
        </Card>
    )
  }
}


export default Recipe
