import { View, Text } from 'react-native'
import React from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import '../global.css'
import { AuthContextProvier, useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { MenuProvider } from 'react-native-popup-menu';


const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {

        if (typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)'
        if (isAuthenticated && !inApp) {
            //redirect to home
            router.replace('home')
        } else if (isAuthenticated == false) {
            //redirect to signin
            router.replace('signIn')
        }
    }, [isAuthenticated])

    return <Slot />
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvier>
                <MainLayout />
            </AuthContextProvier>
        </MenuProvider>

    )
}