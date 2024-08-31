

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import StaffNavBar from "./StaffNavBar";

//componente para poder visualizar todoslos  guardado documentos en formato de imagen
export default function WarrantAndDocumentsList() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const warrantRef = collection(db, "warrant");//hace referencia de colecion warrant

  //Copia instantenea de coleccion warrant
  useEffect(() => {
    const unsuscribe = onSnapshot(warrantRef, (snapshot) => {
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
  }, [warrantRef]);// warrantRef es dependencia

  const deleteWork = async (id) => {
    const userDoc = doc(db, "warrant", id);
    await deleteDoc(userDoc)
      .then(() => toast.success(" Orden de trabajo eliminado correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
  };

  return (
    <div className="bg-slate-400 flex-1 ">
      <nav className="mt-3 ps-4">
      <StaffNavBar className="flex"/>
        <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>

        <button
          onClick={() => {
            navigate("/MyWorkList");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Mis Trabajos
        </button>
      </nav>
      <h2 className="text-center">Listas de todos Solicitudes de Seguros </h2>

      <ul>
        {works.map((warrant) => (
          <li
            key={warrant.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
          <Link className="contents" to={`/open-warrant-and-documentsList/${warrant.id}`}>
            <h3> Solicitante: {warrant.data.newApellido}  con telefono: {warrant.data.telNo} y email: {warrant.data.email}</h3>
            Nombre : {warrant.data.newNombre} <b /> <br />
            Apellido: {warrant.data.newApellido} <br />
            Numero de Telefono: {warrant.data.telNo} <br />
            Coreo Electronico: {warrant.data.email} <br />

            <h2 className="text-left ps-5 mt-3">Informacion de coche</h2>

            Marca: {warrant.data.marca} <br />
            Modelo: {warrant.data.modelo} <br />
            Matricula: {warrant.data.matricula} <br />

            <h2 className="text-left ps-5 mt-3">Informacion de Documentacion</h2>

            Compania: {warrant.data.nameDoc} <br />
            Poliza: {warrant.data.descriptionDoc} <br />
            Fecha Efectivo: {warrant.data.tipo} <br />
            

         <h2 className="text-left ps-5 mt-3">Imagenes Adjuntado</h2>

            Imagenes Adjuntado:  {(warrant.data.imgAdjuntado)? (warrant.data.imgAdjuntado) : "No imagen adjuntado"} <br/>
            

            </Link>
               
            <div>

              <button
                onClick={() => {
                  navigate(`/open-attached-warrant-andDocuments/${warrant.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                  Abre Documentos Adjuntados 
              </button>

              <button
                onClick={() => {
                  deleteWork(warrant.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete Work
              </button>
              <button
                onClick={() => {
                  navigate(`/open-warrant-and-documentsList/${warrant.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                Abre Expidiente Seguro del cliente
              </button>
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
