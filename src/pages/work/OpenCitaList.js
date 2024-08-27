import React, { useEffect, useState } from "react";
import {  getDoc, doc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth} from "firebase/auth";
import StaffNavBar from "./StaffNavBar";



export default function Opencitalist() {
  const [citalist, setcitalist] = useState([]);
  const[id,setId]=useState()
  const navigate = useNavigate();
  const params = useParams();
 const auth = getAuth();

  useEffect(() => { //hacermos consulta a firebase para tener documento con id de params.
    async function fetchData() {
      const docRef = doc(db, "cita", params.citaListId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setcitalist(docSnap.data());
        setId(docSnap.data().id)
       
      } else {
        toast.error("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.citaListId]); 
  
// un funcion para borrar documento
  const deleteWork = async (id) => {
    const userDoc = doc(db, "cita", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("cita esta eliminada correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
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

<h2> Solicitante: {citalist.Name}  con telefono: {citalist.Telefono} y email: {citalist.email}</h2>

       
            
         <div className="text-center font-bold ">
          Nombre de Client: {citalist.Name} <br />
        
         </div>
            
       
            Descripcion de Cita: {citalist.Descripcion} <br />
           
            Hora del cita: {citalist.HoraCita} <br />

             

            Razon del Cita: {citalist.RazonCita} <br />

            Telefono del cliente: {citalist.Telefono} <br/>

            Email del Client: {citalist.Email} <br />


            Fecha del cita del Cliente: {citalist.dateStored} <br />


            Usuario: {citalist.userRef} <br />
            
           

      <br />
      

      <button
        onClick={() => {
          deleteWork(params.citalistId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      <br />
    </div>
  );
}
