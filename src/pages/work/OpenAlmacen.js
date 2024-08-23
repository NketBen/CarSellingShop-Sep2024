

import React, { useEffect, useState } from "react";
import { collection, getDoc, doc, deleteDoc, updateDoc,serverTimestamp  } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { getAuth} from "firebase/auth";


export default function OpenAlmacen() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [quantity, setQuantity] = useState();
  const [quantityToAdd, setQuantityToAdd] = useState();
 const auth = getAuth();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "almacen", params.almacenId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorks(docSnap.data());
        setQuantity(docSnap.data().CantidadDePiezas)
       
      } else {
        toast.success("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.almacenId]); 
  
// Funcion para cacular suma de piezas
  function handleSubmit(e) {
    e.preventDefault();
    if (quantityToAdd === 0) {
      return toast.error("No has puesto nada en campo de entrada");
    }
    
  
    
  
    const workDoc = doc(db, "almacen", params.almacenId);
    updateDoc(workDoc, {
        CantidadDePiezas:(parseInt(works.CantidadDePiezas) + parseInt(quantityToAdd)),
        storeTime: serverTimestamp(),
        userRef: auth.currentUser.uid,

          
    })
      .then((response) => {

        navigate("/AlmacenList");
        toast.success(" Almacen Actualizada correctamente👍");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }




  const deleteWork = async (id) => {
    const userDoc = doc(db, "almacen", id);
    await deleteDoc(userDoc)
      .then(() => toast.success("pieza esta eliminada correctamente👍"))
      .catch((error) => toast.error("No se encountra el documento!"));
  };

  return (
    <div className="bg-slate-400 bg-clip-border p-6 border-4 border-violet-300 border-dashed">
      <nav className="mt-3 ps-4">
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

        <button
          onClick={() => {
            navigate("/PendingWorks");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-8 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Trabajos Pendientes
        </button>
      </nav>
      <h2 className="text-center">
        Tipo de Almacen {works.Almacen}
      </h2>


      <h2 className="text-center">
        Cantidad de Piezaz en Actualidad : {works.CantidadDePiezas}
      </h2>

      <p className="text-right font-bold ">
         Descripcion de Pieza: {works.Descripción} <b /> <br />
      </p>
      <p className="text-center font-bold underline">
        Fabricante: {works.Fabricante} <br />
      </p>
      <p className="text-center font-bold ">
        {" "}
        Creador de Inventario: {works.Creator} <br />{" "}
      </p>
      <h4 className="text-center font-bold ">
        {" "}
        Fabricante numero de serie : {works.FabricantePiezaNo} <br />
      </h4>
      <p className="text-center font-bold text-stone-800">
       Numero de Pieza : {works.ItemNumber} <br />
        Ubicacion en Almacen: {works.UbicacionPiezaEnAlmacen} <br />

     
      ultima persona que atualizo: {works.userRef} <br/>
      </p>
      <div className="text-center m-3">
       Nombre de Proveedor: {works.proveedorName} <br />
        Proveedor Numero de telefono: {works.TelNo} <br />
        Direccion de Contracta: {works.address} <br />

        codigo de Pieza de Proveedor: {works.codigoPiezaProveedor}<br/>
      </div>
      <br />
      <button
        onClick={() => {
          deleteWork(params.workId);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Delete Work
      </button>
      
        <Form.Group
            className="mb-3 mt-3 ps-5 pe-5"
            controlId="formBasicEmail"
          >
            <Form.Label htmlFor="id">Suma con numero a escribir.</Form.Label>
            <Form.Control
              type="Id"
              placeholder="poner numero de piezas que quiere almacenar aqui.  Para quitar pieza poner numero en negativo."
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
      <Button
      onClick={handleSubmit}
          
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
      >
        Actualizar ccantidad de Piezas en Almacen
      </Button>
      <br />
    </div>
  );
}
