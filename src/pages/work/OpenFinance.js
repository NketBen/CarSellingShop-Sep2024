import React, { useEffect, useState } from "react";
import {  getDoc, doc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth} from "firebase/auth";
import StaffNavBar from "./StaffNavBar";


export default function OpenFinance() {
  const [finance, setFinance] = useState([]);
  const[id,setId]=useState()
  const navigate = useNavigate();
  const params = useParams();
 const auth = getAuth();

  useEffect(() => { //hacermos consulta a firebase para tener documento con id de params.
    async function fetchData() {
      const docRef = doc(db, "finance", params.financeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFinance(docSnap.data());
        setId(docSnap.data().id)
       
      } else {
        toast.error("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.financeId]); 
  
// un funcion para borrar documento
  const deleteWork = async (id) => {
    const userDoc = doc(db, "finance", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza esta eliminada correctamente👍"))
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

 
      </nav>

<h2> Solicitante: {finance.Oldname}  con telefono: {finance.TelNo} y email: {finance.email}</h2>

         <p  className="text-right font-bold mr-6">
         Tipo de Coche : {finance.type} <b /> <br />
         </p>
            
         <p className="text-left ml-6 font-bold ">
          Nombre de Coche: {finance.name} <br />
            Dueños Anteriores {finance.previousOwners} <br />
            ITV: {finance.MOT} <br />
            Asientos en el coche: {finance.seats} <br />
            Discripcion de Financiero: {finance.discription} <br />
            Dirección de Cliente: {finance.address} <br />
            Años en Direccion anterior: {finance.yearInAddress} <br />
            Dirección de anteriores Cliente: {finance.oldAddress} <br />
            Estado de Vivienda: {finance.residencialStatus} <br />
            Empresa de Trabajo de Cliente: {finance.currentEmployment} <br />
            Años que cliente esta en este Empresar: {finance.yearsInEmployment} <br />
            Trabajo anteriores de cliente: {finance.oldEmployment} <br />
            cliente numero de telefono: {finance.TelNo} <br />
            cliente numero Banco: {finance.bankName}<br/>
            Direccion de Banco: {finance.bankAddress} <br />
            Nombre de duena de cuenta: {finance.accountHolderName} <br />
            Fecha para Terminar: {finance.accountNumber} <br/>
            Imagenes Adjuntados:  {(finance.imgAdjuntado)? (finance.imgAdjuntado) : "NO imagen adjuntado"} <br/>
           

         
         </p>
           

      <br />
      
       <button
                onClick={() => {
                  navigate(`/open-attached-finance/${params.financeId}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
              Abre Documentos Adjuntados 
              </button>

      <button
        onClick={() => {
          deleteWork(params.financeId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      <br />
    </div>
  );
}
