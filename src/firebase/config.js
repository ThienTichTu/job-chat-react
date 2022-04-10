import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBkLTJf4oLuu93W0vMU1WVPqvdXRlV64lg",
    authDomain: "job-chat-7e935.firebaseapp.com",
    projectId: "job-chat-7e935",
    storageBucket: "job-chat-7e935.appspot.com",
    messagingSenderId: "978967328300",
    appId: "1:978967328300:web:d95e20985b77aefc890389",
    measurementId: "G-VKB1MT5SDZ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()
const auth = firebase.auth()
// const storage = getStorage(firebaseApp);
const db = firebase.firestore()


const storage = getStorage();
// connectStorageEmulator(storage, "localhost", 9199);
// auth.useEmulator("http://localhost:9099", { disableWarnings: true })
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080')
// }

export { auth, db, storage };
export default firebase;