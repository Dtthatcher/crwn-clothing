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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          }
          catch (error) {
              console.log('error creating user', error.message)
          }
      }
      return userRef
  }

  firebase.initializeApp(config);

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
      })

      await batch.commit()
  }

export const convertCollectionsSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(
          doc =>{
              const { title, items } = doc.data();

              return {
                  routeName: encodeURI(title.toLowerCase()),
                  id: doc.id,
                  title,
                  items
              }
          }
      );

      return transformedCollection.reduce((acc, collection) => {
          acc[collection.title.toLowerCase()] = collection;
          return acc;
      }, {});
  }

  export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(userAuth => {
              unsubscribe();
              resolve(userAuth);
          }, reject)
      })
  }

  export const auth = firebase.auth()
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

  export default firebase;