import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import {} from '@react-navigation/bottom-tabs'

import PlayGame from '../screens/PlayGame'
import WelcomePage from '../screens/WelcomePage'

const Stack = createStackNavigator()

export default function Navigations() {
    //
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="welcomePage"
                
            >
                <Stack.Screen
                name= "welcomePage"
                component={WelcomePage}
                options={{title:"Bienvenido al concurso!", headerMode: 'none'}}
                />
                <Stack.Screen
                name= "playGame"
                component={PlayGame}
                options={{headerMode: 'none'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}