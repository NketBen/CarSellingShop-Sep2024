

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



export default function ClientComplains() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const messageCollectionRef = collection(db, "message");

  useEffect(() => {
    const unsuscribe = onSnapshot(messageCollectionRef, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsuscribe();
    };
  }, [messageCollectionRef]);

  const deletemessage = async (id) => {
    const userDoc = doc(db, "message", id);
    await deleteDoc(userDoc)
      .then(() => alert("Tarea esta eliminada correctamente👍"))
      .catch((error) => alert("No se encountra el documento!"));
  };



  return (
    <div>
      <nav className="mt-3 ">
        <button
          onClick={() => {
            navigate("/CompletedWork");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Listas de Trabajos Acabado
        </button>
        <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>
      </nav>

      <h2 className="text-center">Listas de quejas de Clientes</h2>

      <ul className="bg-slate-100 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
        {messages.map((message) => (
          <li
            key={message.id}
            className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed"
          >
            Name: {message.data.Nombre} <br />
            Apellido: {message.data.Apellido} <br />
            Email: {message.data.Email} <br />
            Direccion1: {message.data.Direccion1} <br />
            Direccion2: {message.data.Direccion2} <br />
            Cuidad: {message.data.Cuidad} <br />
            Provencia: {message.data.Provencia} <br />
            CodigoPostal: {message.data.CodigoPostal} <br />
            GroupoEdad: {message.data.GroupoEdad} <br />
            Idioma: {message.data.Idioma} <br />
            Mensaje:{message.data.Mensaje} <br />
            Termino:{message.data.Termino} <br />
            <br />
            <button
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
              onClick={() => {
                deletemessage(message.id);
              }}
            >
              {" "}
              Delete message
            </button>
            <button
              onClick={() => {
                navigate(`/contact-us/${message.id}`);
               
              }}
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
            >
              Contestar Cliente
            </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
} 