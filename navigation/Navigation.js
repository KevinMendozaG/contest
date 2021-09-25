import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

import PlayGame from '../screens/PlayGame'
import WelcomePage from '../screens/WelcomePage'
import ConfigureGame from '../screens/ConfigureGame'

const Stack = createStackNavigator()

export default function Navigations() {
    
    return (
        //Creamos la navegacion principal con 3 pantallas y iniciamos la aplicacion en la pantalla WelcomePage
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="welcomePage"
            >
                <Stack.Screen
                name= "welcomePage"
                component={WelcomePage}
                options={{headerMode: 'none'}}
                />
                <Stack.Screen
                name= "playGame"
                component={PlayGame}
                options={{headerMode: 'none'}}
                />
                <Stack.Screen
                name= "configureGame"
                component={ConfigureGame}
                options={{headerMode: 'none'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}