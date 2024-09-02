
import React, {useState} from "react";
 import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 import {BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { getFirestore } from "@firebase/firestore";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth} from "firebase/auth";


export default function MyForms (){

    const [newNombre, setNewNombre] = useState("");
    const [newApellido, setNewApellido] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDireccion1, setNewDireccion1] = useState("");
    const [newDireccion2, setNewDireccion2] = useState("");
    const [newCuidad, setNewCuidad] = useState("");
    const [newProvencia, setNewProvencia]=useState("")
    const [newCodPostal, setNewCodPostal] = useState("");
    const [newOpcion, setNewOpcion] = useState("");
    const [newIdioma, setNewIdioma] = useState(""); 
    const [newTitulo, setNewTitulo] = useState(""); 
    const [newMessage, setNewMessage] = useState("");
    const [newTermino, setNewTermino] = useState(false);
    const auth = getAuth();

    const [loader, setLoader] = useState(false);

    

    
    const usersCollectionRef = collection(db, "message");

      const createMessage = async () => { //subimos los contenidos de formulario a firebase mediante AddDoc
    await addDoc(usersCollectionRef, {
       Nombre: newNombre,
       Apellido: newApellido,
       Email: newEmail,
       Direccion1 : newDireccion1,
       Direccion2 : newDireccion2,
       Cuidad : newCuidad,
       Provencia: newProvencia,
       CodigoPostal: newCodPostal,
       GroupoEdad: newOpcion,
       Idioma : newIdioma,
       Titulo : newTitulo,
       Mensaje :newMessage,
       Termino: newTermino,
       userRef: auth.currentUser.uid,
      
      })
       .then(() => {
        setLoader(false);
        alert("Su mensaje se envio correctamente👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
    setNewNombre("");
    setNewApellido("");
    setNewEmail("");
    setNewDireccion1 ("");
    setNewDireccion2 ("");
    setNewCuidad ("");
    setNewProvencia ("");
    setNewCodPostal ("");
    setNewOpcion ("");
    setNewIdioma ("");
    setNewMessage("");
    setNewTermino("");
    setNewTitulo("");
  };


// se hace submit a firebase
    const handleSubmit = e =>{
        e.preventDefault();

      createMessage()
      
    };
  
return(
    
 <div style={{ with:300, height:1000  }}>

 <h1 className="text-center">Formulario De Contacto</h1> 

  <Form onSubmit={handleSubmit}>
   <InputGroup className="mb-3 text-center ps-5 pe-5 ">
      <InputGroup.Text >Nombre</InputGroup.Text>
      <Form.Control aria-label="Entra tu Nombre" onChange={(e) => setNewNombre(e.target.value)}/>
    </InputGroup>

    <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Apellido</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setNewApellido(e.target.value)} />
    </InputGroup>

      <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Entra tu email" onChange={(e) => setNewEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          No revelamos Email de nuestra clientes.
        </Form.Text>
      </Form.Group>
       
            <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formGridAddress1">
        <Form.Label>Direcion 1</Form.Label>
        <Form.Control placeholder="La calle" onChange={(e) => setNewDireccion1(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formGridAddress2">
        <Form.Label>Direccion 2</Form.Label>
        <Form.Control placeholder="Apartmento, estudio, planta, ..." onChange={(e) => setNewDireccion2(e.target.value)}/>
      </Form.Group>

      <Row className="mb-3 text-center ps-5 pe-5">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Cuidad</Form.Label>
          <Form.Control placeholder="Cuidad" onChange={(e) => setNewCuidad(e.target.value)}/>
        </Form.Group>
        <Form.Group className="text-center " as={Col} controlId="formGridState">
          <Form.Label>Provencia</Form.Label>
          <Form.Control  placeholder="Provencia" onChange={(e) => setNewProvencia(e.target.value)}/>
        </Form.Group>

        <Form.Group className="text-center" as={Col} controlId="formGridZip">
          <Form.Label>Codigo Postal</Form.Label>
          <Form.Control placeholder="Codigo Postal" onChange={(e) => setNewCodPostal(e.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group  className="mb-3 ps-5 pe-5">
          <Form.Label >
          Elegir la opcion que mas te conviene
          </Form.Label>
          
            <Form.Check
              type="radio"
              label="Nino"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              onChange={(e) => setNewOpcion(e.target.value.newOpcion)}
            />
            <Form.Check
              type="radio"
              label="Adolescente"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              onChange={(e) => setNewOpcion(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Adulto"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
              onChange={(e) => setNewOpcion(e.target.value)}
            />
        
        </Form.Group>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>Seleciona una idioma para comunicar contigo</Form.Label>
          <Form.Select defaultValue="..." onChange={(e) => setNewIdioma(e.target.value)}>
          <option>....</option>
          <option>Espanol</option>
          <option>Ingles</option>
          <option>Aleman</option>
          <option>Francis</option>
          <option>Italia</option>
          <option>Chino</option>
          </Form.Select>
        </Form.Group>

         <InputGroup className="mt-5 mb-4 pe-5 ps-5">
        <InputGroup.Text>Escribir tu Titulo/Referencia</InputGroup.Text>
        <Form.Control as="textarea" aria-label="Escribir tu comentario" onChange={(e) => setNewTitulo(e.target.value)} />
      </InputGroup>

       <InputGroup className="mt-5 mb-4 pe-5 ps-5">
        <InputGroup.Text>Escribir tu Comentario</InputGroup.Text>
        <Form.Control as="textarea" aria-label="Escribir tu comentario" onChange={(e) => setNewMessage(e.target.value)} />
      </InputGroup>


       <Form.Group className="mb-4 mt-4 ps-5 pe-5" id="formGridCheckbox">
       <Form.Label >
          He leido las terminos y condiciones  
          </Form.Label>
        <Form.Check type="checkbox" label="Acepto los terminos y condiciones " onChange={(e) => setNewTermino(e.target.value)}/>
      </Form.Group>

      <div className="text-center">
        <Button className="mb-5 mt-3 ps-5 mx-auto" variant="primary" type="submit">
        Enviar
        </Button>
      </div>
     
    </Form>
 </div>
);

}