import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from 'lodash';

import Loading from '../components/Loading';

export default function ConfigureGame({navigation, route}) {
    const { num } = route.params
    const [numQuestion, setNumQuestion] = useState(num)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(() => defaultFormValues(numQuestion))
    const [errorName, setErrorName] = useState("")
    const [errorAnswers, setErrorAnswers] = useState("")
    const [errorCorrectAnswer, setErrorCorrectAnswer] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
        
    }

    const configureNextQuestion = async() =>{
        if (!validateData()){
            return;
        }

        setLoading (true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)

        if (!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

        navigation.navigate("account")
    }

    const validateData = () =>{
        setErrorName("")
        setErrorAnswers("")
        setErrorCorrectAnswer("")
        let isValid = true

        if(!validateEmail(formData.name)) {
            setErrorName("Debes de ingresar la pregunta.")
            isValid = false
        }

        if(isEmpty(formData.answers)){
            setErrorAnswers("Debes ingresar respuestas")
            isValid = false
        }

        if(isEmpty(formData.correctAnswer)){
            setErrorCorrectAnswer("Debes ingresar la respuesta correcta")
            isValid = false
        }
        return isValid
    }

    return (
        <View style ={styles.container}>
            <Text>Ingresa la pregunta {numQuestion} para la categoria {controlCategory}</Text>
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa la pregunta..."
                onChange= {(e) => onChange(e, "name")}
                errorMessage={errorName}
                defaultValue={formData.name}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu la respuesta 1..."
                onChange= {(e) => onChange(e, `${answers[0]}`)}
                errorMessage={errorAnswers}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu la respuesta 2..."
                onChange= {(e) => onChange(e, `${answers[1]}`)}
                errorMessage={errorAnswers}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu la respuesta 3..."
                onChange= {(e) => onChange(e, `${answers[2]}`)}
                errorMessage={errorAnswers}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa tu la respuesta 4..."
                onChange= {(e) => onChange(e, `${answers[3]}`)}
                errorMessage={errorAnswers}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa el numero de la pregunta correcta (1, 2, 3 o 4)..."
                onChange= {(e) => onChange(e, "correctAnswer")}
                errorMessage={errorCorrectAnswer}
                defaultValue={formData.correctAnswer}
            />

            <Button
                title="Siguiente pregunta"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress= {() => configureNextQuestion()}
            />
            <Loading
                isVisible= {loading}
                text="Guardando Pregunta..."
            />
        </View>
    )
}

const defaultFormValues = ({numQuestion}) => {
    return { idQuesion: `${numQuestion}`, name: "", category: "", answers: [], correctAnswer: null} 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input:{
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf:"center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
