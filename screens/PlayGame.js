import React, { useCallback, useEffect, useState } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { ListItem } from 'react-native-elements'
import { map } from 'lodash'

import { getQuestion } from '../utils/actions'
import Loading from '../components/Loading'

export default function PlayGame({ navigation, route }) {
    const { level } = route.params
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [reload, setReload] = useState(false)
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            (async() =>{
                identifyCategory()
                setLoading(true)
                const response = await getQuestion(category)
                console.log(response.statusResponse)
                if(response.statusResponse){
                    setQuestion(response.question)
                    setAnswers(response.answers)
                }
                setLoading(false)
            })()
        }, [reload])
    )

    const identifyCategory = () =>{
        switch (level) {
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
        console.log(selectedAnswer)
        console.log(id)
    }

    return (
        <View>
            <Text style={styles.title}>Nivel/Ronda: {level}    Categoria: {category}</Text>
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
            <Loading
                isVisible= {loading}
                text="Cargando Pregunta..."
            />
        </View>
    )
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
    }
})
