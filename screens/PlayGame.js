import React, { useCallback, useEffect, useState } from 'react'
import {  StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { Button, ListItem } from 'react-native-elements'
import { map } from 'lodash'

import { addDocumentWithoutId, getQuestion } from '../utils/actions'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

//Pantalla del juego para responder las preguntas y respuestas
export default function PlayGame({ navigation, route }) {
    const { points, playerName, playerAge } = route.params
    const [controlLevel, setControlLevel] = useState(1)
    const [controlPoints, setControlPoints] = useState(points)
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [reload, setReload] = useState(true)
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [exitButton, setExitButton] = useState(false)

    //Un control para cuando se presione el boton hacia atras de el celular para salir del juego cuando se esta respondiendo respuestas
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Espera!", "¿Seguro que quieres cerrar del juego?", [
              {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Salir", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };    

        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        )
        return () => backHandler.remove()
      }, [])

      //Cargar la siguiente pregunta
    useFocusEffect(
        useCallback(() => {
            async function getData() {
                identifyCategory()
                setLoading(true)
                const response = await getQuestion(category)
                if(response.statusResponse){
                    setQuestion(response.question)
                    setAnswers(response.answers)
                    setCorrectAnswer(response.correctAns)
                }
                setLoading(false)
                
            }
            getData()
            setReload(false)
        }, [reload])
    )

    const identifyCategory = () =>{
        switch (controlLevel) {
            case 1:
                setCategory("Musica")
                break;
            case 2:
                setCategory("Entretenimiento")
                break;
            case 3:
                setCategory("Historia")
                break;
            case 4:
                setCategory("Geografia")
                break;
            default:
                setCategory("Ciencia")
                break;
        }
    }

    //Metodo para comparar si la respuesta escogida es la respuesta correcta, si lo es pasa de ronda 
    //si no se muestra el componente Modal 
    const itemSelected = (ans, id) => {
        if (id==correctAnswer) {
            setControlLevel(controlLevel+1)
            if (controlLevel==5) {
                setControlPoints(controlPoints+500)
                setReload(true)
                return
            }
            setControlPoints(controlPoints+100)
            setReload(true)
            return
        }
        setShowLoseModal(true)
    }

    const exitAction = (setExitButton, setShowLoseModal) => {
        setExitButton(true)
        setShowLoseModal(true)
    }

    //Guardamos los datos de jugador en la base de datos
    const savePlayerData = async() => {
        const data= {playerName: playerName, playerAge: playerAge, roundReached: controlLevel-1, pointsWon: controlPoints}
        const response = await addDocumentWithoutId("playersInfo", data)
                if(!response.statusResponse){
                    console.log(response.error)
                }
        navigation.navigate("welcomePage")
    }

    return (
        controlLevel==6
                ? 
                <View>
                <Text style={styles.title}>Felicidades!</Text>
                <Text style={styles.title}>Llegaste a la ronda {controlLevel-1} y ganaste {controlPoints}USD</Text>
                <Button
                    title="Volver a pantalla principal"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={() => savePlayerData()}
                />
            </View>
                :
        <View style={styles.viewBody}>
            <Text style={styles.title}>Nivel/Ronda: {controlLevel}    Categoria: {category}</Text>
            <Text style={styles.title}>Acumulado: {controlPoints}USD</Text>
            <Text style={styles.question}>{question}</Text>
            
            <View >
            {
                map(answers,(ans, i) => (
                <ListItem key={i} bottomDivider
                onPress = {()=> itemSelected(ans, i)  } 
                style={styles.containerStyle}
                >
                    <ListItem.Content>
                    <ListItem.Title style={styles.answer}>{ans}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                ))
            }
            </View>
            <Button
                title="Salir con el acumulado actual"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => exitAction(setExitButton, setShowLoseModal)} 
            />
            <Loading
                isVisible= {loading}
                text="Cargando Pregunta..."
            />
            <Modal isVisible={showLoseModal} setVisible={setShowLoseModal}>
                {
                    <Lose playerName={playerName} playerAge={playerAge} controlLevel={controlLevel} answers={answers} correctAnswer={correctAnswer} 
                    setVisible={setShowLoseModal} navigation={navigation} wonPoints={controlPoints} exitButton={exitButton}/>
                }
            </Modal>
        </View>
    )
}

//Componente que renderiza el componente Modal
function Lose({playerName, playerAge, controlLevel, answers, correctAnswer, setVisible, navigation, wonPoints,exitButton}){
    
    const [data, setData] = useState({playerName: playerName, playerAge: playerAge, roundReached: controlLevel-1, pointsWon: wonPoints})
    
    useFocusEffect(
        useCallback(() => {
            (async() =>{
                
                const response = await addDocumentWithoutId("playersInfo", data)
                if(!response.statusResponse){
                    console.log(response.error)
                }
                
            })()
        }, [])
    )

    return(
        exitButton
        ?<View>
        <Text style={styles.lostTitle}>Saliste en la ronda {controlLevel}</Text>
        <Text style={styles.lostText}>Dinero ganado:  {wonPoints}USD</Text>
        <Button
            title="Presiona para volver a la pagina de inicio"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => goBack(setVisible, navigation)}
        />
        </View>
        :
        <View>
            <Text style={styles.lostTitle}>Respuesta incorrecta!</Text>
            <Text style={styles.lostText}>La respuesta correcta es:  {answers[correctAnswer]}</Text>
            <Text style={styles.lostText}>Dinero ganado:  {wonPoints}USD</Text>
            <Button
                title="Presiona para volver a la pagina de inicio"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => goBack(setVisible, navigation)}
                
            />
        </View>
    )
}

const goBack = (setVisible, navigation) => {
    setVisible(false)
    navigation.navigate("welcomePage")
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        alignItems: "flex-start",
        marginTop: 20
    },
    question: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        textAlign: "justify",
        alignItems: "flex-start",
        color: "#a42c34"
    },
    containerStyle: {
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#e4546c"
    },
    answer: {
        fontWeight: "bold",
        fontSize: 15,
        fontStyle: "italic"
    },
    btnContainer: {
        width:"95%",
        marginTop: 10,
        marginLeft: 10
    },
    btn: {
        borderRadius: 20,
        backgroundColor: "#442484",
        borderTopWidth: 1,
        borderTopColor: "#d10809",
        borderBottomWidth: 1,
        borderBottomColor: "#d10809",
        paddingVertical: 10
    },
    lostText: {
        color: "#a45c34",
        fontSize: 15,
        fontWeight: "bold",
    },
    lostTitle: {
        textAlign: "center",
        color: "#ec1558",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5
    }
})
