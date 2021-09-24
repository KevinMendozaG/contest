import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function WelcomePage() {
    const [level, setLevel] = useState(1)

    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../assets/contest.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Nivel 1: Musica{/* Nivel 2: TV Nivel 3: Matematicas Nivel 4: Historia
            Nivel 5: Fisica */}
            </Text>
            <Text style={styles.title}>Nivel 2: TV</Text>
            <Text style={styles.title}>Nivel 3: Matematicas</Text>
            <Text style={styles.title}>Nivel 4: Historia</Text>
            <Text style={styles.title}>Nivel 5: Fisica</Text>
            <Text style={styles.description}>
                Para comenzar a jugar presiona el boton, cada ronda exitosa ganaras 100 puntos, 1 punto es igual a 1 USD
            </Text>
            <Button
                title="Comenzar juego"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("playGame", {level : level})}
            />
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal:30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "justify",
        alignItems: "flex-start"
    },
    description: {
        textAlign: "justify",
        fontSize: 15,
        marginBottom: 20,
        color: "#a45c34"
    },
    button: {
        backgroundColor: "#54bcec"
    }
})
