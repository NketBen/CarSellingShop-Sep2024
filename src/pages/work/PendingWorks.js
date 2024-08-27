
import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import {
  collection,
  doc,
  deleteDoc,
  query,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../../components/Spinner";
import StaffNavBar from "./StaffNavBar";

export default function PendingWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const workRef = collection(db, "work");
    const q = query(
      workRef,
      where("EstadoTrabajo", "!=", "Cerrado"),
      limit(30)
    );

    const unsuscribe = onSnapshot(q, (snapshot) => {
      setWorks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    //setWorks(works);
    setLoading(false);
    return () => {
      unsuscribe();
    };
  }, [works]);
  if (loading) {
    return <Spinner />;
  }

  const deleteWork = async (id) => {
    const userDoc = doc(db, "work", id);
    await deleteDoc(userDoc)
      .then(() => alert("Tarea esta eliminada correctamente👍"))
      .catch((error) => alert("No se encountra el documento!"));
  };

  return (
    <div>
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

      <div>
        <h1 className="text-3xl text-center mt-6 font-bold mb-6">
          Listas de Trabajo Pendiente
        </h1>
        <div>
          <ul>
            {works.map((work) => (
              <li
                key={work.id}
                className="mb-5 mt-3 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
              >
                <Link className="contents" to={`/open-work-order/${work.id}`}>
                  ID : {work.id} <b /> <br />
                  Name: {work.data.name} <br />
                  Creador de OT: {work.data.Creator} <br />
                  Discripcion de trabajo: {work.data.Tareas} <br />
                  Tipo de Trabajo: {work.data.TipoTrabajo} <br />
                  Nombre de Departamento: {work.data.NameDepart} <br />
                  Numero de Oredn de Trabajo: {work.data.NumeroOT} <br />
                  Estado de Trabajo: {work.data.EstadoTrabajo} <br />
                  Emergencia de Trabajo: {work.data.Emergencia} <br />
                  Contrata Name: {work.data.contractaName} <br />
                  Contracta Numero de telefono: {work.data.TelNo} <br />
                  Direccion de Contracta: {work.data.Address} <br />
                  Fecha de Inicio: {work.data.FechaInicio} <br />
                  Fecha para Terminar: {work.data.FechaTerminar} <br/>
                  Imagenes adjuntados:  {work.data.imgAdjuntado}
                  <br />
                </Link>
                <div>
                  <button
                    onClick={() => {
                      deleteWork(work.id);
                    }}
                    className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                  >
                    {" "}
                    Delete Work
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/edit-work-order/${work.id}`);
                    }}
                    className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                  >
                    Editar OT
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/close-work/${work.id}`);
                    }}
                    className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
                  >
                    Cerrar OT
                  </button>
                </div>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
