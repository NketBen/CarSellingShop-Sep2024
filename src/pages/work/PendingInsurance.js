



import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";


export default function PendingInsurance() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const insuranceRef = collection(db, "insurance");

  useEffect(() => {
    const unsuscribe = onSnapshot(insuranceRef, (snapshot) => {
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
  }, [insuranceRef]);

  const deleteWork = async (id) => {
    const userDoc = doc(db, "insurance", id);
    await deleteDoc(userDoc)
      .then(() => toast.success(" Orden de trabajo eliminado correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
  };

  return (
    <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
      <nav className="mt-3 ps-4">
        <button
          onClick={() => {
            navigate("/PendingWorks");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Listas de Trabajos Pendiente
        </button>
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
        {works.map((insurance) => (
          <li
            key={insurance.id}
            className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
          <Link className="contents" to={`/open-insurance/${insurance.id}`}>
            <h3> Solicitante: {insurance.data.Apellido}  con telefono: {insurance.data.TelNo} y email: {insurance.data.email}</h3>
            Nombre : {insurance.data.Nombre} <b /> <br />
            Apellido: {insurance.data.Apellido} <br />
            Fecha Nacimento {insurance.data.dateOfBirth} <br />
            Numero de Telefono: {insurance.data.TelNo} <br />
            Coreo Electronico: {insurance.data.Email} <br />
            Direccion1: {insurance.data.Direccion1} <br />
            Direccion2: {insurance.data.Direccion2} <br />
            Cuidad: {insurance.data.Cuidad} <br />
            Codigo Postal: {insurance.data.CodigoPostal} <br />
            Provencia: {insurance.data.Provencia}<br/>

             <h2 className="text-center">Informacion de coche</h2>

            Marca: {insurance.data.Marca} <br />
            Modelo: {insurance.data.Modelo} <br />
            Matricula: {insurance.data.Matriculat} <br />

            <h2 className="text-center">Historia Bonificacion</h2>

            Compania: {insurance.data.Compania} <br />
            Poliza: {insurance.data.Poliza} <br />
            Fecha Efectivo: {insurance.data.FechaEfectivo} <br />

            <h2 className="text-center">Informacion Bancaria</h2>

             Banco: {insurance.data.Banco}<br/>
            Cuenta de Banco: {insurance.data.CuentaBanco} <br />
            Nombre de duena de cuenta: {insurance.data.accountHolderName} <br />
            Nombre de persona que tiene cuenta: {insurance.data.NameOfPersonAccountNo} <br/>
            Imagenes Adjuntados: {insurance.data.images} <br/>

             <h2 className="text-center">Informacion Adicional</h2>
            
            Quiene llevara seguro: {insurance.data.Portador}
            Tipo de Poliza que quieres: {insurance.data.TipoPoliza}
           
            <h2 className="text-center">Mensaje Adjuntado</h2>

            Titulo Adjuntado: {insurance.data.Titulo}
            Mensaje Adjuntado: {insurance.data.Mensaje}


         <h2 className="text-center">Imagenes Adjuntado</h2>

            Titulo Adjuntado: {insurance.data.images}
            




            </Link>
               
             <button
                onClick={() => {
                  navigate(`/open-attached-insurance/${insurance.id}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
              Abre Documentos Adjuntados 
              </button>
            <br />
            <div>
              <button
                onClick={() => {
                  deleteWork(insurance.id);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
                {" "}
                Delete Work
              </button>
              <button
                onClick={() => {
                  navigate(`/open-insurance/${insurance.id}`);
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
