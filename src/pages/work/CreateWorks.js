
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { getAuth} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export default function CreateWorks() {
  // const [newName, setNewName] = useState("");
  // const [newDepart, setNewDepart] = useState("");
  // const [newTarea, setNewTarea] = useState("");
  // const [newForm, setNewForm] = useState("");
  // const [estado, setEstado] = useState("");
  // const [urgencia, setUrgencia] = useState("");
  // const [creator, setCreator] =useState("");
   const workCollectionRef = collection(db, "work");
   const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  //const[images, setImages]=useState([]);

const [paraForm, SetParaForm] = useState({
    
    contracta: false,
    address: "no contratada",
    telNo:+34,
    contractaName:"no contratada",
    newName:"",
newDepart:"",
newTarea:"",
newForm:"",
estado:"",
urgencia:"",
creator:"",

images:{},
  });

  const {
   // images,
    address,
    contracta,
    telNo,
    contractaName,
    newName,
newDepart,
newTarea,
newForm,
estado,
urgencia,
creator,

images,
    } = paraForm;



  const auth = getAuth();
  const navigate = useNavigate();

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




  /// crear funcion que generar numero de Orden de trabajo para cada trabajo creado.
  function generate(n) {
    var add = 1,
      max = 12 - add;

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }



  const createJob = async () => {
   
       setLoading(true);

    if (images.length > 10) {
      setLoading(false);
      toast.error("No se permite mas de 10 imagenes");
      return;
    }
    

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
      setLoading(false);
      toast.error("Imagenes subido");
      return;
    });

  


    await addDoc(workCollectionRef, {
      name: newName,
      NameDepart: newDepart,
      Tareas: newTarea,
      TipoTrabajo: newForm,
      timestamp: serverTimestamp(),
      NumeroOT: generate(5),
      EstadoTrabajo: estado,
      Emergencia: urgencia,
      address: address,
      TelNo: telNo,
      Images:imgUrls,
      Creator: creator,
      contractaName:contractaName,
      timeStart: startDate.toString(),
      timeFinish: endDate.toString(),
      userRef: auth.currentUser.uid,
    })
      .then(() => {
        alert("Se ha creado orden de trabajo correctamente👍");
       

      })
      .catch((error) => {
        alert(error.message);
      });
  
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    createJob();
     navigate("/WorkList");
  };



  return (
    <div className="App">
      <Nav className="justify-content-center" activeKey="/Home">
        <Nav.Item>
          <Nav.Link
            href="/WorkList"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Listas de Trabajos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/MyForms"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Contactar con Nosotros
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/MyWorkList"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Mis listas de Trabajo Personal
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <Form.Control
              aria-label="Entra tu Nombre"
              id="newName"
               value={newName}
              onChange={onChange}
            />
          </InputGroup>
                <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Creator</InputGroup.Text>
            <Form.Control
              aria-label="Entra Nombre de creador de Orden"
               id="creator"
                value={creator}
               onChange={onChange}
            />
          </InputGroup>

          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Nombre de Departamento</InputGroup.Text>
            <Form.Control
              aria-label="Entra Nombre de Departamento aqui"
              id="newDepart"
               value={newDepart}
               onChange={onChange}
            />
          </InputGroup>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Seleciona tipo de trabajo contigo</Form.Label>
            <Form.Select
              defaultValue="..."
               onChange={onChange}
               id="newForm"
                value={newForm}
            >
              <option>....</option>
              <option>Preventivo</option>
              <option>Corectivo</option>
              <option>Predictivo</option>
              <option>Mejoras</option>
              <option>Propuesta</option>
            </Form.Select>
          </Form.Group>
          <div className="tareas">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>Discripcion de trabajo</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir Discripcion de trabajo"
                 id="newTarea"
                  value={newTarea}
                 onChange={onChange}
              />
            </InputGroup>
          </div>
          <div>
            <Form.Group className="ps-5 pe-5" controlId="formGridState">
              <Form.Label>Estado de Trabajo</Form.Label>
              <Form.Select
                defaultValue="..."
                 id="estado"
                  value={estado}
                onChange={onChange}
              >
                <option>....</option>
                <option>Abierta</option>
                <option>En curso</option>
                <option>Cerrado</option>
                <option>Planificado</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="ps-5 pe-5" controlId="formGridState">
              <Form.Label>Urgencia</Form.Label>
              <Form.Select
                defaultValue="..."
                 id="urgencia"
                 onChange={onChange}
              >
                <option>....</option>
                <option>Normal</option>
                <option>Planificado</option>
                <option>Urgente</option>
              </Form.Select>

              <p className="text-center font-semibold mt-3"> Contrata </p>
              <div className="flex mb-6">
                <button
                  type="button"
                  id="contracta"
                  value={true}
                  onClick={onChange}
                  className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
                    !contracta
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  Si
                </button>
                <button
                  type="button"
                  id="contracta"
                  value={false}
                  onClick={onChange}
                  className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
                    contracta
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  No
                </button>
              </div>
              {contracta && (
                <div>
                  <div>
                    <p className="text-center font-semibold mt-3">
                     Nombre de Contrata
                    </p>
                    <input
                      type="text"
                      id="contractaName"
                      value={contractaName}
                      onChange={onChange}
                      required
                      className=" m-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>
                  <div>
                    <p className="text-center font-semibold mt-3"> ADDRESS </p>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={onChange}
                      required
                      className=" m-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>
                  <div>
                    <p className="text-center font-semibold mt-3">
                      {" "}
                      Numero de Telefono{" "}
                    </p>
                    <input
                      type="text"
                      id="telNo"
                      value={telNo}
                      onChange={onChange}
                      required
                      className=" m-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>
                </div>
              )}
            </Form.Group>
          </div>

          <div className="mb-3 mt-3  ps-5 pe-5 ">
            Elegir Fecha de Inicio:
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="mb-3 mt-3  ps-5 pe-5 ">
            Elegir Fecha para Terminar:
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>

          
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            Primer imagen sera la cubierta (max 10)
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
          

          <div className="text-center">
            <Button
              className="mb-5 mt-3 ps-5 mx-auto"
              variant="primary"
              type="submit"
            >
              Crear Orden
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}


