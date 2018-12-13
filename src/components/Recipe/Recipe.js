import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import ImageGenerator from '../ImageGenerator/ImageGenerator'

class Recipe extends Component {

    render() {
      const { viewStyle, textStyle } = styles
      const { recipe, cardClick } = this.props
      return (
    <Container style={viewStyle}>
      <Header>
        <Left>
          <Button onPress={() => cardClick(recipe)} transparent>
            <ImageGenerator recipe={recipe}/>
          </Button>
        </Left>
       <Body>
         <Title>Header</Title>
       </Body>
        <Right />
      </Header>
       <Content>
        <Text style={textStyle}>
          {recipe.recipe_name}
        </Text>
       </Content>
       <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
     </Container>
  )

  }
}

const styles = {
  viewStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
}

export default Recipe
