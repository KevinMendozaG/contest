import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import random from 'random'


const db= firebase.firestore(firebaseApp)

//Metodo para obtener la pregunta segun la categoria y segun un numero aleatorio dentro de la categoria
export const getQuestion = async(category) => {
    const result = { statusResponse: true, error: null, question: "", answers: [], correctAns: null}
    const num = random.int((min = 1), (max = 5))
    try {
        const response = await db
            .collection("questions")
            .where("idQuestion", "==", `${num}`)
            .where("category", "==", category)
            .get()
            
            response.forEach((doc) => {
                const data = doc.data()
                result.question = data.name
                result.answers = data.answers
                result.correctAns = data.correctAnswer

            })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

//Agregar documentos a la base de datos
export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

