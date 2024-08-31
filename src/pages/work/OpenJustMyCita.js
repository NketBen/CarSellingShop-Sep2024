

import React, { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { collection, doc, deleteDoc, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import { getAuth } from "firebase/auth";

//crear componente que hacer copia instantenea de cita de cliente 
export default function OpenJustMyCita() {
  const [citaLists, setCitaLists] = useState([]);
  const citaListColledctionRef = collection(db, "cita");
const auth = getAuth();
// esta useEffect solo busca en coleccion de cita en descendiente y un maximo de 1 documento
  useEffect(() => {
   const q = query(collection(db, "cita"),( orderBy("timestamp", "desc"), limit(1)));
    const unsuscribe =onSnapshot(q, (snapshot) => { 
      setCitaLists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsuscribe();
    };
  }, [citaListColledctionRef]);

  //creamos la opcion de borrar el cita
  const deletecitaList = async (id) => {
    const userDoc = doc(db, "cita", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza eliminada correctamente👍")) 
      .catch((error) => toast.error("No se encountra el documento!"));
  };
  
  return (
    <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">

      <h2 className="text-center">Citas Previa que Tiene Usted</h2>
        
      <ul>
        {citaLists.map((citaList) => {
         if(citaList.data.userRef === auth.currentUser.uid){ // solo ponemos en pantalla CitaPrevia que esta tiene uid como la de usuario
            return(           <li
               key={citaList.id}
               className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
                >
                 Nombre del solicitante : {citaList.data.Name} <b /> <br />

                 Numero de telefono : {citaList.data.Telefono} <br />

                 Email del cliente: {citaList.data.Email} <br />

                 Discripción de Cita: {citaList.data.Descripción} <br />

                 Hora de cita: {citaList.data.HoraCita} <br />

                 Fecha de Cita: {citaList.data.dateStored} <br />

                 Razon de cita: {citaList.data.RazonCita} <br />

                

             
              <br />
           
            <div>
              <button
                onClick={() => {
                  deletecitaList(citaList.id); //boton para poder borrar la cita
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                 >
                Delete citaList
              </button>
                        
            </div>
            <br />
          </li>

            )
         }  
         return null;
        })}
      </ul>
    </div>
  );
}
