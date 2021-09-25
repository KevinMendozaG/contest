import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import random from 'random'


const db= firebase.firestore(firebaseApp)

export const getQuestion = async(category) => {
    const result = { statusResponse: true, error: null, question: "", answers: [], correctAns: null}
    const num = random.int((min = 1), (max = 5))
    try {
        console.log(category)
        const response = await db
            .collection("questions")
            .where("idQuestion", "==", `${num}`)
            // .where("idQuestion", "==", "1")
            // .where("category", "==", "Musica")
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
