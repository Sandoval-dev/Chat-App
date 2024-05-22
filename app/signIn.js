import { View, Text, Image, TextInput, TouchableOpacity, TouchableNativeFeedback, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import SignInImage from '../components/SignInImage'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { useAuth } from '../context/authContext'

export default function SignIn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const handleLogin = async () => {

        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', 'Please fill all the  fileds!')
            return
        }

        setLoading(true)
        const response = await login(emailRef.current, passwordRef.current)
        setLoading(false)
        console.log('sign in response', response)
        if (!response.success) {
            Alert.alert('Sign In', response.msg)
        }

        //login
    }


    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <SignInImage size={hp(15)}/>
                </View>

                <View className="gap-10">
                    <Text className="font-bold tracking-wider text-center text-neutral-800" style={{ fontSize: hp(4) }}>Sign In</Text>
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name='mail' size={hp(2.7)} color="gray" />
                            <TextInput onChangeText={value => emailRef.current = value} style={{ fontSize: hp(2) }} placeholder='Email adress' placeholderTextColor={'gray'} className="flex-1 font-semibold text-neutral-700" />
                        </View>
                        <View className="gap-4">
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <Octicons name='lock' size={hp(2.7)} color="gray" />
                                <TextInput secureTextEntry onChangeText={value => passwordRef.current = value} style={{ fontSize: hp(2) }} placeholder='Password' placeholderTextColor={'gray'} className="flex-1 font-semibold text-neutral-700" />
                            </View>
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">Forgot password?</Text>
                        </View>

                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                         <Loading size={hp(10)}/>
                                    </View>

                                ) : (

                                    <TouchableOpacity onPress={handleLogin}>
                                        <View style={{ height: hp(6.5) }} className="bg-indigo-600 rounded-xl justify-center items-center">
                                            <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Sign In</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>




                        <View className="flex-row justify-center">
                            <Text className="font-semibold text-neutral-500" style={{ fontSize: hp(1.8) }}>Don't have an account? </Text>
                            <Pressable onPress={() => router.push('signUp')}>
                                <Text className="font-bold text-indigo-500" style={{ fontSize: hp(1.8) }}>Sign Up</Text>
                            </Pressable>

                        </View>

                    </View>

                </View>
            </View >
        </CustomKeyboardView >
    )
}