import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, H3 } from 'native-base';

import ImageGenerator from '../ImageGenerator/ImageGenerator'

class Recipe extends Component {

    render() {
    const styles = {
      textStyle: {
        fontSize: 20,
        color: 'maroon'
      },
      backgroundStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center'
      }
    }
    
    const { textStyle, backgroundStyle } = styles

      const { recipe, cardClick } = this.props
      return (
        <Card>
          <CardItem>
            <Body style={backgroundStyle}>
              <Text style={textStyle}>{recipe.recipe_name}</Text>
            </Body>
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
