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
import { useParams } from "react-router-dom";

//componente que clasifica items. puede se nuevo, segunda mano o offerta
export default function Category() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastGetItem, setLastGetItem] = useState(null);
  const params = useParams();

  //hacer consulta para tener categoria
  useEffect(() => {
    async function getItems() {
      try {
        const itemRef = collection(db, "items");
        const q = query(
          itemRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        // consulta para tener las ultimas items
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastGetItem(lastVisible);
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
        toast.error("No se puede tener item");
      }
    }

    getItems();
  }, [params.categoryName]);

 // segiur buscar mas item
  async function getMoreItems() {
    try {
      const itemRef = collection(db, "items");
      const q = query(
        itemRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastGetItem),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastGetItem(lastVisible);
      const items = [];
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      //juntamos todos items en las consultas y se lo passamos a items
      setItems((prevState) => [...prevState, ...items]);
      setLoading(false);
    } catch (error) {
      toast.error("No se Puede tener item");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        {params.categoryName === "new"
          ? "Lugar Para Compra de Nueva Coche"
          : "Lugar de compra de Second Hand Coche"}
      </h1>
      {loading ? (
        <Spinner />
      ) : items && items.length > 0 ? (
        <div>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((item) => (
                <ProductList key={item.id} id={item.id} item={item.data} />
              ))}
            </ul>
          </main>
          {lastGetItem && (
            <div className="flex justify-center items-center">
              <button
                onClick={getMoreItems}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Tener items
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>
          No existe nuevo{" "}
          {params.categoryName === "new"
            ? "Lugar Para Compra de Nueva Coche"
            : "Lugar de compra de Second Hand Coche"}
        </p>
      )}
    </div>
  );
}
