
import { useState } from "react";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { getAuth} from "firebase/auth";
import { toast } from "react-toastify";
import Almacen from './AlmacenList';

function CreateAlmacen() {
  const [manName, setManName] = useState("");
  const [description, setDescription] = useState("");
  const [ManPartNo, setManPartNo] = useState("");
  const [center, setCenter] = useState("");
  const [estado, setEstado] = useState("");
  const [itemNo, setItemNo] = useState("");
  const [creator, setCreator] =useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numerodePiezas, setNumerodePiezas]= useState(1);
  const [location, setLocation]= useState(0);
  const almacenCollectionRef = collection(db, "almacen");

const [paraForm, SetParaForm] = useState({
    
    proveedor: false,
    address: "no proveedor",
    telNo:+34,
    proveedorName:"no proveedor",
    codigoPiezaProveedor: "no proveedor",
  });

  const {
    address,
    proveedor,
    telNo,
    proveedorName,
    codigoPiezaProveedor,
    } = paraForm;



  const auth = getAuth();
  const navigate = useNavigate();

//crear y subir piezas a almacen de piezas

  const creatStore = async () => {
    await addDoc(almacenCollectionRef, {
      Fabricante: manName,
      Descripción: description,
      FabricantePiezaNo: ManPartNo,
      storeTime: serverTimestamp(),
      CantidadDePiezas: numerodePiezas,
      Almacen:center,
      ItemNumber:itemNo,
      address: address,
      TelNo: telNo,
      Creator: creator,
      proveedorName:proveedorName,
      codigoPiezaProveedor: codigoPiezaProveedor,
      UbicacionPiezaEnAlmacen: location,
      dateStored: startDate.toString(),
      userRef: auth.currentUser.uid,
    })
      .then(() => {
        toast.success("Se ha creado pieza en almacen correctamente👍");

      })
      .catch((error) => {
        alert(error.message);
      });
  
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    creatStore();
     navigate("/AlmacenList");
  };

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (!e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
   
  }

  return (
    <div>
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
            href="/AlmacenList"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Almacen
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
            <InputGroup.Text>Nombre de Fabricante</InputGroup.Text>
            <Form.Control
              aria-label="Entra tu Nombre de Fabricante"
              onChange={(event) => {
                setManName(event.target.value);
              }}
            />
          </InputGroup>
                <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Creador de inventario</InputGroup.Text>
            <Form.Control
              aria-label="Entra Nombre de creador de inventario"
              onChange={(event) => {
                setCreator(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Descripción de pieza</InputGroup.Text>
            <Form.Control
              aria-label="Entra descripción de pieza aqui"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </InputGroup>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Seleciona Almacen que va la pieza</Form.Label>
            <Form.Select
              defaultValue="..."
              onChange={(e) => setCenter(e.target.value)}
            >
              <option>....</option>
              <option>Almacen Central</option>
              <option>Almacen Mecanico</option>
              <option>Almacen Electrico</option>
            </Form.Select>
          </Form.Group>

          <div className="tareas">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>Número de pieza de Fabricante</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir numero de pieza del Fabricante"
                onChange={(e) => setManPartNo(e.target.value)}
              />
            </InputGroup>
          </div>

          <div>
            <Form.Group className="ps-5 pe-5" controlId="formGridState">
              <Form.Label>Estado de Piezas en Almacen</Form.Label>
              <Form.Select
                defaultValue="..."
                onChange={(e) => setEstado(e.target.value)}
              >
                <option>....</option>
                <option>En stock</option>
                <option>Accabado</option>
                <option>Nuevo</option>
                
              </Form.Select>
            </Form.Group>
          </div>

          <div className="item">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>Numero de Ítem </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir Discripcion de trabajo"
                onChange={(e) => setItemNo(e.target.value)}
              />
            </InputGroup>
          </div>
         


           <div className="item">
            <InputGroup className="mt-5 mb-4 pe-5 ps-5">
              <InputGroup.Text>ubicacion de pieza en almacen </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Escribir Discripcion de trabajo"
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
          </div>



         <div className="item">


        <InputGroup className="mt-5 mb-4 pe-5 ps-5">
        <InputGroup.Text>Cantidad de piezas</InputGroup.Text>
        <Form.Control aria-label="Cantidad de piezas a iserta in almacen" />
        
      </InputGroup>
          </div>


          <div>
            <Form.Group>
              <p className="text-center font-semibold mt-3"> Proveedor </p>
              <div className="flex mb-6">
                <button
                  type="button"
                  id="proveedor"
                  value={true}
                  onClick={onChange}
                  className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
                    !proveedor
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  Si
                </button>
                <button
                  type="button"
                  id="proveedor"
                  value={false}
                  onClick={onChange}
                  className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
                    proveedor
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  No
                </button>
              </div>
              {proveedor && (
                <div>
                  <div>
                    <p className="text-center font-semibold mt-3">
                     Nombre de Proveedor
                    </p>
                    <input
                      type="text"
                      id="proveedorName"
                      value={proveedorName}
                      onChange={onChange}
                      required
                      className=" m-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>

                  <div>
                   <p className="text-center font-semibold mt-3">
                     Codigo de Pieza del Proveedor
                    </p>
                    <input
                      type="text"
                      id="proveedorName"
                      value={codigoPiezaProveedor}
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



          <div className="text-center">
            <Button
              className="mb-5 mt-3 ps-5 mx-auto"
              variant="primary"
              type="submit"
            >
              Crear inventario de Piezas
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default CreateAlmacen;