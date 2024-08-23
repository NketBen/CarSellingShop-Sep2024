import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, getDoc} from "firebase/firestore";




export default function StaffNavBar () {

  const [login, setLogin] = useState([]);
  const [staffperfil, setStaffPerfil] =useState("");
  const [invetario, setInventario] =useState("");
  const [carinfo, setCarInfo] =useState("");
  const [creatwork, setCreatWork] =useState("");
  const [worklist, setWorklist] =useState("");
  const [pending, setPending] =useState("");
  const [completed, setCompleted] =useState("");
  const [mywork, setMyWork]=useState("");
      
       const [almacenList, setAlmacenList]=useState("");
         const [finance, setFinance]=useState("");
         const [insurance, setInsurance]=useState("");
         const [pendingfinance, setPendingFinance]=useState("");
          const [pendingInsurance, setPendingInsurance]=useState("");


  const location = useLocation();
  const navigate = useNavigate();
 
  


  useEffect(() => {

         try {
  const auth = getAuth();
      
        async function getStaff() {
          const docRef = doc(db, "staff", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setLogin(docSnap.data());
          } else {
            toast.error("No se puede tener datos de usuario");
          }
        }
        getStaff();
      
    } catch (error) {
      toast.error("Sus credenciales no vale, compruebalo");
    }

  if (login.rol==="gerente") {
        setStaffPerfil("Mi Perfil de trabajo");
        setInventario("Crear Inventario de piezas");
        setCarInfo("Subir Informacion de ITV");
        setCreatWork("Crear Listas de Trabajo");
        setWorklist("Listas de Todos Ordenes de trabajos");
        setPending("Listas de tareas pendientes");
        setCompleted("Listas de tareas acabado");
        setMyWork("Mis Listas de tareas");
       
        setAlmacenList("Abrir y Actualizar pieza")
        
        setFinance("Peticiones Financieros de Clentes")
        setPendingFinance("Listas de Peticiones Financieros de Clentes")
        setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")


      } 
 
    
  }, [login.rol]);


 

useEffect(()=>{
function getRol1(){
  if (login.rol==="personalventa") {
        setStaffPerfil("Mi Perfil de trabajo");
        setCreatWork("Crear Listas de Trabajo");
        setPending("Listas de tareas pendientes");
        setMyWork("Mis Listas de tareas");
        setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")
     


      } 
}
getRol1()
}, [login.rol])



useEffect(()=>{
function getRol2(){
   if (login.rol==="financiero") {
        setStaffPerfil("Mi Perfil de trabajo");
        setCreatWork("Crear Listas de Trabajo");
        setPending("Listas de tareas pendientes");
        setMyWork("Mis Listas de tareas");
        setFinance("Peticiones Financieros de Clentes")
         setPendingFinance("Listas de Peticiones Financieros de Clentes")
         setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")


      }
}
getRol2()
}, [login.rol])




useEffect(()=>{
function getRol3(){
    if (login.rol==="gestorventa") {
        setStaffPerfil("Mi Perfil de trabajo");
        setCreatWork("Crear Listas de Trabajo");
        setPending("Listas de tareas pendientes");
        setMyWork("Mis Listas de tareas");
        setInventario("Crear Inventario de piezas");
        setFinance("Peticiones Financieros de Clentes")
        setAlmacenList("Abrir y Actualizar pieza")

      } 
}
getRol3()
console.log(login.rol)
}, [login.rol])



useEffect(()=>{
function getRol4(){
          if (login.rol==="tecnico") {
        setStaffPerfil("Mi Perfil de trabajo");
        setCreatWork("Crear Listas de Trabajo");
        setPending("Listas de tareas pendientes");
        setMyWork("Mis Listas de tareas");
        setInventario("Crear Inventario de piezas");
        setAlmacenList("Abrir y Actualizar pieza")
        setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")
        

      } 
}
getRol4()
}, [login.rol])


useEffect(()=>{
function getRol5(){
 if (login.rol==="director") {
        setStaffPerfil("Mi Perfil de trabajo");
        setInventario("Crear Inventario de piezas");
        setCarInfo("Subir Informacion de ITV");
        setCreatWork("Crear Listas de Trabajo");
        setWorklist("Listas de Todos Ordenes de trabajos");
        setPending("Listas de tareas pendientes");
        setCompleted("Listas de tareas acabado");
        setMyWork("Mis Listas de tareas");
       
        setAlmacenList("Abrir y Actualizar pieza")
        
        setFinance("Peticiones Financieros de Clentes")
         setPendingFinance("Listas de Peticiones Financieros de Clentes")
         setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")


      } 
}
getRol5()
}, [login.rol])

  function gotoRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-8xl mx-auto">

        <div>
          <ul className="flex space-x-10">

          <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/MyWorkList") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/MyWorkList")}
            >
              {mywork}
            </li>

               <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/AlmacenList") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/AlmacenList")}
            >
              {almacenList}
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/WorkList") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/WorkList")}
            >
              {worklist}
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/CreateWorks") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/CreateWorks")}
            >
              {creatwork}
            </li>


             <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/CarCheck") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/CarCheck")}
            >
             {carinfo}
            </li>


            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/CreateAlmacen")  &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/CreateAlmacen")}
            >
              {invetario}
             
            </li>

             <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/PendingWorks")  &&
                "text-black border-b-red-500"
                }`}
                  onClick={() => navigate("/PendingWorks")}
              >
                 {pending}
             
              </li>

              <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/CompletedWork")  &&
                "text-black border-b-red-500"
                }`}
                  onClick={() => navigate("/CompletedWork")}
              >
                 {completed}
             
              </li>
           
                   <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (gotoRoute("/sign-in") || gotoRoute("/MyStaffProfile") ) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/MyStaffProfile")}
            >

            {staffperfil}
             
            </li> 


             <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/CarFinance") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/CarFinance")}
            >
              {finance}
            </li>

               <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/PendingFinance") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/PendingFinance")}
            >
              {pendingfinance}
            </li>

                         <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/insurance") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/Insurance")}
            >
              {insurance}
            </li>

                           <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/PendingInsurance") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/PendingInsurance")}
            >
              {pendingInsurance}
            </li>

          </ul>
        </div>
      </header>
    </div>
  );
}