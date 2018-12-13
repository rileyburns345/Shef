import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

const SingleCardView = ({card, backClick}) => {
console.log('my Card', card);
  return (
    <Card>
      
      <Text>
        {card.recipe_name}
      </Text>
      <Text>
        Course: {card.course}
      </Text>
    </Card>
    );
}

export default SingleCardView
