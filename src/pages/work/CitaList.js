

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';


export default function CitaList() {
  const [citaLists, setCitaLists] = useState([]);
  const navigate = useNavigate();
  const citaListColledctionRef = collection(db, "cita");


  useEffect(() => {
    const unsuscribe = onSnapshot(citaListColledctionRef, (snapshot) => {
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

  const deletecitaList = async (id) => {
    const userDoc = doc(db, "cita", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza eliminada correctamente👍")) 
      .catch((error) => toast.error("No se encountra el documento!"));
  };
  
  return (
    <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
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
      <h2 className="text-center">Listas de todos Citas Previa </h2>

      <ul>
        {citaLists.map((citaList) => (
          <li
            key={citaList.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
            <Link className="contents" to={`/open-cita-list/${citaList.id}`}>
              Nombre del solicitante : {citaList.data.Name} <b /> <br />

             Numero de telefono : {citaList.data.Telefono} <br />

             Email del cliente: {citaList.data.Email} <br />

              Discripción de Cita: {citaList.data.Descripción} <br />

              Hora de cita: {citaList.data.HoraCita} <br />

              Fecha de Cita: {citaList.data.dateStored} <br />

              Razon de cita: {citaList.data.RazonCita} <br />

             Usuario: {citaList.data.userRef} <br />

             
              
              <br />
            </Link>
            <div>
              <button
                onClick={() => {
                  deletecitaList(citaList.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete citaList
              </button>

            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
