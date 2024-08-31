



import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";


//opcion para contestar usurio que ha pedido cita
// coge id de cita abierta y a tener los valores se le poner en react hook para luego asignarlo a campo de entradas 
export default function CitaReply({ userRef}) {
  const [cliente, setCliente] = useState([]);
  const [messages, setMessages] = useState();
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState();
  const [nombre, setNombre] = useState("");
const [hora, setHora] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getClient() {
      const docRef = doc(db, "cita", params.citaListId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCliente(docSnap.data());
        setTopic(docSnap.data().RazonCita);
        setNombre(docSnap.data().Name);
        setEmail(docSnap.data().Email);
       setHora(docSnap.data().HoraCita)
      } else {
        toast.error("No se puede tener datos de Cliente");
      }
    }
    getClient();
  }, [params.citaListId]);

  console.log(cliente)
 
 const message=[ nombre, email, topic, hora ]
  function onChange(e) {
    setHora(e.target.value);
  }
 
  return (
    <div className="bg-orange-100">
      <nav className="mt-3 mb-3 ps-4">
        <button
          onClick={() => {
            navigate("/CitaList");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Volver a Listas de Cita Previa
        </button>
      </nav>

      {cliente !== null && (
        <div className="flex flex-col w-">
          <p className="text-center">
            Contestando a {email}, {nombre}
          </p>
          <div className="mt-3 mb-6">
            <label className="text-center">
              Tema de Mensaje
              <input
                type="text"
                name="topic"
                placeholder="escribir su tema de mensaje"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className=" mx-5 mr-8 w-full px-5 py-4 text-xl text-white-700 bg-blue border border-red-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              />
            </label>
            <br />
            <label className="text-center mt-5 mb-4">
              Email de Cliente
              <input
                type="email"
                name="email"
                placeholder="escribir email de cliente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" mx-5 w-full px-5 py-4 text-xl text-gray-700 bg-white border border-blue-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 "
              />
            </label>
            <br />

              

            <label className="text-center">
              Escribir su mensaje
              <textarea
                name="hora"
                id="hora"
                rows="2"
                value={hora}
                placeholder="escribir su mensaje"
                onChange={onChange}
                className="  mx-5 w-full px-5 py-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              ></textarea>
            </label>
          </div>
          <div className="text-center">
            <p>
              Tecnico de Car Selling Shop Ltd Avenida los Hestos 50, pabillon 7,
              01010 Vitoria Gasteiz, Alava, Pais Vasco Spain.
            </p>
          </div>

          <a href={`mailto:${email}?Subject=${topic}&body=${hora}`}>
            <button
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
              type="button"
            >
              Enviar Menseje
            </button>
            
          </a>
          
        </div>
      )}
    </div>
  );
}