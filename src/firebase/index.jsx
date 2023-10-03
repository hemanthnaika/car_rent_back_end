import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

export function GetData(id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const docRef = doc(db, "car", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [id]);
  return data;
}

export function CarRent(id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const docRef = doc(db, "car", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [id]);
  return data;
}

export function Details(id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const docRef = doc(db, "car", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [id]);
  return data;
}

export function Count(name) {
  console.log(name);
  const [data, setData] = useState(0);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const coll = collection(db, name);
        const snapshot = await getCountFromServer(coll);
        const total = snapshot.data().count;
        // return snapshot.data().count;
        setData(total);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [name]);
  return data;
}
