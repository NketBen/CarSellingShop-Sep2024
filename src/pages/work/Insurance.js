import React, {useState} from "react";
 import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {getStorage, ref, uploadBytesResumable, getDownloadURL,} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import OAuth from './../../components/OAuth';





export default function Insurance (){

    const [newNombre, setNewNombre] = useState("");
    const [newApellido, setNewApellido] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDireccion1, setNewDireccion1] = useState("");
    const [newDireccion2, setNewDireccion2] = useState("");
    const [newCuidad, setNewCuidad] = useState("");
    const [newProvencia, setNewProvencia]=useState("")
    const [newCodPostal, setNewCodPostal] = useState("");
    const [telNo, setTelNo] = useState("");
    const [newOpcion, setNewOpcion] = useState("");
    const [newIdioma, setNewIdioma] = useState(""); 
    const [newTitulo, setNewTitulo] = useState(""); 
    const [newMessage, setNewMessage] = useState("");
    const [newTermino, setNewTermino] = useState(false);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [matricula, setMatricula] = useState("");
    const [compania, setCompania] = useState("");
    const [poliza, setPoliza] = useState("");
    const [fechaEffecto, setFechaEffecto] = useState("");
    const [tipo, setTipo] = useState("");
    const [banco, setBanco] = useState("");
    const [cuenta, setcuenta] = useState("");
    const [nombrBanco, setNombreBanco] = useState("");
    const [images, setImages] = useState({});
    
    
    const auth = getAuth();

    const [loader, setLoader] = useState(false);

    

    
    const usersCollectionRef = collection(db, "insurance");

      const createMessage = async () => {
        async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case 'paused':
               
                break;
              case 'running':
                
                break;
                default:
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoader(false);
      toast.error("Imagenes subido");
      return;
    });
    await addDoc(usersCollectionRef, {
       Nombre: newNombre,
       Apellido: newApellido,
       Email: newEmail,
       dateOfBirth:dateBirth,
       TelNo: telNo,
       Direccion1 : newDireccion1,
       Direccion2 : newDireccion2,
       Cuidad : newCuidad,
       Provencia: newProvencia,
       CodigoPostal: newCodPostal,
       Portador: newOpcion,
       Idioma : newIdioma,
       Titulo : newTitulo,
       Mensaje :newMessage,
       Marca: marca,
       Modelo:modelo,
       Matricula:matricula,
       Compania:compania,
       Poliza: poliza,
       FechaEfectivo: fechaEffecto,
       TipoPoliza: tipo,
       Banco:banco,
       CuentaBanco: cuenta,
       NameOfPersonAccountNo:nombrBanco,
       Termino: newTermino,
       userRef: auth.currentUser.uid,
       images:imgUrls
      
      })
       .then(() => {
        setLoader(true);
        toast.success("Su mensaje se envio correctamente👍");
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
    setImages();
    
  };



    const handleSubmit = e =>{
        e.preventDefault();

      createMessage();

    };
  
return(
    
 <div style={{ with:300, height:1000  }}>

 <h1 className="text-center">Formulario De Solicitud de Seguro</h1> 

  <Form onSubmit={handleSubmit}>
   <InputGroup className="mb-3 text-center ps-5 pe-5 ">
      <InputGroup.Text >Nombre</InputGroup.Text>
      <Form.Control aria-label="Entra tu Nombre" onChange={(e) => setNewNombre(e.target.value)}/>
    </InputGroup>

    <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Apellido</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setNewApellido(e.target.value)} />
    </InputGroup>

       <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Fecha de Nacimiento</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setDateBirth(e.target.value)} />
    </InputGroup>

       <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Numero de Telefono</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setTelNo(e.target.value)} />
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




              <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>¿El tomador es el mismo que propietario y conductor?</Form.Label>
          <Form.Select defaultValue="..." onChange={(e) => setNewOpcion(e.target.value)}>
          <option>....</option>
          <option>SI</option>
          <option>NO</option>
     
          </Form.Select>
        </Form.Group>





                   <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>Tipo seguro a contratar</Form.Label>
          <Form.Select defaultValue="..." onChange={(e) => setNewOpcion(e.target.value)}>
          <option>....</option>
          <option>Todo a riesgo sin franquicia</option>
          <option>Todo a riesgo con franquicia</option>
          <option>Tercero Ampliado(Incendio, Robo, Luna)</option>
          <option>Tercero + Luna</option>
          <option>Tercero Basico</option>
     
          </Form.Select>
        </Form.Group>




       <div>
       <h2 className="mb-3 text-center ps-5 pe-5"> Discripcion Vehiculo</h2>
                <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Marca de coche</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setMarca(e.target.value)} />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Modelo de Coche</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setModelo(e.target.value)} />
    </InputGroup>


     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Matricula de Coche</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setMatricula(e.target.value)} />
    </InputGroup>

       </div>


    <div>
    <h2 className="mb-3 text-center ps-5 pe-5"> Historia Bonificacion</h2>
         <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Companie</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setCompania(e.target.value)} />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Poliza</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setPoliza(e.target.value)} />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Fecha Efecto de seguro</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setFechaEffecto(e.target.value)} />
    </InputGroup>
    
    </div>

    <div>
    <h2 className="mb-3 text-center ps-5 pe-5"> Cuenta Bancaria</h2>
         <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Nombre de Banco</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setBanco(e.target.value)} />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Numero de cuenta  </InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setcuenta(e.target.value)} />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Nombre de persona que tiene la cuenta</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" onChange={(e) => setNombreBanco(e.target.value)} />
    </InputGroup>
    
    </div>



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

      
    <div className="mb-6 text-center">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
          Necisitamos que subas su DNI/NIE, copia de carnet de conducir, copia de carterla de banco y copia de tu poliza
             (maxima 50 documentos)  
          </p>
          <input
            type="file"
            id="images"
            onChange={(e) => setImages(e.target.value)}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>





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