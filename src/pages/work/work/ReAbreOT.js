
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate, useParams } from "react-router-dom";
import StaffNavBar from "./StaffNavBar";

function ReAbreOT() {
  let today = new Date();
  const [name, setName] = useState();
  const [NameDepart, setNameDepart] = useState("");
  const [TipoTrabajo, setTipoTrabajo] = useState("");
  const [EstadoTrabajo, setEstadoTrabajo] = useState("");
  const [Emergencia, setEmergencia] = useState();
  const [NumeroOT, setNumeroOT] = useState("");
  const [whoDid, setWhoDid] = useState("");
  const [works, setWorks] = useState("");
  const [timeStart, setTimeStart] = useState(today.setHours(0, 0, 0, 0));
  const [timeFinish, setTimeFinish] = useState(today.setHours(0, 0, 0, 0));
  const [commentsTecnico, setCommentsTecnico] = useState("");
  const [hoursDone, setHoursDone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userRef, setUserRef] = useState("");
  const [Tareas, setTareas] = useState("");
  const [id, setId] = useState("");
  const [imgUrls, setImgUrls]= useState([]);
  const [creator, setCreator] = useState("");
  const [telNo, setTelNo] = useState(+34);
  const [contractaName, setContractaName] = useState("No contratada");
  const [address, setAddress] = useState("No contratada");
  const auth = getAuth();

  const navigate = useNavigate();
  const workCollectionRef = collection(db, "work");
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "workClosed", params.workClosedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorks(docSnap.data());
        setName(docSnap.data().name);
        setEmergencia(docSnap.data().Emergencia);

        setEstadoTrabajo(docSnap.data().EstadoTrabajo);

        setTareas(docSnap.data().Tareas);
        setWhoDid(docSnap.data().whoDid);
        setHoursDone(docSnap.data().hourDone);
        setTipoTrabajo(docSnap.data().TipoTrabajo);
        setNumeroOT(docSnap.data().NumeroOT);
         setImgUrls(docSnap.data().imageUrl);
        setNameDepart(docSnap.data().NameDepart);
        setImgUrls(docSnap.data().imageUrl);
        setAddress(docSnap.data().address);
        setTelNo(docSnap.data().TelNo);
        setContractaName(docSnap.data().contractaName);
        setCreator(docSnap.data().Creator);
        setUserRef(docSnap.data().userRef);
        setCommentsTecnico(docSnap.data().commentsTecnico);
        setId(docSnap.id);
        setTimeStart(docSnap.data().startDate);
        setTimeFinish(docSnap.data().endDate);
      } else {
        alert("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.workClosedId]);

  const createWork = async () => {
    await addDoc(workCollectionRef, {
      id: id,
      name: name,
      NameDepart: NameDepart,
      Tareas: Tareas,
      TipoTrabajo: TipoTrabajo,
      timestamp: serverTimestamp(),
      NumeroOT: NumeroOT,
      EstadoTrabajo: EstadoTrabajo,
      Emergencia: Emergencia,
      whoDid: whoDid,
      hourDone: hoursDone,
      startDate: startDate,
      endDate: endDate,
      address: address,
      TelNo: telNo,
      Creator: creator,
      timeStart: timeStart,
      timeFinish: timeFinish,
      contractaName: contractaName,
      commentsTecnico: commentsTecnico,
      userRef: userRef,
      imgUrls:imgUrls,
    })
      .then(() => {
        alert("Se ha creado orden de trabajo correctamente👍");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteWork = async () => {
    const userDoc = doc(db, "workClosed", id);
    await deleteDoc(userDoc)
      .then(() => alert("Tarea esta eliminada correctamente👍"))
      .catch((error) => alert("No se encountra el documento!"));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (commentsTecnico === "") {
      return navigate("/Worklist");
    }

    const workDoc = doc(db, "workClosed", id);
    updateDoc(workDoc, {
      Tareas,
      Emergencia,
      name,
      NameDepart,
      EstadoTrabajo,
      commentsTecnico,
      hoursDone,
      whoDid,
      timeStart: startDate.toString(),
      timeFinish: endDate.toString(),
    })
      .then((response) => {
      

        createWork();

        deleteWork();
       

        navigate("/Worklist");

          alert("Orden Re-abierta correctamente 👍");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="bg-red-100">
      <nav className="mt-3">
  <StaffNavBar/>
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
        <h2 className="mb-3 text-center ps-5 pe-5"> Orden de trabajo Re-abierta</h2>
        <h2 className="mb-3 text-center ps-5 pe-5">
          Numero de Orden de trabajo: {NumeroOT}  para {name}
        </h2>
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
          <InputGroup className="mb-3 text-center ps-5 pe-5 ">
            <InputGroup.Text>Tiempo total empleado</InputGroup.Text>
            <Form.Control
              aria-label="Entra tu Nombre"
              value={hoursDone}
              onChange={(event) => {
                setHoursDone(event.target.value);
              }}
            />
          </InputGroup>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Estado de Trabajo</Form.Label>
            <Form.Select
              defaultValue="..."
              value={EstadoTrabajo}
              onChange={(event) => {
                setEstadoTrabajo(event.target.value);
              }}
            >
              <option>....</option>
              <option>Abierta</option>
              <option>En curso</option>
              <option>Cerrado</option>
              <option>Planificado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="ps-5 pe-5" controlId="formGridState">
            <Form.Label>Emergencia</Form.Label>
            <Form.Select
              defaultValue="..."
              value={Emergencia}
              onChange={(event) => {
                setEmergencia(event.target.value);
              }}
            >
              <option>....</option>
              <option>Normal</option>
              <option>Planificado</option>
              <option>Urgente</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicEmail"
          >
            <Form.Label htmlFor="id">ID </Form.Label>
            <Form.Control
              type="Id"
              placeholder="copia y pone Id de orden de trabajo aqui"
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

          <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicPassword"
          >
            <Form.Label>Comentarios Tecnico de trabajo hecha</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Poner Comentarios de trabajos aqui. ¿que hiciste?"
              value={commentsTecnico}
              onChange={(e) => setCommentsTecnico(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicPassword"
          >
            <Form.Label>Listas de Personas involucrado</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Poner cada nombre aqui"
              value={whoDid}
              onChange={(e) => setWhoDid(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3 mt-3  ps-5 pe-5 ">
            Elegir Fecha de que Empezaste:
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="mb-3 mt-3  ps-5 pe-5 ">
            Elegir Fecha para que acabaste:
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
          >
            Re-abre OT
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ReAbreOT;