import React, { useEffect, useState } from "react";
import {  getDoc, doc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth} from "firebase/auth";
import StaffNavBar from "./StaffNavBar";


export default function OpenWarrantAndDocumentsList() {
  const [warrant, setwarrant] = useState([]);
  const[id,setId]=useState()
  const navigate = useNavigate();
  const params = useParams();
 const auth = getAuth();

  useEffect(() => { //hacermos consulta a firebase para tener documento con id de params.
    async function fetchData() {
      const docRef = doc(db, "warrant", params.warrantId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setwarrant(docSnap.data());
        setId(docSnap.data().id)
       
      } else {
        toast.error("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.warrantId]); 
  
// un funcion para borrar documento
  const deleteWork = async (id) => {
    const userDoc = doc(db, "warrant", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza esta eliminada correctamente👍"))
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



         <p  className="text-right mr-6 font-bold">
         Car Tipo : {warrant.marca} <b /> <br />
         </p>
            <div className="text-left ps-5 mt-3">
            <h1> Guarantia y decumentaciones de: {warrant.newApellido}  con telefono: {warrant.telNo} y email: {warrant.email}</h1>
            Nombre : {warrant.newNombre} <b /> <br />
            Apellido: {warrant.Apellido} <br />
            Numero de Telefono: {warrant.telNo} <br />
            Coreo Electronico: {warrant.email} <br />
            </div>
            
          
       <div className="text-left ps-5 mt-3">
       <h2 className="text-left ps-5">Informacion de coche</h2>

            Marca: {warrant.marca} <br />
            Modelo: {warrant.modelo} <br />
            Matricula: {warrant.matricula} <br />

       </div>

       <div  className="text-left ps-5 mt-3">
       <h2 className="text-left ps-5">Informacion de Documentacion</h2>

            Compania: {warrant.nameDoc} <br />
            Poliza: {warrant.descriptionDoc} <br />
            Fecha Efectivo: {warrant.tipo} <br />
       
       </div>
             
      <div className="text-left ps-5 mt-3">
        <h2 className="text-left ps-5">Imagenes Adjuntado</h2>

            Imagenes Adjuntado: {(warrant.imgAdjuntado)? (warrant.imgAdjuntado) : "NO imagen adjuntado"} <br/>
            
      </div>     

      <br />
      
       <button
                onClick={() => {
                  navigate(`/open-attached-warrant-andDocuments/${params.warrantId}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
              Abre Documentos Adjuntados 
              </button>

      <button
        onClick={() => {
          deleteWork(params.warrantId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      <br />
    </div>
  );
}
