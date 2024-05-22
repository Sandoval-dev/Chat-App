import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function SignUpImage({size}) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
            <LottieView style={{ flex: 1 }} autoPlay loop source={require('../assets/images/animSignUp.json')} />
        </View>
  )
}