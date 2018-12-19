import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Footer, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right, H2 } from 'native-base';
import { version } from 'punycode';
export default class CardSwiper extends Component {
  render() {
    const styles = {
      textStyle: {
        fontSize: 20,
        color: 'white'
      },
      backgroundStyle: {
        backgroundColor: 'maroon',
        justifyContent: 'center'
      },
      buttonStyle: {
        backgroundColor: 'maroon',
        justifyContent: 'center',
        marginTop: -130
      },
      versionStyle: {
        color: 'maroon'
      }
    }
    const { textStyle, backgroundStyle, buttonStyle, versionStyle } = styles

    const { deck } = this.props
    return (
      <View>
        <View>
          <Card>
            <CardItem style={backgroundStyle}>
              <Text style={textStyle}>
                Versions of {deck[0].recipe_name}:
              </Text>
            </CardItem>
          </Card>
        </View>
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
                      <Text style={versionStyle}>{item.description}</Text>
                      <Text note>Version {deck.indexOf(item)+1}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem button onPress={() => this.props.cardClick(item)} cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri: item.image_url}} />
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: -600, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button style={buttonStyle} rounded iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button style={buttonStyle} rounded iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Text>Swipe Right</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </View>
    );
  }
}
