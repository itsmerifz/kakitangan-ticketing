import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { firebaseConfig } from "./config"

const app = firebase.initializeApp(firebaseConfig)
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = app.firestore()

export { auth, provider, app, db }