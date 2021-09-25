import React, {useState, useCallback} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/core'
import { isEmpty, size } from 'lodash';

import Loading from '../components/Loading';
import { addDocumentWithoutId } from '../utils/actions';

//Pantalla para configurar las preguntas
export default function ConfigureGame({navigation}) {
    const [numQuestion, setNumQuestion] = useState(1)
    const [numCategory, setNumCategory] = useState(1)
    const [category, setCategory] = useState("")
    const [formData, setFormData] = useState(() => defaultFormValues(category))
    const [errorName, setErrorName] = useState("")
    const [errorAnswers, setErrorAnswers] = useState("")
    const [errorCorrectAnswer, setErrorCorrectAnswer] = useState("")
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [ans1, setAns1] = useState("")
    const [ans2, setAns2] = useState("")
    const [ans3, setAns3] = useState("")
    const [ans4, setAns4] = useState("")

    useFocusEffect(
        useCallback(() => {
            identifyCategory()
            setAns1(null)
            setAns2(null)
            setAns3(null)
            setAns4(null)
            setFormData(() => defaultFormValues(category))
            setReload(false)
        
        }, [reload])
    )

    //identificamos el nombre de la categoria segun el numero de la categoria en el que estemos actualmente
    const identifyCategory = () =>{
        switch (numCategory) {
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
    
    //Metodo para capturar la informacion de los inputs
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
        
    }

    //Metodo para agregar la pregunta y respuestas a la base de datos y recargar la pagina para ingresar
    //una nueva pregunta 
    const configureNextQuestion = async() =>{
        formData.answers.push(ans1,ans2,ans3,ans4)
        if (!validateData()){
            setAns1(null)
            setAns2(null)
            setAns3(null)
            setAns4(null)
            return;
        }
        setNumQuestion(numQuestion+1)
        formData.category = category
        formData.correctAnswer= formData.correctAnswer-1
        setLoading (true)
        const result = await addDocumentWithoutId("questions",formData)
        setLoading(false)

        if(!result.statusResponse){
            console.log(result.error)
        }
        setReload(true)
    }

    //Metodo para ingresar preguntas de la siguiente categoria
    const nextCategory = () =>{
        if (numCategory==6) {
            return
        } else {
            setNumCategory(numCategory+1)
            setReload(true)
        }
    }

    //Validar que se haya ingresado los datos correctamente, aun faltan unas falidaciones al campo entero
    const validateData = () =>{
        setErrorName("")
        setErrorAnswers("")
        setErrorCorrectAnswer("")
        let isValid = true

        if(isEmpty(formData.name)) {
            setErrorName("Debes de ingresar la pregunta.")
            isValid = false
        }
        
        if(isEmpty(ans1) | isEmpty(ans2) |isEmpty(ans3) | isEmpty(ans4)){
            setErrorAnswers("Debes ingresar las respuestas")
            isValid = false
        }

        if(size(formData.correctAnswer<0)){
            setErrorCorrectAnswer("Debes ingresar la respuesta correcta")
            isValid = false
        }
        return isValid
    }

    return (
        <ScrollView>
            <View style={styles.container}>

            <Text style={styles.title}>Ingresa la pregunta # {numQuestion}</Text>
            <Text style={styles.title}>Para la categoría: {category}</Text>
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la pregunta..."
                onChange= {(e) => onChange(e, "name")}
                errorMessage={errorName}
                defaultValue={formData.name}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la respuesta 1..."
                onChange= {(e) => setAns1(e.nativeEvent.text)}
                errorMessage={errorAnswers}
                defaultValue={ans1}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la respuesta 2..."
                onChange= {(e) => setAns2(e.nativeEvent.text)}
                errorMessage={errorAnswers}
                defaultValue={ans2}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la respuesta 3..."
                onChange= {(e) => setAns3(e.nativeEvent.text)}
                errorMessage={errorAnswers}
                defaultValue={ans3}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la respuesta 4..."
                onChange= {(e) => setAns4(e.nativeEvent.text)}
                errorMessage={errorAnswers}
                defaultValue={ans4}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa el numero de la pregunta correcta (1, 2, 3 o 4)..."
                
                onChange= {(e) => onChange(e, "correctAnswer")}
                errorMessage={errorCorrectAnswer}
                defaultValue={formData.correctAnswer}
            />
            <Button
                title="Siguiente Pregunta"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress= {() => configureNextQuestion()}
            />
            <Button
                title="Siguiente Categoría"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress= {() => nextCategory()}
            />
            <Button
                title="Salir"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress= {() => navigation.goBack()}
            />
            <Loading
                isVisible= {loading}
                text="Guardando Pregunta..."
            />
            </View>
        </ScrollView>
    )
}

const defaultFormValues = ({category}) => {
    return { name: "", category: category, answers: [], correctAnswer: ""} 
}

const styles = StyleSheet.create({
    input:{
        width: "100%"
    },
    btnContainer: {
        marginTop: 10,
        width: "95%",
        alignSelf:"center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    },
    title: {
        textAlign: "center",
        color: "#ec1558",
        fontSize: 25,
        fontWeight: "bold",
        marginTop:10
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
})
