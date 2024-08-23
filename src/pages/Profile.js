
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
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import ProductList from "../components/ProductList";
import ProfileInfo from "../profileFoto/ProfileInfo";
import { MdExitToApp, MdDelete } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
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
  useEffect(() => {
    async function getUserItem() {
      const itemRef = collection(db, "items");
      const q = query(
        itemRef,
        where("userRef", "==", auth.currentUser.uid),
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
    
    navigate(`/edit-product-list/${itemID}`);
  }


  return (
    <div>
    
<nav className="mt-3 ps-4">
    <button
         onClick={
            ()=>{
              navigate("/Staff" );
            }
          }
          style={{ backgroundColor: "blue", color: "white", margin:"4px" }}
        >
      Solo Staff
        </button>

</nav>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">Mi Perfil</h1>
        <div  className="ps-5 text-center mt-6 font-bold">
        <ProfileInfo/>
        </div>
        
        
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}

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

            {/* Email Input */}

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
              to="/create-product-list"
              className="flex justify-center items-center bg-red-200"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Vendir Su Item
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && items.length > 0 && (
          <div>
            <h2 className="text-2xl text-center font-semibold mb-6">
              Mis items subida
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {items.map((item) => (
                <ProductList
                  key={item.id}
                  id={item.id}
                  item={item.data}

                  Delete={() => Delete(item.id)}
                  
                  Edit={() => Edit(item.id)}
                />
                
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
