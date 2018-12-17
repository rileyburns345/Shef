import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Footer, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right } from 'native-base';
export default class CardSwiper extends Component {
  render() {
    const { deck } = this.props
    return (
      <View>
        <View>
          <DeckSwiper looping
            ref={(c) => this._deckSwiper = c}
            dataSource={deck}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: item.image_url}} />
                    <Body>
                      <Text>{item.description}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri: item.image_url}} />
                </CardItem>
                <CardItem>
                  <Right>
                    <Button onPress={() => this.props.cardClick(item)} transparent>
                      <Text>Read More</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: -710, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button rounded iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button rounded iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Text>Swipe Right</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </View>
    );
  }
}
