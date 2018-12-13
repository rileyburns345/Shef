import React from 'react'
import { View, Image } from 'react-native'

  const ImageGenerator = ({recipe}) => (
     <Image source = {{uri: recipe.image_url}}
     style = {{ width: 200, height: 200 }}
     />
  )

  export default ImageGenerator
