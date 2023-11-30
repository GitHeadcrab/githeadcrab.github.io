

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    getDoc, 
    doc,
    query,
    where
} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQuWYfjfeDXzMoHpv5_dBgs8igXeMVWjM",
  authDomain: "vanlife-42070.firebaseapp.com",
  projectId: "vanlife-42070",
  storageBucket: "vanlife-42070.appspot.com",
  messagingSenderId: "903605711848",
  appId: "1:903605711848:web:60e1f335134b3896c16a5d"
};

const openaiConfig = {
    apiKey: "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",
    postUrl: "https://api.openai.com/v1/completions"
};

// Initialize Firebase
const firestoreApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firestoreApp)

const vansCollectionRef = collection(firestoreDb, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function openaiPrompt(prompt) {
    await sleep(1000)
    const res = await fetch(openaiConfig.postUrl, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiConfig.apiKey}`
            },
            body: JSON.stringify({
                'model': 'text-davinci-003',
                'prompt': 'What is the capital of Spain?'
            })
    })
    const data = await res.json()

    console.log(data)
}