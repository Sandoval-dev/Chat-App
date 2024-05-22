import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash, formatDate, getRoomId } from '../utils/common'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'


export default function ChatItem({ item, router, noBorder, currentUser }) {

  const [lastMessage, setLastMessage] = useState(undefined)

  useEffect(() => {

    let roomId = getRoomId(currentUser?.userId, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const messagesRef = collection(docRef, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'desc'))

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data()
      })
      setLastMessage(allMessages[0] ? allMessages[0] : null)
    })

    return unsub
  }, [])

  //console.log('last message:', lastMessage)

  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item })
  }

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt
      return formatDate(new Date(date?.seconds* 1000))
    }
  }

  const renderLastMessage = () => {
    if (typeof lastMessage === 'undefined') {
      return 'Loading...'
    }

    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId) return "You: " + lastMessage?.text
      return lastMessage?.text
    }
    else{
      return 'Say Hi 👋'
    }
  }
  return (
    <TouchableOpacity onPress={openChatRoom}>
      <View className={`flex-row justify-between mx-4 items-center gap-3 mb-4 p-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>

        {/* <Image
          className="rounded-full"
          style={{ height: hp(6), width: hp(6) }}
          source={{uri:item?.profileUrl}} /> */}
        <Image transition={500} placeholder={blurhash} style={{ height: hp(6), width: hp(6), borderRadius: 100 }} source={item?.profileUrl} />

        <View className="flex-1 gap-1">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-neutral-800" style={{ fontSize: hp(1.8) }}>{item?.username}</Text>
            <Text className="font-medium text-neutral-500" style={{ fontSize: hp(1.5) }}>
              {renderTime()}
            </Text>
          </View>
          <Text className="font-medium text-neutral-500" style={{ fontSize: hp(1.6) }}>{renderLastMessage()}</Text>
        </View>
      </View>
    </TouchableOpacity>

  )
}