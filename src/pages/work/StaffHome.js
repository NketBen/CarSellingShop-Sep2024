

import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import StaffNavBar from "./StaffNavBar";
export default function StaffHome() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [works, setWorks] = useState(null);
  const [loading, setLoading] = useState(true);
   
  
  function LogOut() {
    auth.signOut();
    navigate("/");
  }
  
 useEffect(() => {
    async function getUserWork() {
      const workRef = collection(db, "work");
      const q = query(
        workRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let works = [];
      querySnap.forEach((doc) => {
        return works.push({
          id: doc.id,
          data: doc.data(),
          
        });
          
      });
      setWorks(works);
      setLoading(false);
     
    }
    
    getUserWork();
  }, [auth.currentUser.uid]); 

 console.log(works)

  async function Delete(workID) {
    if (window.confirm("¿Estas seguro que quires Eliminar works?")) {
      await deleteDoc(doc(db, "work", workID));
      const updatedwork = works.filter(
        (work) => work.id !== workID
      );
      setWorks(updatedwork);
      toast.success(" work completamente Eliminado");
    }
  }
  function Edit(workID) {
    navigate(`/edit-work/${workID}`);
  }
  
  return (
    <div className="bg-green-100">
     <div>
      <StaffNavBar/>
    </div>
    

      <section className="max-w-6xl mx-auto flex justify-center works-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">
          Pagina Principal de Staff
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 text-center">
              <p
                onClick={LogOut}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer text-center"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/WorkList"
              className="flex justify-center works-center bg-red-200"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Listas de trabajos
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && (
          <div>
            <h2 className="text-2xl text-center font-semibold mb-6">
              Mis Orden de trabajos
            </h2>
            {works.map((work, index) => {
              if (work.data.userRef === auth.currentUser.uid) {
                return (
                  <li
                    key={index}
                    className="bg-lime-100 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
                  >
                    <Link
                      className="contents"
                      to={`/open-work-order/${work.id}`}
                    >
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
                        Delete(work.id);
                      }}
                      className="bg-slate-200 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                    >
                      Borrar OT
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
                );
              }
              return "No tienes Orden de trabajo";
            })}
          </div>
        )}
      </div>
    </div>
  );
}