import React, { Component } from 'react'
// import { ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Image, Thumbnail, Text, Button, Icon, Left, Right, ListItem, Body } from 'native-base';

class SingleCardView extends Component {


  // createIngredientsList = () => {
  //   let ingredients = JSON.parse(this.props.card.ingredients)
  //   const list = ingredients.map((ingredient) => {
  //     console.log(ingredient)
  //   })
  //   return list
  // }


  // {JSON.parse(card.ingredients).map((ingredient) => {
  //   return (
  //     <ListItem>
  //     <Body>
  //       <Text>{ingredient}</Text>
  //     </Body>
  //   </ListItem>
  // )
  // })}

  // {dietList.map((diet)=>(
  //     <ListItem>
  //       <Text>{diet}</Text>
  //     </ListItem>
  // ))}

  render(){
    const {card, backClick} = this.props
    const ingredientList = JSON.parse(card.ingredients)
    // const dietList = card.diet
    console.log('my Card', card);
    console.log(typeof(card.diet));
    return (
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>

                  <Body>
                    <Text>{card.recipe_name}</Text>
                    <Text></Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Thumbnail square source = {{uri: card.image_url}} style = {{
                    width: 350,
                    height: 200,
                    flex: 1
                  }}/>
                  <Text>
                  </Text>
                  <Text>Ingredients</Text>
                  {ingredientList.map((ingredient)=>(
                      <ListItem>
                        <Text>{ingredient}</Text>
                      </ListItem>
                  ))}
                  <Text>Instructions</Text>
                  <Text>{card.instructions}</Text>
                  <Text>Diet</Text>

                </Body>
              </CardItem>
              <CardItem>


                <Left>
                </Left>
                <Right>

                </Right>
              </CardItem>
            </Card>
          </Content>
      );
  }



}

export default SingleCardView
