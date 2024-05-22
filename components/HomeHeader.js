import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'
import { useAuth } from '../context/authContext'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems'
import { AntDesign, Feather } from '@expo/vector-icons'


const ios = Platform.OS === 'ios'
export default function HomeHeader() {
    const { user, logout } = useAuth()
    const { top } = useSafeAreaInsets()

    const handleProfile = () => {

    }

    const handleLogout = async() => {
        await logout()
    }
    return (
        <View className="flex-row shadow justify-between px-5 bg-indigo-500 pb-6 rounded-b-3xl" style={{ paddingTop: ios ? top : top + 10 }}>
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-medium text-white">Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            height: hp(4.3),
                            width: hp(4.3),
                            borderRadius: 100,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: 'white',
                            borderColor: 'white',
                            borderWidth: 1,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: 'white',
                        }
                    }}>
                        <Image source={user?.profileUrl} placeholder={blurhash} transition={500} style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer:{
                            borderRadius:10,
                            borderCurve:'continuous',
                            marginTop:40,
                            marginLeft:-30,
                            backgroundColor:'white',
                            shadowOpacity:0.2,
                            shadowOffset:{width:0, height:0},
                            width:160
                        }
                    }}>
                        <MenuItem action={handleProfile} text="Profile" value={null} icon={<Feather name='user' color='#737373' size={hp(2.5)} />} />
                        <Divider/>
                        <MenuItem action={handleLogout} text="Sign Out" value={null} icon={<AntDesign name='logout' color='#737373' size={hp(2.5)} />} />

                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}


const Divider = () => {
    return (
        <View className="p-[1px] w-full bg-neutral-200" />
    )
}