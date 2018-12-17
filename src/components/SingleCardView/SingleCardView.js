import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Content, Card, CardItem, ScrollView, Image, Thumbnail, Text, Button, Icon, Left, Right, ListItem, Body, Badge, H1, H2, Footer } from 'native-base';


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
    const { card, backClick, deleteRecipeClick } = this.props
    const ingredientList = JSON.parse(card.ingredients)
    // const dietList = card.diet
    console.log('my Card', card);
    return (

        <View>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Text>{card.recipe_name}</Text>
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
                <Text note>{card.description}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Thumbnail square source = {{uri: card.image_url}} style = {{
                    width: 350,
                    height: 200,
                    flex: 1
                  }}/>
                  <ListItem>
                    <Badge success><Text>{card.course}</Text></Badge>
                  </ListItem>
                  <ListItem>
                    {JSON.parse(card.diet).map((dietItem)=>(
                      <Badge success><Text>{dietItem}</Text></Badge>
                    ))}
                  </ListItem>
                  <ListItem itemHeader>
                  <H2>Ingredients</H2>
                  </ListItem>
                  {ingredientList.map((ingredient)=>(
                      <ListItem>
                        <Text>{ingredient}</Text>
                      </ListItem>
                  ))}
                  <ListItem itemHeader>
                  <H2>Instructions</H2>
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
                  {this.props.token === this.props.card.user_id
                    ? <Button onPress={() => deleteRecipeClick(card.id)}>
                        <Text>Delete</Text>
                      </Button>
                    : null
                  }
                </Left>
                <Right>
                  {this.props.token
                    ? <Button onPress={()=>this.props.newVersion(card)} transparent>
                        <Icon name="ios-add" />
                        <Text>
                          Version
                        </Text>
                      </Button>
                    : null
                  }
                </Right>
              </CardItem>
            </Card>
          </Content>
          <Footer>
            <Left>


            </Left>
            <Right>

            </Right>
          </Footer>
        </View>
      );
  }
}


export default SingleCardView
