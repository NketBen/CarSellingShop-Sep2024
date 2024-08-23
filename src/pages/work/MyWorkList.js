




import { getAuth} from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { useEffect } from "react";
import {useAuth} from "../../profileFoto/StorageInfo";
import Nav from 'react-bootstrap/Nav';


export default function MyWorkList() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [Name, setName] = useState();
   const currentUser = useAuth();

 useEffect(()=>{
       if (currentUser?.displayName) {
      setName(currentUser.displayName);
    }
    const workColledctionRef=collection(db,'work')
    const unsuscribe = onSnapshot(workColledctionRef, snapshot => {
         setWorks(snapshot.docs.map(doc=>({
            id:doc.id,
            data: doc.data()
        })))
        })
        return ()=> {
          unsuscribe()
        }
    }, [ ])


 const deleteWork = async (id) => {
    const userDoc = doc(db, "work", id);
    await deleteDoc(userDoc)
    .then(()=>  toast.success(" work eliminado correctamente👍"))
    .catch(error=>alert("No se encountra el documento!"))
  };

  return (
    <div className="bg-green-50">
      <Nav className="justify-content-center" activeKey="/Home">
       
        <Nav.Item>
          <Nav.Link href="/StaffHome">Contactar con Nosotros</Nav.Link>
        </Nav.Item>
  
      </Nav>

      <h2 className="text-2xl text-center font-semibold mb-6">Listas de Trabajos de {Name}</h2>
      {works.map((work, index) => {
         if (work.data.userRef === auth.currentUser.uid) {
           return (
             <unsuscribe>
               <li
                 key={index}
                 className="bg-lime-100 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
               >
                 <Link className="contents" to={`/open-work-order/${work.id}`}>
                   ID: {work.id} <br />
                   name: {work.data.name} <br />
                   Creador de OT: {work.data.Creator} <br />
                   Tarea: {work.data.Tareas} <br />
                   Tipo de Trabajo: {work.data.TipoTrabajo} <br />
                   Nombre de Departamento: {work.data.NameDepart} <br />
                   Numero de OT: {work.data.NumeroOT} <br />
                   Estado de Trabajo: {work.data.EstadoTrabajo} <br />
                   Emergencia: {work.data.Emergencia} <br />
                   Fecha de Inicio: {work.data.FechaInicio} <br />
                   Fecha para Terminaar: {work.data.FechaTerminar}
                   <br />
                 </Link>
                 <button
                   onClick={() => {
                     deleteWork(work.id);
                   }}
                   className="bg-slate-200 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                 >
                   {" "}
                   Delete Work
                 </button>
                 <button
                   onClick={() => {
                     navigate(`/edit-work-order/${work.id}`);
                   }}
                   className="bg-slate-200 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                 >
                   Editar OT
                 </button>
                 <button
                   onClick={() => {
                     navigate(`/close-work/${work.id}`);
                   }}
                   className="bg-slate-200 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                 >
                   Cerrar OT
                 </button>
               </li>
             </unsuscribe>
           );
         }
        return null;
      })}
    </div>
  );                             
}