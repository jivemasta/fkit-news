// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmeDN9KFnx_wmflno1CLgaJnVBovkaAu8",
  authDomain: "fkit-news.firebaseapp.com",
  projectId: "fkit-news",
  storageBucket: "fkit-news.appspot.com",
  messagingSenderId: "349868197989",
  appId: "1:349868197989:web:5a9eb7fa2faa5a39b11e8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

export function docStore<T>(path: string) {
    let unsubscribe: () => void;
    const docRef = doc(db, path);
  
    const { subscribe } = writable<T | null>(null, (set) => {
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        set((snapshot.data() as T) ?? null);
      });
  
      return () => unsubscribe();
    });
  
    return {
      subscribe,
      ref: docRef,
      id: docRef.id
    }
  }