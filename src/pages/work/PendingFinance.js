

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import StaffNavBar from "./StaffNavBar";


export default function PendingFinance() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const financeRef = collection(db, "finance"); //referencia a coleccion finance

  useEffect(() => {
    //hacemos copia instantenea para tener copia instantenea exacta en cuanto se cambia algo en la referencia
    const unsuscribe = onSnapshot(financeRef, (snapshot) => {
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
  }, [financeRef]);

  //funciones para borrar
  const deleteWork = async (id) => {
    const userDoc = doc(db, "finance", id);
    await deleteDoc(userDoc)
      .then(() => toast.success(" Orden de trabajo eliminado correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
  };

  return (
    <div className="bg-slate-400">
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

        <button
          onClick={() => {
            navigate("/MyWorkList");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Mis Trabajos
        </button>
      </nav>
      <h2 className="text-center">Listas de todos Solicitudes de Financiero </h2>

      <ul>
        {works.map((finance) => (
          <li
            key={finance.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
          <Link className="contents" to={`/open-finance/${finance.id}`}>
            <h3> Solicitante: {finance.data.Oldname}  con telefono: {finance.data.TelNo} y email: {finance.data.email}</h3>
            Car Tipo : {finance.type} <b /> <br />
            Nombre de Coche: {finance.data.name} <br />
            Dueños Anteriores {finance.data.previousOwners} <br />
            ITV: {finance.data.MOT} <br />
            Asientos en el coche: {finance.data.seats} <br />
            Discripcion de Financiero: {finance.data.discription} <br />
            Dirección de Cliente: {finance.data.address} <br />
            Años en Direccion anterior: {finance.data.yearInAddress} <br />
            Dirección de anteriores Cliente: {finance.data.oldAddress} <br />
            Estado de Vivienda: {finance.data.residencialStatus} <br />
            Empresa de Trabajo de Cliente: {finance.data.currentEmployment} <br />
            Años que cliente esta en este Empresar: {finance.data.yearsInEmployment} <br />
            Trabajo anteriores de cliente: {finance.data.oldEmployment} <br />
            cliente numero de telefono: {finance.data.TelNo} <br />
            cliente numero Banco: {finance.data.bankName}<br/>
            Direccion de Banco: {finance.data.bankAddress} <br />
            Nombre de duena de cuenta: {finance.data.accountHolderName} <br />
            Fecha para Terminar: {finance.data.accountNumber} <br/>
            Imagenes Adjuntados: {(finance.data.imgAdjuntado)? (finance.data.imgAdjuntado) : "NO imagen adjuntado"} <br/>
            


            </Link>
               
             <button
                onClick={() => {
                  navigate(`/open-attached-Finance/${finance.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
              Abre Documentos Adjuntados 
              </button>
            <br />
            <div>
              <button
                onClick={() => {
                  deleteWork(finance.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete Work
              </button>
              <button
                onClick={() => {
                  navigate(`/openFinance/${finance.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                Abre Expidiente Financiero de cliente
              </button>
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
