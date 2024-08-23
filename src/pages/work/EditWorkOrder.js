

import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import StaffNavBar from "./StaffNavBar";

export default function Update() {
  const [works, setWorks] = useState([]);
  const [name, setName] = useState("");
  const [NumeroOT, setNumeroOT] = useState("");
  const [Tareas, setTareas] = useState("");
  const [TipoTrabajo, setTipoTrabajo] = useState("");
  const [EstadoTrabajo, setEstadoTrabajo] = useState("");
  const [Emergencia, setEmergencia] = useState("");
  const [id, setId] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
     
      const docRef = doc(db, "work", params.workId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorks(docSnap.data());
        setName(docSnap.data().name);
       
        setEmergencia(docSnap.data().Emergencia);

        setEstadoTrabajo(docSnap.data().EstadoTrabajo);

        setTareas(docSnap.data().Tareas);

        setTipoTrabajo(docSnap.data().TipoTrabajo);
        setNumeroOT(docSnap.data().NumeroOT);
        setId(docSnap.id);
      } else {
         toast.error(" work order no se encuentra en base de datos");
      }
    }
    fetchData();
  }, [params.workId]); 


  

  function handleSubmit(e) {
    e.preventDefault();
    if (Tareas === "" || id === "") {
      return;
    }
    const workDoc = doc(db, "work", id);
    updateDoc(workDoc, { Tareas, Emergencia, name, EstadoTrabajo })
      .then((response) => {
        toast.success(" work creado correctamente");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const deleteWork = async (id) => {
    const userDoc = doc(db, "work", id);
    await deleteDoc(userDoc)
      .then(() => toast.success(" work creado correctamente 👍"))
      .catch((error) => toast.error("No se encuentra el documento 👍"));
  };

  return (
    <div>
      <nav className="mt-3">
      <StaffNavBar/>
        <button
          onClick={() => {
            navigate("/Worklist");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Listas de trabajos
        </button>

        <button
          onClick={() => {
            navigate("/MyWorkList");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Mis Trabajos
        </button>

        <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>
      </nav>
      <div>
        <h2 className="mb-3 text-center ps-5 pe-5"> Editar OT</h2>
        <h2 className="mb-3 text-center ps-5 pe-5">Numero de Orden de trabajo:  {NumeroOT}</h2>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <Form.Control
              aria-label="Entra tu Nombre"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </InputGroup>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Estado de Trabajo</Form.Label>
            <Form.Select
              defaultValue="..."
              value={EstadoTrabajo}
              onChange={(e) => setEstadoTrabajo(e.target.value)}
            >
              <option>....</option>
              <option>Abierta</option>
              <option>En curso</option>
              <option>Cerrado</option>
              <option>Planificado</option>
            </Form.Select>
          </Form.Group>

          <div>
            <Form.Group className="ps-5 pe-5" controlId="formGridState">
              <Form.Label>Emergencia</Form.Label>
              <Form.Select
                defaultValue="..."
                value={Emergencia}
                onChange={(e) => setEmergencia(e.target.value)}
              >
                <option>....</option>
                <option>Normal</option>
                <option>Planificado</option>
                <option>Urgente</option>
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicEmail"
          >
            <Form.Label htmlFor="id">ID</Form.Label>
            <Form.Control
              type="Id"
              placeholder="copia y pone Id aqui"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicPassword"
          >
            <Form.Label>Discripcion de Trabajo</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Poner descripcion de trabajo aqui"
              value={Tareas}
              onChange={(e) => setTareas(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Editar OT
          </Button>
        </Form>
      </div>
    </div>
  );
}
