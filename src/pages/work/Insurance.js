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
import { Navigate, useNavigate } from "react-router-dom";
import OAuth from './../../components/OAuth';
import { useAuthStatus } from "../../hooks/useAuthStatus";





// componente para solicitar seguro de coches

export default function Insurance (){
   
    
    const auth = getAuth();

    const [loader, setLoader] = useState(false);

     const navigate = useNavigate();
      const { loggedIn, checkingStatus } = useAuthStatus();
 
 const [paraForm, SetParaForm] = useState({ 

  newApellido:"",
  dateBirth:"",
  newEmail: "",
  newDireccion1: "", 
  newDireccion2:"", 
  newCuidad:"", 
  newProvencia:"", 
  newCodPostal:"", 
  telNo:"", 
  newOpcion:"", 
  newIdioma:"", 
  newTitulo:"", 
  newMessage:"", 
  newTermino:"", 
  marca:"", 
  modelo:"", 
  matricula:"", 
  compania:"", 
  poliza:"", 
  fechaEffecto:"", 
  tipo:"", 
  banco:"", 
  cuenta:"", 
  nombrBanco:"", 
  images:{}, 
  newNombre:"", 
 
 });


  const {
  newApellido,
  dateBirth,
  newEmail,
  newDireccion1, 
  newDireccion2, 
  newCuidad, 
  newProvencia, 
  newCodPostal, 
  telNo, 
  newOpcion, 
  newIdioma, 
  newTitulo, 
  newMessage, 
  newTermino, 
  marca, 
  modelo, 
  matricula, 
  compania, 
  poliza, 
  fechaEffecto, 
  tipo, 
  banco, 
  cuenta, 
  nombrBanco, 
  images, 
  newNombre, 

    } = paraForm;


//creación de función para eventos de entradas
    function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

    
    const usersCollectionRef = collection(db, "insurance");//referencia para colección insurance

      const createMessage = async () => {
        async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`; // nombre para tener referecia de imagen
        const storageRef = ref(storage, filename); //referencia de storage
        const uploadTask = uploadBytesResumable(storageRef, image); //cargar imagen a storage
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
    //creación de documento en insurance con valores de formulario
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
       images:imgUrls,
       imgAdjutado: images.length,
      
      })
       .then(() => {
        setLoader(true);
        toast.success("Su mensaje se envio correctamente👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
  };



    const handleSubmit = e =>{
        e.preventDefault();
        if(!loggedIn){
    return toast.error("Tiene que inicia sesion anters de solicitar Seguro");
}

      createMessage();
       navigate("/Home") // si todo sale bien, iremos a ruta en PendingInsurance

    };
    
  
return(
    
 <div style={{ with:300, height:1000  }}>

 <h1 className="text-center">Formulario De Solicitud de Seguro</h1> 

  <Form onSubmit={handleSubmit}>
   <InputGroup className="mb-3 text-center ps-5 pe-5 ">
      <InputGroup.Text >Nombre</InputGroup.Text>
      <Form.Control aria-label="Entra tu Nombre"
      id="newNombre"
               value={newNombre}
              onChange={onChange}
      />
    </InputGroup>

    <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Apellido</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" 
      id="newApellido"
               value={newApellido}
              onChange={onChange}
      />
    </InputGroup>

       <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Fecha de Nacimiento</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" 
      id="dateBirth"
               value={dateBirth}
              onChange={onChange}
      />
      
    </InputGroup>

       <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Numero de Telefono</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
            id="telNo"
               value={telNo}
              onChange={onChange}
      />
      
    </InputGroup>

      <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Entra tu email" 
              id="newEmail"
               value={newEmail}
              onChange={onChange}
      />
        <Form.Text className="text-muted">
          No revelamos Email de nuestra clientes.
        </Form.Text>
      </Form.Group>
       
            <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formGridAddress1">
        <Form.Label>Direcion 1</Form.Label>
        <Form.Control placeholder="La calle"
              id="newDireccion1"
               value={newDireccion1}
              onChange={onChange}
      />
      </Form.Group>

      <Form.Group className="mb-3 text-center ps-5 pe-5" controlId="formGridAddress2">
        <Form.Label>Direccion 2</Form.Label>
        <Form.Control placeholder="Apartmento, estudio, planta, ..." 
              id="newDireccion2"
               value={newDireccion2}
              onChange={onChange}
      />
      </Form.Group>

      <Row className="mb-3 text-center ps-5 pe-5">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Cuidad</Form.Label>
          <Form.Control placeholder="Cuidad"
                id="newCuidad"
               value={newCuidad}
              onChange={onChange}
      />
        </Form.Group>


        <Form.Group className="text-center " as={Col} controlId="formGridState">
          <Form.Label>Provencia</Form.Label>
          <Form.Control  placeholder="Provencia"

               id="newProvencia"
               value={newProvencia}
              onChange={onChange}
      />
        </Form.Group>


        <Form.Group className="text-center" as={Col} controlId="formGridZip">
          <Form.Label>Codigo Postal</Form.Label>
          <Form.Control placeholder="Codigo Postal" 
          
               id="newCodPostal"
               value={newCodPostal}
              onChange={onChange}
          />
        </Form.Group>
      </Row>




              <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>¿El tomador es el mismo que propietario y conductor?</Form.Label>
          <Form.Select defaultValue="..." id="newOpcion" value={newOpcion} onChange={onChange}>
        
          <option>....</option>
          <option>SI</option>
          <option>NO</option>
          </Form.Select>
        </Form.Group>





          <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>Tipo seguro a contratar</Form.Label>
          <Form.Select defaultValue="..."  id="tipo" value={tipo} onChange={onChange}>
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
      <Form.Control aria-label="Entra tu Apellido"
       id="marca"
               value={marca}
              onChange={onChange}
          />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Modelo de Coche</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" 
             id="modelo"
               value={modelo}
              onChange={onChange}
          />
    </InputGroup>


     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Matricula de Coche</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
             id="matricula"
               value={matricula}
              onChange={onChange}
          />
    </InputGroup>

       </div>


    <div>
    <h2 className="mb-3 text-center ps-5 pe-5"> Historia Bonificacion</h2>
         <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Compania</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
             id="compania"
               value={compania}
              onChange={onChange}
          />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Poliza</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
             id="poliza"
               value={poliza}
              onChange={onChange}
          />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Fecha Efecto de seguro</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
             id="fechaEffecto"
               value={fechaEffecto}
              onChange={onChange}
          />
    </InputGroup>
    
    </div>

    <div>
    <h2 className="mb-3 text-center ps-5 pe-5"> Cuenta Bancaria</h2>
         <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Nombre de Banco</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
             id="banco"
               value={banco}
              onChange={onChange}
          />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Numero de cuenta  </InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" 
             id="cuenta"
               value={cuenta}
              onChange={onChange}
          />
    </InputGroup>

     <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Nombre de persona que tiene la cuenta</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido" 
             id="nombrBanco"
               value={nombrBanco}
              onChange={onChange}
          />
    </InputGroup>
    </div>



          <Form.Group className="ps-5 pe-5" controlId="formGridState">
          <Form.Label>Seleciona una idioma para comunicar contigo</Form.Label>
          <Form.Select defaultValue="..."
                 id="newIdioma"
               value={newIdioma}
              onChange={onChange}
          >
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
        <Form.Control as="textarea" aria-label="Escribir tu comentario"
               id="newTitulo"
               value={newTitulo}
              onChange={onChange}
          />
      </InputGroup>

       <InputGroup className="mt-5 mb-4 pe-5 ps-5">
        <InputGroup.Text>Escribir tu Comentario</InputGroup.Text>
        <Form.Control as="textarea" aria-label="Escribir tu comentario" 
               id="newMessage"
               value={newMessage}
              onChange={onChange}
          />
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
            onChange={onChange}
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
        <Form.Check type="checkbox" label="Acepto los terminos y condiciones " 
               id="newTermino"
               value={newTermino}
              onChange={onChange}
          />
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