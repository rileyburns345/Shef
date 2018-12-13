import React from 'react'
import { View, Image } from 'react-native'

  const ImageGenerator = ({recipe}) => (
     <Image source = {{uri: recipe.image_url}}
     style = {{ width: 128, height: 128 }}
     />
  )

  export default ImageGenerator
