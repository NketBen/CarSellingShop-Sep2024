import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StaffNavBar from "./StaffNavBar";


export default function Worklist() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const workColledctionRef = collection(db, "work");


  useEffect(() => {
    const unsuscribe = onSnapshot(workColledctionRef, (snapshot) => {
      setWorks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsuscribe();
    };
  }, [workColledctionRef]);

  const deleteWork = async (id) => {
    const userDoc = doc(db, "work", id);
    await deleteDoc(userDoc)
      .then(() => alert("Tarea esta eliminada correctamente👍"))
      .catch((error) => alert("No se encountra el documento!"));
  };
  
  return (
    <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
      <nav className="mt-3 ps-4">
      <StaffNavBar/>
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
        {works.map((work) => (
          <li
            key={work.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
            <Link className="contents" to={`/open-work-order/${work.id}`}>
              ID : {work.id} <b /> <br />
              Name: {work.data.name} <br />
              Creador de OT: {work.data.Creator} <br />
              Discripcion de trabajo: {work.data.Tareas} <br />
              Tipo de Trabajo: {work.data.TipoTrabajo} <br />
              Nombre de Departamento: {work.data.NameDepart} <br />
              Numero de Oredn de Trabajo: {work.data.NumeroOT} <br />
              Estado de Trabajo: {work.data.EstadoTrabajo} <br />
              Emergencia de Trabajo: {work.data.Emergencia} <br />
              Contrata Name: {work.data.contractaName} <br />
              Contracta Numero de telefono: {work.data.TelNo} <br />
              Direccion de Contracta: {work.data.Address} <br />
              Fecha de Inicio: {work.data.FechaInicio} <br />
              Fecha para Terminar: {work.data.FechaTerminar}
              <br />
               Imagenes adjuntados:  {work.data.Images? work.data.Images : "No imagenes adjuntado"} <br/>
            </Link>
            <div>
              <button
                onClick={() => {
                  deleteWork(work.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete Work
              </button>
              <button
                onClick={() => {
                  navigate(`/edit-work-order/${work.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                Editar OT
              </button>
              
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
