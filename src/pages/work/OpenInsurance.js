
import React, { useEffect, useState } from "react";
import {  getDoc, doc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth} from "firebase/auth";
import StaffNavBar from "./StaffNavBar";


export default function OpenInsurance() {
  const [insurance, setInsurance] = useState([]);
  const[id,setId]=useState()
  const navigate = useNavigate();
  const params = useParams();
 const auth = getAuth();

  useEffect(() => { //hacermos consulta a firebase para tener documento con id de params.
    async function fetchData() {
      const docRef = doc(db, "insurance", params.insuranceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInsurance(docSnap.data());
        setId(docSnap.data().id)
       
      } else {
        toast.error("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.insuranceId]); 
  
// un funcion para borrar documento
  const deleteWork = async (id) => {
    const userDoc = doc(db, "insurance", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza esta eliminada correctamente👍"))
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

<h2> Solicitante: {insurance.Oldname}  con telefono: {insurance.TelNo} y email: {insurance.email}</h2>

         <p  className="text-right font-bold">
         Car Tipo : {insurance.Marca} <b /> <br />
         </p>
            <div className="text-center font-bold ">
            <h3> Solicitante: {insurance.Apellido}  con telefono: {insurance.TelNo} y email: {insurance.email}</h3>
            Nombre : {insurance.Nombre} <b /> <br />
            Apellido: {insurance.Apellido} <br />
            Fecha Nacimento {insurance.dateOfBirth} <br />
            Numero de Telefono: {insurance.TelNo} <br />
            Coreo Electronico: {insurance.Email} <br />
            Direccion1: {insurance.Direccion1} <br />
            Direccion2: {insurance.Direccion2} <br />
            Cuidad: {insurance.Cuidad} <br />
            Codigo Postal: {insurance.CodigoPostal} <br />
            Provencia: {insurance.Provencia}<br/>
            </div>


         
          
       <div className="text-center font-bold ">
       <h2 className="text-center">Informacion de coche</h2>

            Marca: {insurance.Marca} <br />
            Modelo: {insurance.Modelo} <br />
            Matricula: {insurance.Matriculat} <br />

       </div>

       <div  className="text-center font-bold ">
       <h2 className="text-center">Historia Bonificacion</h2>

            Compania: {insurance.Compania} <br />
            Poliza: {insurance.Poliza} <br />
            Fecha Efectivo: {insurance.FechaEfectivo} <br />
       
       </div>
             
            
       <div  className="text-center font-bold ">
       <h2 className="text-center">Informacion Bancaria</h2>

             Banco: {insurance.Banco}<br/>
            Cuenta de Banco: {insurance.CuentaBanco} <br />
            Nombre de duena de cuenta: {insurance.accountHolderName} <br />
            Nombre de persona que tiene cuenta: {insurance.NameOfPersonAccountNo} <br/>
            Imagenes Adjuntados: {insurance.images} <br/>
       
       </div>

           
       <div className="text-center font-bold ">
        <h2 className="text-center">Informacion Adicional</h2>
            
            Quiene llevara seguro: {insurance.Portador} <br/>
            Tipo de Poliza que quieres: {insurance.TipoPoliza}<br/>
       </div>

             
          <div className="text-center font-bold ">
            <h2 className="text-center">Mensaje Adjuntado</h2>

            Titulo Adjuntado: {insurance.Titulo}<br/>
            Mensaje Adjuntado: {insurance.Mensaje}<br/>

          </div> 
            
      <div className="text-center font-bold ">
        <h2 className="text-center">Imagenes Adjuntado</h2>

            Titulo Adjuntado: {insurance.images}<br/>
      </div>
         
            
         
        
           

      <br />
      
       <button
                onClick={() => {
                  navigate(`/open-attached-insurance/${params.insuranceId}`);
                }}
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              >
              Abre Documentos Adjuntados 
              </button>

      <button
        onClick={() => {
          deleteWork(params.insuranceId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      <br />
    </div>
  );
}
