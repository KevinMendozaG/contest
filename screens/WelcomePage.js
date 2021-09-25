import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { DataTable } from 'react-native-paper'
import { isEmpty } from 'lodash';

//Pantalla principal de la aplicacíon
export default function WelcomePage() {
    const [points, setPoints] = useState(0)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState("")
    const [errorAge, setErrorAge] = useState("")

    const navigation = useNavigation()

    //metodo para capturar los inputs
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
        
    }

    //Cuando se presione el boton de comenzar juego validamos que haya ingresado nombre y edad para el historico
    //y navegamos a la pantalla del juego
    const startGame = () =>{
        if (!validateData()){
            return;
        }
        navigation.navigate("playGame", {points : points, playerName: formData.name, playerAge: formData.age})
    }

    //Metodo para validar que se haya ingresado los datos correctamente
    const validateData = () =>{
        setErrorName("")
        setErrorAge("")
        let isValid = true

        if(isEmpty(formData.name)){
            setErrorName("Debes ingresar tu nombre")
            isValid = false
        }

        if(isEmpty(formData.age)){
            setErrorAge("Debes ingresar tu edad")
            isValid = false
        }
        return isValid
    }
    
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
            <View style={styles.container}>
            <DataTable>
                <DataTable.Header >
                <DataTable.Title>Nivel</DataTable.Title>
                <DataTable.Title>Categoría</DataTable.Title>
                <DataTable.Title numeric>Puntos</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell>1</DataTable.Cell>
                <DataTable.Cell>Musica</DataTable.Cell>
                <DataTable.Cell numeric>100</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell>2</DataTable.Cell>
                <DataTable.Cell>Entretenimiento</DataTable.Cell>
                <DataTable.Cell numeric>100</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell>3</DataTable.Cell>
                <DataTable.Cell>Historia</DataTable.Cell>
                <DataTable.Cell numeric>100</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell>4</DataTable.Cell>
                <DataTable.Cell>Geografía</DataTable.Cell>
                <DataTable.Cell numeric>100</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell>5</DataTable.Cell>
                <DataTable.Cell>Ciencia</DataTable.Cell>
                <DataTable.Cell numeric>500</DataTable.Cell>
                </DataTable.Row>

            </DataTable>
            </View>
            <Text style={styles.description}>
                Cada ronda exitosa otorga 100 puntos, la ultima ronda otorga 500 puntos!!
            </Text>
            <Text style={styles.title}> 1 punto= 1USD </Text>
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu nombre..."
                onChange= {(e) => onChange(e, "name")}
                errorMessage={errorName}
                defaultValue={formData.name}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu edad..."
                onChange= {(e) => onChange(e, "age")}
                errorMessage={errorAge}
                defaultValue={formData.age}
            />
            <Button
                title="Comenzar juego"
                buttonStyle={styles.button}
                onPress={() => startGame()}
            />
            <Button
                title="Configurar Preguntas"
                buttonStyle={{backgroundColor: "#ec1558", marginTop: 5}}
                onPress={() => navigation.navigate("configureGame")}
            />
        </ScrollView>
    )
}

const defaultFormValues = () => {
    return { name: "", age: ""} 
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal:30
    },
    image: {
        height: 150,
        width: "100%",
        marginBottom: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "justify",
        alignItems: "flex-start",
        marginBottom: 20
    },
    description: {
        textAlign: "justify",
        fontSize: 15,
        color: "#a45c34"
    },
    button: {
        backgroundColor: "#442484"
    },
    container: {
        paddingHorizontal: 30,
    }
})
