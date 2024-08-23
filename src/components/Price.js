import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Price() {
  const params = useParams();
  const [newItems, setNewItems] = useState();
  const workColledctionRef = collection(db, "items");

  useEffect(() => {
    const unsuscribe = onSnapshot(workColledctionRef, (snapshot) => {
      setNewItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <div>
      {newItems?.map((item, index) => (
        <unsuscribe key={index}>
          {item.offer ? item.discountedPrice : item.realPrice}
        </unsuscribe>
      ))}
    </div>
  );
}
