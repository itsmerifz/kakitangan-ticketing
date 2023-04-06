import Cookies from "universal-cookie"
import { provider, auth, app } from "./firebase"

const cookies = new Cookies()

const db = app.firestore()

export const loginWithGoogle = async () => {
  try{
    const res = await auth.signInWithPopup(provider)
    const user = res.user
    const q = db.collection("users").where("uid", "==", user.uid)
    const querySnapshot = await q.get()
    if(querySnapshot.empty){
      db.collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      })
    }
    window.location.reload()
  }catch(err){
    console.error(err)
    alert(err.message)
  }
}

export const logOut = async () => {
  try{
    window.location.reload()
    cookies.remove("user")
    await auth.signOut()
  }catch(err){
    console.error(err)
    alert(err.message)
  }
}