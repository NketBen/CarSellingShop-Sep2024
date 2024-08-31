

import React, { useEffect, useState } from "react";
import { collection, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import StaffNavBar from "./StaffNavBar";

export default function OpenWorkOrder() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [timer, setTimer] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const workColledctionRef = collection(db, "work");

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "work", params.worksId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorks(docSnap.data());
       
      } else {
        alert("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.worksId]); 
  
// Funcion para cuentar tiempo empleado en trabajo
const startTimer = () => {

  setTimeInterval(
    setInterval(() => {
       
      setTimer((prev) => prev + 1);
    }, 1000) // setInterval actualizara el interval timer cada 1000
  );
};

// funcion para pausar tiempo
const pauseTimer = () => {
  // eliminar intervalo de tiempo
  clearInterval(timeInterval);
};

// funcion para resetear tiempo
const resetTimer = () => {
 
  setTimer(0);
  // Eliminar interval y em pausa
  clearInterval(timeInterval);
};


  function handleSubmit(e) {
    e.preventDefault();
    if (timer === 0) {
      return toast.error("No tiempo registrado");
    }
   
    const workDoc = doc(db, "work", params.worksId);
    updateDoc(workDoc, {
       timer
          
    })
      .then((response) => {

        navigate(`/close-work/${params.worksId}`);
        toast.success(" tiempo registrado correctamente👍");
      })
      .catch((error) => {
        alert(error.message);
      });
  }



//opción para borrar documento en coleción work
  const deleteWork = async (id) => {
    const userDoc = doc(db, "work", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("Tarea esta eliminada correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
  };

  return (
    <div className="bg-slate-400 ">
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
      <h2 className="text-center">
        Orden de trabajos Creado Por {works.Creator}
      </h2>

      <div className="App">
        <h3 className="text-lime-800">
          Tiempo empleado: {parseFloat(timer / 3600).toFixed(2)}h{" "}
          {parseFloat(timer / 60).toFixed(2)}m {timer}s
        </h3>
        <div className="btn-wrapper">
          <button   // creamos botones para cuantar el tiempo
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 m-2 border-gray-300 rounded transition duration-150 ease-in-out"
            onClick={startTimer}
          >
            Start
          </button>

          <button  // creamos botones para pausar el tiempo
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 m-2 border-gray-300 rounded transition duration-150 ease-in-out"
            onClick={pauseTimer}
          >
            Pause
          </button>

          <button // creamos botones para resetear el tiempo
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 m-2 border-gray-300 rounded transition duration-150 ease-in-out"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>

      <h2 className="text-left ps-5 mt-3">
        Numero de OT: {works.NumeroOT}, Asignar a: {works.name}
      </h2>

      <p className="text-left ps-5 mt-3 ml-3">
        ID : {works.id} <b /> <br />
      </p>
      <p className="text-left ps-5 mt-3 ml-3 font-bold underline">
        Name: {works.name} <br />
      </p>
      <p className="text-left ps-5 mt-3 ml-3 mr-3 font-bold ">
        Creador de OT: {works.Creator} <br />{" "}
      </p>
      <h4 className="text-left ps-5 ml-3 mt-3 font-bold ">
        Discripcion de trabajo: {works.Tareas} <br />
      </h4>
      <p className="text-left ml-3 ps-5 mt-3 ml-3 font-bold text-stone-800">
        Tipo de Trabajo: {works.TipoTrabajo} <br />
        Nombre de Departamento: {works.NameDepart} <br />
        Numero de Oredn de Trabajo: {works.NumeroOT} <br />
        Estado de Trabajo: {works.EstadoTrabajo} <br />
        Emergencia de Trabajo: {works.Emergencia} <br />
      </p>
      <div className="text-left ps-5  ml-3 mr-3">
        Contrata Name: {works.contractaName} <br />
        Contracta Numero de telefono: {works.TelNo} <br />
        Direccion de Contracta: {works.address} <br />
      </div>

      <p className="text-left ps-5 mt-3 ml-3 mr-3 font-bold text-orange-900">
        Fecha de Inicio: {works.timeStart} <br />
        Fecha para Terminar: {works.timeFinish}
      </p>
      <br />

      <p className="text-left ps-5 mt-3 ml-3 mr-3">
      Imagenes adjuntados:   {(works.imgAdjuntado)? (works.imgAdjuntado) : "No imagen adjuntado"}  <br/>
      </p>
      

      <button
        onClick={() => {
          deleteWork(params.workId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      <button
        onClick={() => {
          navigate(`/edit-work-order/${params.worksId}`);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Editar OT
      </button>

      <Button // Este es boton para enviar a firebase
     
       onClick={handleSubmit}
          
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Cerrar OT
      </Button>
      <br />
    </div>
  );
}
