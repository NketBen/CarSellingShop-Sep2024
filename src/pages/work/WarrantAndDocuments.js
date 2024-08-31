



import { useState } from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function  WarrantAndDocuments() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [paraForm, SetParaForm] = useState({ //desestructuracion variables para su uso flexibles
   nameDoc:"",
   descriptionDoc: "",
   tipo:"",
   marca:"",
   newApellido:"",
   newEmail:"",
   telNo:"", 
   newNombre:"",
   modelo:"",
   matricula:"",
   images: {},
  });
  const { 
     newApellido,
     newEmail,
     telNo, 
     newNombre,
     nameDoc,
     descriptionDoc,
     tipo,
     marca,
     modelo,
     matricula,
     images,
    } = paraForm;

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

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (images.length > 10) {
      setLoading(false);
      toast.error("No se permite mas de 10 imagenes");
      return;
    }
    //tener imagenes para quardarlo
        async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filenameDoc = `${auth.currentUser.uid}-${image.nameDoc}-${uuidv4()}`;// identidad de imagen
        const storageRef = ref(storage, filenameDoc); // se crear referencia de storage
        const uploadTask = uploadBytesResumable(storageRef, image); //metodo uploadByte para subir imagen
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
                default:console.log("Something is wrong");
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            //se descarga url de imagen subido
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

        const Images = await Promise.all( //se guarda todos imagenes en Images
      [...images].map((image) => storeImage(image)) //bucle para recurir cada imagen
    ).catch((error) => {
      setLoading(false);
      toast.error("Imagenes subido");
      return;
    });

    const imgAdjuntado=images.length; // tener longitud de imagen

        const paraFormCopy = { //variable para guardar 
      ...paraForm,
      Images,
      imgAdjuntado,
    };
    delete paraFormCopy.images;

    delete paraFormCopy.images;
  
    const docRef = await addDoc(collection(db, "warrant"), paraFormCopy); // addDoc para subir su contenidos a firestore y storage
    setLoading(false);
    toast.success("Se ha creado listado de item correctamente");
    navigate("/WarrantAndDocumentsList");

  }

  if (loading) {
    return <Spinner />;
  }


  return (
    <main className="bg-red-100 px-2 mx-auto">
     <nav>
      <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>
     </nav>

      <h1 className="text-3xl text-center mt-6 font-bold">
        Gestor de Documentos e Garrantías
      </h1>
     
      <ol className="ml-5 ">
      Es necesaria incluir seguientes en docunentación para su consulta: <br/>
      El permiso de circulación del vehículo. <br/>
      La tarjeta de inspección técnica del vehículo (ITV). <br/>
      El carnet de conducir o permiso de conducción. <br/> 
      Informe reducido de la DGT <br/>
      Factura de Pago <br/>
      Transferencia bancaria al concesionario <br/>
      Contrato de financiación <br/>
      La nota simple del contrato financiación solicitándolo al Registro de Bienes Inmuebles de tu comunidad.<br/>
      Extractos bancarios <br/>
      Hoja de pedido o presupuesto inicial <br/>
      Modelo 576 <br/>
      Pago de seguro o contrato de este. 
      </ol>
     
    




      <form onSubmit={onSubmit}>

      <div className="mb-3 ps-5 pe-5  ">
      <h2 className="mb-3 mt-5 text-center "> Documentos para Adjuntar</h2>
      <p className="text-lg mt-3 font-semibold">Nombre De Documento</p>
        <input
          type="text"
          id="nameDoc"
          value={nameDoc}
          onChange={onChange}
          placeholder="Nombre de documentos"
          maxLength="32"
          minLength="5"
          required
          classNameDoc="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        <p className="text-lg font-semibold mt-3">Descripción de documento</p>
        <textarea
          type="text"
          id="descriptionDoc"
          value={descriptionDoc}
          onChange={onChange}
          placeholder="Descripción"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />  
      </div>
        
        <div className="mb-6 ">
       <h2 className="text-center">Información personal del Cliente</h2>
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
      <InputGroup.Text>Numero de Telefono</InputGroup.Text>
      <Form.Control aria-label="Entra tu Apellido"
            id="telNo"
               value={telNo}
              onChange={onChange}
      />
      
    </InputGroup>


      <InputGroup className="mb-3 text-center ps-5 pe-5">
      <InputGroup.Text>Email</InputGroup.Text>
      <Form.Control aria-label="entra su correo electronico"
          id="newEmail"
           value={newEmail}
          onChange={onChange}
      />
      
       </InputGroup>
    
        </div>      
   
       
          <Form.Group className="ps-5 pe-5 text-center font-bold" controlId="formGridState">
          <Form.Label>Tipo de Gestion</Form.Label>
          <Form.Select defaultValue="..."  id="tipo" value={tipo} onChange={onChange}>
          <option>....</option>
          <option>Financiación</option>
          <option>Compras</option>
          <option>Seguros</option>
          <option>Garantias</option>
          <option>Mantenimientos y arreglos</option>
     
          </Form.Select>
        </Form.Group>


        <div>
       <h2 className="mb-3 text-center ps-5 pe-5 mt-5"> Discripción Vehiculo</h2>
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






        <div className="mb-3 ps-5 pe-5  " >
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            imagen para adjuntar (max 50)
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
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Adjuntar Imagenes
        </button>
      </form>
    </main>
  );
}
