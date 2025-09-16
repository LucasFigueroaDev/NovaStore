import { collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

export const saveOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, "orders"), order);
        console.log("Orden creada con ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al crear la orden: ", error);
        throw new Error("Error al crear la orden");
    }
};