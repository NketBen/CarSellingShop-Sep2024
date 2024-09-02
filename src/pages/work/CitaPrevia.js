

import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import {
  collection,
  doc,
  addDoc,
 getDocs,
 query,
 where,
 orderBy,
 limit,
 serverTimestamp
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useParams  } from "react-router-dom";
import { toast } from "react-toastify";


export default function CitaPrevia() {
  const [manName, setManName] = useState("");
  const [description, setDescription] = useState("");
  const [telNo, setTelNo] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const[reason, SetReason]= useState("");
  const[hora, SetHora]= useState("");
    const[email, setEmail]= useState("");
  const [id, setId] = useState();

  const citaCollectionRef = collection(db, "cita");



  const auth = getAuth();
  const navigate = useNavigate();
  const params=useParams();
   const { loggedIn, checkingStatus } = useAuthStatus();

//crear y subir cita a coleccion cita

  const creatStore = async () => {
    await addDoc(citaCollectionRef, {
      Name: manName,
      Descripción: description,
      RazonCita:reason,
      Telefono: telNo,
      Email: email,
      dateStored: startDate.toString(),
      HoraCita: hora,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    })
      .then(() => {
        toast.success("Se ha creado Cita  correctamente👍");

      })
      .catch((error) => {
        alert(error.message);
      });
   
   
   };



  const handleSubmit = (e) => {
    e.preventDefault();
if(startDate<new Date()){
    return toast.error("fecha elegido debe ser hoy o posterior");
}

if(!loggedIn){
    return toast.error("Tiene que inicia sesion anters de solicitar Cita");
}
    creatStore();

   
     navigate("/OpenJustMyCita")
  };


 

  return (
    <div>
    <div className="App">


      <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Nombre de Persona</InputGroup.Text>
            <Form.Control
              aria-label="Entra tu Nombre de Fabricante"
              onChange={(event) => {
                setManName(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Descripción de cita</InputGroup.Text>
            <Form.Control
              aria-label="Entra descripción de pieza aqui"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </InputGroup>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Seleciona tipo de cita</Form.Label>
            <Form.Select
              defaultValue="..."
              onChange={(e) => SetReason(e.target.value)}
            >
              <option>....</option>
              <option>Financiacion</option>
              <option>Venta de Coche</option>
              <option>Seguros de coche </option>
              <option>Garantias </option>
              <option>Consultas </option>
            </Form.Select>
          </Form.Group>


         <Form.Group className="ps-5 pe-5" controlId="formGridState">
         <p className="mb-3 ps-5 pe-5">Trabajamos de Lunes a viernes 9:00 hasta 18:00 y Sabado de 10:00 hasta 16:00</p>
            <Form.Label>Seleciona Hora que quiere </Form.Label>
            <Form.Select
              defaultValue="..."
              onChange={(e) => SetHora(e.target.value)}
            >
              <option>....</option>
              <option>9-9:30</option>
              <option>9:30-10</option>
              <option>10:30-11 </option>
              <option>11:30-12 </option>
              <option>12:30-13 </option>
              <option>13:30-14 </option>
              <option>14:30-15 </option>
              <option>15:30-16 </option>
              <option>16:30-17 </option>
              <option>17:30-18 </option>
            </Form.Select>
          </Form.Group>

            <div className="mb-3 mt-3  ps-5 pe-5 ">
            Elegir Fecha de cita:
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>



          <div className="item">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>Numero de telefono </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir Discripcion de trabajo"
                onChange={(e) => setTelNo(e.target.value)}
              />
            </InputGroup>
          </div>
         
         <div className="item">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>Email </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir Discripcion de trabajo"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </div>

          


          <div className="text-center">
            <Button
              className="mb-5 mt-3 ps-5 mx-auto"
              variant="primary"
              type="submit"
            >
              Pedir Cita
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}






