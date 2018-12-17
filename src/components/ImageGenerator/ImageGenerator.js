import React from 'react'
import { View, Image } from 'react-native'

  const ImageGenerator = ({recipe}) => (
     <Image source = {{uri: recipe.image_url}}
     style = {{
       width: null,
       height: 200,
       flex: 1,
       resizeMode: 'cover'
     }}
     />
  )

  export default ImageGenerator
