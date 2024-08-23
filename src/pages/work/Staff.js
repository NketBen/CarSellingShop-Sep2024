


import { useState , useEffect} from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, getDoc, collection} from "firebase/firestore";


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
   const [staff, setStaff] = useState([]);
    const workColledctionRef = collection(db, "staff");
   const auth = getAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData; // desestructuracion 
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) { //si tenemos usuario in firebase, buscamos el coleccion de staff con su uid
        async function getStaff() {
          const docRef = doc(db, "staff", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setStaff(docSnap.data()); //si existe este usuario, le ponemos en estado de staff
          } else {
            toast.error("No se puede tener datos de usuario");
          }
        }
        getStaff();
      }
    } catch (error) {
      toast.error("Sus credenciales no vale, compruebalo");
    }
//en estado de staff si tenemos staffRef equal que uid de usuario conectado ahora navegamos a staff home
    if(auth.currentUser.uid === staff.staffRef) { 
       navigate("/StaffHome")
    }
  } 
       
  
  return (
    <section className="bg-orange-50">
      <h1 className="text-3xl text-center mt-6 font-bold">Staff Sign in</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://cdn.vectorstock.com/i/1000x1000/41/52/key-lock-log-in-icon-flat-web-sign-symbol-logo-vector-5924152.webp"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Login
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">O</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
