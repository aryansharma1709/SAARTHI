import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRxTmlAfC138TYxEEISsdtPxjqLvptwTE",
  authDomain: "alumini-31543.firebaseapp.com",
  projectId: "alumini-31543",
  storageBucket: "alumini-31543.firebasestorage.app",
  databaseURL: "https://alumini-31543-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "905919813918",
  appId: "1:905919813918:web:e4bad77c1811eb9b54510f"
};

const app = initializeApp(firebaseConfig);

export default app;
