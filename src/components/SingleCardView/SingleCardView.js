import React, { Component } from 'react'
// import { ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Image, Thumbnail, Text, Button, Icon, Left, Right, ListItem, Body, Badge } from 'native-base';

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
                  <Text>{card.recipe_name}</Text>
                  <Text></Text>
                </Left>
                <Right>
                  <Left>
                    {this.props.favorites.includes(card.id)
                      ? <Icon onPress={()=>this.props.addRemoveFavorite(card.id)} name="ios-heart" style={{ color: '#ED4A6A' }} />
                      : <Icon onPress={()=>this.props.addRemoveFavorite(card.id)} name="ios-heart-outline" style={{ color: '#ED4A6A' }} />
                    }

                  </Left>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Thumbnail square source = {{uri: card.image_url}} style = {{
                    width: 350,
                    height: 200,
                    flex: 1
                  }}/>
                  <ListItem>
                    {JSON.parse(card.diet).map((dietItem)=>(
                      <Badge success><Text>{dietItem}</Text></Badge>
                    ))}
                  </ListItem>
                  <ListItem>
                  <Text>Description</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {card.description}
                    </Text>
                  </ListItem>
                  <ListItem>
                  <Text>Ingredients</Text>
                  </ListItem>
                  {ingredientList.map((ingredient)=>(
                      <ListItem>
                        <Text>{ingredient}</Text>
                      </ListItem>
                  ))}
                  <ListItem>
                  <Text>Instructions</Text>
                  </ListItem>
                  {JSON.parse(card.instructions).map((instruction, idx)=>{
                    return(
                      <ListItem>
                        <Text>
                          {idx+1}: {instruction}
                        </Text>
                      </ListItem>
                    )
                  })}

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
