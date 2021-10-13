import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyAzLX-NTWmaSfSxdBiiJVg5OwKo9pqhI44",
    authDomain: "crwn-db-49da9.firebaseapp.com",
    projectId: "crwn-db-49da9",
    storageBucket: "crwn-db-49da9.appspot.com",
    messagingSenderId: "383725946000",
    appId: "1:383725946000:web:eab531152f1957ae878415"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef


} 
firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;