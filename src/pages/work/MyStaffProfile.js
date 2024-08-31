



import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import ProfileInfo from "../../profileFoto/ProfileInfo";
import StaffNavBar from "./StaffNavBar";

//Perfil de usuario en staff
export default function MyStaffProfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
     
  });
  const { name, email } = formData;
  function LogOut() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //actualizar nombre de usuario 
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Actualizar usuario en firebase

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Se ha actualizado perfil correctamente 👍");
    } catch (error) {
      toast.error("Se ha producido un error, perfil no actualizado");
    }
  }

  //hacemos consulta para tener tareas assignado a usuario actual para monstrarlo en este componente.
  useEffect(() => {
    async function getUserItem() {
      const itemRef = collection(db, "work");
      const q = query(
        itemRef,
        where("userRef", "==", auth.currentUser.uid), //clave es aqui
        orderBy("timestamp", "desc")
      );
      
      const querySnap = await getDocs(q);
      let items = [];
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
       
      });
      setItems(items);
      setLoading(false);
    }
    getUserItem();
  }, [auth.currentUser.uid]);




  async function Delete(itemID) {
    if (window.confirm("¿Estas seguro que quires Eliminar items?")) {
      await deleteDoc(doc(db, "items", itemID));
      const updatedItem = items.filter(
        (item) => item.id !== itemID
      );
      setItems(updatedItem);
      toast.success(" item completamente Eliminado");
    }
  }
  function Edit(itemID) {
    navigate(`/edit-item/${itemID}`);
  }

  return (
    <div className="bg-green-100">
      <nav className="mt-3 ps-4 text-center">
       <StaffNavBar/>
        <button
          onClick={() => {
            navigate("/StaffHome");
          }}
          className="bg-blue-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal de Staff
        </button>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-blue-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal
        </button>

        <button
          onClick={() => {
            navigate("/MyWorkList");
          }}
          className="bg-blue-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Mis Listado de trabajo personal
        </button>
      </nav>

      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">
          Mi Perfil De Trabajo
        </h1>
        <div className=" text-center mt-4 ">
          <ProfileInfo />
        </div>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                ¿Quires cambiar tu Nombre?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Actualizar Cambio" : "Edit"}
                </span>
              </p>
              <p
                onClick={LogOut}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-works"
              className="flex justify-center items-center bg-red-200"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Crear Su Trabajo
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}
