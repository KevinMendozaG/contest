import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import random from 'random'
import { useFocusEffect } from '@react-navigation/core'
import { ListItem } from 'react-native-elements'

import { getQuestion } from '../utils/actions'
import Loading from '../components/Loading'

export default function PlayGame({ navigation, route }) {
    const { level } = route.params
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
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

    const num = random.int((min = 1), (max = 5)) 
    return (
        <View>
            <Text style={styles.title}>Nivel/Ronda: {level}    Categoria: {category}</Text>
            <Text style={styles.question}>{question}</Text>
            {/* {
                map(answers, (ans, id) =>(
                <ListItem
                    key= {id}
                    onPress = {()=> itemSelected(ans.name, ans.id)  }                
                >
                    <ListItem.Content>
                        <ListItem.Title>
                            {ans}             
                        </ListItem.Title>                                          
                    </ListItem.Content>                
                </ListItem>
            
                ))
            
            } */}
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
    }
})
