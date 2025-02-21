import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD2-o060bT04cpPq1NuPEo2VA_SGW-cZsk",
    authDomain: "go-extension.firebaseapp.com",
    projectId: "go-extension",
    storageBucket: "go-extension.firebasestorage.app",
    messagingSenderId: "531386645510",
    appId: "1:531386645510:web:ec649c000273de847b1787",
    measurementId: "G-MGYYXZYEZG"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)