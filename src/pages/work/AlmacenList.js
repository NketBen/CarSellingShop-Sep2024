

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';

// para tener listas de todos piezas en almacen
export default function Almacen() {
  const [almacens, setAlmacens] = useState([]);
  const navigate = useNavigate();
  const almacenColledctionRef = collection(db, "almacen");// referencia de almacen coleccion

// se hacer snapshot para tener todos en amlacen coleccion
  useEffect(() => {
    const unsuscribe = onSnapshot(almacenColledctionRef, (snapshot) => {
      setAlmacens(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsuscribe();
    };
  }, [almacenColledctionRef]);

  const deletealmacen = async (id) => { // para quitar un lista
    const userDoc = doc(db, "almacen", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza eliminada correctamente👍")) 
      .catch((error) => toast.error("No se encountra el documento!"));
  };
  
  return (
    <div className="bg-slate-400">
      <nav className="mt-3 ps-4">
        
        <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>
      </nav>
      <h2 className="text-center">Listas de todos orden de trabajos </h2>

      <ul>
        {almacens.map((almacen) => ( //se recurre todos en almacen y se monstrar cada una en una lista la lista esta enlazado a OpenAlmacen
          <li
            key={almacen.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
            <Link className="contents" to={`/open-almacen/${almacen.id}`}>
              Numero de ÍTEM : {almacen.itemNumber} <b /> <br />
              Nombre de ALmacen: {almacen.data.Almacen} <br />
              Creador : {almacen.data.Creator} <br />
              Discripción de Pieza: {almacen.data.Descripción} <br />
              Frabricante de Pieza: {almacen.data.Fabricante} <br />
              Numero de Seriel de Fabricante: {almacen.data.FabricantePiezaNo} <br />
              Numero codeficado del Pieza: {almacen.data.ItemNumber} <br />
              Cantidad de Piezas: {almacen.data.CantidadDePiezas} <br />
              Nombre de Proveedor: {almacen.data.proveedorName} <br />
              Codigo de Pieza de Proveedor: {almacen.data.codigoPiezaProveedor} <br />
              Proveedor Numero de telefono: {almacen.data.TelNo} <br />
              Direccion de Proveedor: {almacen.data.address} <br />
              Fecha de almacenar: {almacen.data.dateStored} <br />
              
              <br />
            </Link>
            <div>
              <button
                onClick={() => {
                  deletealmacen(almacen.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete almacen
              </button>

            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
