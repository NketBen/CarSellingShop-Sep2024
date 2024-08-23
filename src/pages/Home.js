
import { collection, getDocs, limit, orderBy, query, where, } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
import { db } from "../firebase";

export default function Home() {
  // ofertas
  const [offerproductlists, setOfferProductLists] = useState(null);
  useEffect(() => {
    async function getItem() {
      try {
        // tener referencia
        const itemsRef = collection(db, "items");
        //Crear consulyas
        const q = query(
          itemsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // executar consultas
        const querySnap = await getDocs(q);
        const items = [];
        querySnap.forEach((doc) => {
          return items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferProductLists(items);
      } catch (error) {
        alert("No se puede cargar documentos");
      }
    }
    getItem();
  }, []);
  // lugar para coche nuevo
  const [newItems, setNewItems] = useState(null);
  useEffect(() => {
    async function getItem() {
      try {
        // obtener referencia
        const itemsRef = collection(db, "items");
        // crear consulta
        const q = query(
          itemsRef,
          where("type", "==", "new"),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        // executar consulta
        const querySnap = await getDocs(q);
        const items = [];
        querySnap.forEach((doc) => {
          return items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNewItems(items);
      } catch (error) {
        alert("No se puede cargar documentos");
      }
    }
    getItem();
  }, []);
  // lugar para nueva coche
  const [saleitems, setSaleItems] = useState(null);
  useEffect(() => {
    async function getItem() {
      try {
        //tener referencia de item
        const itemsRef = collection(db, "items");
        // crear consulta
        const q = query(
          itemsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        // executar este consulta
        const querySnap = await getDocs(q);
        const items = [];
        querySnap.forEach((doc) => {
          return items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleItems(items);
      } catch (error) {
        alert("No se puede cargar documentos");
      }
    }
    getItem();
  }, []);
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerproductlists && offerproductlists.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Ofertas Recientes
            </h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                ¿Quier ver mas Ofertas?
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerproductlists.map((item) => (
                <ProductList key={item.id} item={item.data} id={item.id} />
              ))}
            </ul>
          </div>
        )}
        {newItems && newItems.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Lugar de Ventas de coches Nuevos
            </h2>
            <Link to="/category/new">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                ¿Mas lugares de ventas de coche nuevos?
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {newItems.map((item) => (
                <ProductList key={item.id} item={item.data} id={item.id} />
              ))}
            </ul>
          </div>
        )}
        {saleitems && saleitems.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Lugar de Ventas de Second Hand coches
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                ¿Mas lugares de ventas de Second Hand Coches?
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saleitems.map((item) => (
                <ProductList key={item.id} item={item.data} id={item.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
