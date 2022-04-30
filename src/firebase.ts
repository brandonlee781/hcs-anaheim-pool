import { FirebaseOptions, initializeApp } from 'firebase/app'

import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCLTr44k_s8lQt2YQiNTwz42BDLHJdjXtE",
  authDomain: "hcs-pool-play.firebaseapp.com",
  databaseURL: "https://hcs-pool-play-default-rtdb.firebaseio.com",
  projectId: "hcs-pool-play",
  storageBucket: "hcs-pool-play.appspot.com",
  messagingSenderId: "356396912458",
  appId: "1:356396912458:web:b65ee1fc7d580d240ffbb3"
};

export const app = initializeApp(firebaseConfig);


const firestore = getFirestore(app)

enableIndexedDbPersistence(firestore)

export default firestore