import firebase from 'firebase/app'
import'firebase/firestore';
import'firebase/auth';

const config = {
    apiKey: "AIzaSyDW-W-6CNfUpLMZVUQ-LpZ00J8FpnaChCw",
    authDomain: "crwn-db-2b94c.firebaseapp.com",
    projectId: "crwn-db-2b94c",
    storageBucket: "crwn-db-2b94c.appspot.com",
    messagingSenderId: "634789123171",
    appId: "1:634789123171:web:4cc46f8e1ca5fe4c87d456",
    measurementId: "G-89KZHXGN92"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth()
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;