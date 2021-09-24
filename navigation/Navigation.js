import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

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
                options={{title:"Bienvenido al concurso!"}}
                />
                <Stack.Screen
                name= "playGame"
                component={PlayGame}
                options={{title:"Juego"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}