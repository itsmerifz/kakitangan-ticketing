import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getStorage } from "firebase/storage"
import { firebaseConfig } from "./config"

const app = firebase.initializeApp(firebaseConfig)
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = app.firestore()
const storage = getStorage(app)

export { auth, provider, app, db, storage }