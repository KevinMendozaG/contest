import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCtLeZPSP_sXxn-gh_Ggvg96iAUQMVvBtE",
    authDomain: "contest-2540e.firebaseapp.com",
    projectId: "contest-2540e",
    storageBucket: "contest-2540e.appspot.com",
    messagingSenderId: "793766680773",
    appId: "1:793766680773:web:ea5ad394a14bbfc73b38ac"
  }


  export const firebaseApp = firebase.initializeApp(firebaseConfig)