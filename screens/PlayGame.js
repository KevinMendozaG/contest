import React, { useCallback, useEffect, useState } from 'react'
import {  StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { Button, ListItem } from 'react-native-elements'
import { map } from 'lodash'

import { getQuestion } from '../utils/actions'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

export default function PlayGame({ navigation, route }) {
    const { level, points } = route.params
    const [controlLevel, setControlLevel] = useState(level)
    const [controlPoints, setControlPoints] = useState(points)
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [reload, setReload] = useState(false)
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          () => exitGame(navigation)
        )
    
        return () => backHandler.remove()
      }, [])
    

    useFocusEffect(
        useCallback(() => {
            (async() =>{
                identifyCategory()
                setLoading(true)
                const response = await getQuestion(category)
                if(response.statusResponse){
                    setQuestion(response.question)
                    setAnswers(response.answers)
                    setCorrectAnswer(response.correctAns)
                }
                setLoading(false)
                setReload(false)
            })()
        }, [reload])
    )

    const identifyCategory = () =>{
        switch (controlLevel) {
            case 1:
                setCategory("Musica")
                break;
            case 2:
                setCategory("TV")
                break;
            case 3:
                setCategory("Matematicas")
                break;
            case 4:
                setCategory("Historia")
                break;
            default:
                setCategory("Fisica")
                break;
        }
    }

    const itemSelected = (ans, id) => {
        setSelectedAnswer(ans)
        console.log(correctAnswer)
        console.log(id)
        if (id==correctAnswer) {
            console.log("hola!!!")
            setControlLevel(controlLevel+1)
            setControlPoints(controlPoints+100)
            setReload(true)
            return
        }
        setShowModal(true)
        
    }

    return (
        <View>
            <Text style={styles.title}>Nivel/Ronda: {controlLevel}    Categoria: {category}</Text>
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
                onPress={() => exitGame(navigation)}
                
            />
            <Loading
                isVisible= {loading}
                text="Cargando Pregunta..."
            />
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    <Lose answers={answers} correctAnswer={correctAnswer} setVisible={setShowModal} navigation={navigation} wonPoints={controlPoints}/>
                }
            </Modal>
        </View>
    )
}

const exitGame = (navigation) => {
    console.log("hello??????")
    Alert.alert("Espera!", "Seguro que no quieres seguir participando?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Si, seguro", onPress: () => navigation.navigate("welcomePage") }
      ]);
      return true;
}

function Lose({answers, correctAnswer, setVisible, navigation, wonPoints}){

    return(
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
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center",
        alignItems: "flex-start",
        marginTop: 10
    },
    question: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "justify",
        alignItems: "flex-start"
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
        marginTop: 10
    },
    btn: {
        borderRadius: 20,
        backgroundColor: "#54bcec",
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
