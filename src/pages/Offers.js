import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ProductList from "../components/ProductList";



export default function Offers() {
  const [items, setItems] = useState(null);
 const [loading, setLoading] = useState(true); 
  const [lastGetItems, setLastGetItems] = useState(null);
  useEffect(() => {
    async function getItems() {
      try {
        const itemRef = collection(db, "items");
        const q = query(
          itemRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastGetItems(lastVisible);
        const items = [];
        querySnap.forEach((doc) => {
          return items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setItems(items);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch item");
      }
    }

    getItems();
  }, []);

  async function getMoreItem() {
    try {
      const itemRef = collection(db, "items");
      const q = query(
        itemRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastGetItems),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastGetItems(lastVisible);
      const items = [];
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setItems((prevState)=>[...prevState, ...items]);
      setLoading(false);
    } catch (error) {
      toast.error("No hay mas item");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">Oferta</h1>
      {loading ? (
        <Spinner />
      ) : items && items.length > 0 ? (
        <div>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((item) => (
                <ProductList
                  key={item.id}
                  id={item.id}
                  item={item.data}
                />
              ))}
            </ul>
          </main>
          {lastGetItems && (
            <div className="flex justify-center items-center">
              <button
                onClick={getMoreItem}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                ¿Quieres Cargar mas Item?
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No existe oferta nueva</p>
      )}
    </div>
  );
}
