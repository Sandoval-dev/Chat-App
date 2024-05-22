import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'


export default function MessagesList({messages,scrollViewRef, currentUser}) {
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
      {
        messages.map((message,index) => {
          return (<MessageItem message={message} key={index} currentUser={currentUser}/>)
        })
      }
    </ScrollView>
  )
}