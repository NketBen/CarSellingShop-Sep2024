
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";


//componente para contestar quejas y consultas. Solo se usar en clienteComplains para contestar clientes
export default function ContactUs({ userRef}) {
  const [cliente, setCliente] = useState([]);
  const [messages, setMessages] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const params = useParams();

//tener documento usando ruta de mensaje pulsado en ClientComplains
  useEffect(() => {
    async function getClient() {
      const docRef = doc(db, "message", params.messageId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCliente(docSnap.data());
        setTopic(docSnap.data().Titulo);
        setNombre(docSnap.data().Nombre);
        setEmail(docSnap.data().Email);
      } else {
        toast.error("No se puede tener datos de Cliente");
      }
    }
    getClient();
  }, [params.messageId]);

  function onChange(e) {
    setMessages(e.target.value);
  }
 
  return (
    <div className="bg-orange-100">
      <nav className="mt-3 mb-3 ps-4">
        <button
          onClick={() => {
            navigate("/ClientComplains");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Listas de quejas
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
                name="messages"
                id="messages"
                rows="2"
                value={messages}
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

          <a href={`mailto:${email}?Subject=${topic}&body=${messages}`}>
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