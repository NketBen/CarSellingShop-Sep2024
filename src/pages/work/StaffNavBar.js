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
           const [clientComplains, setClientComplains]=useState("");
         const [pendingfinance, setPendingFinance]=useState("");
          const [pendingInsurance, setPendingInsurance]=useState("");
          const[cita,setCita]=useState("");


  const location = useLocation();
  const navigate = useNavigate();
 
  

// Haremos useEffect para condicionar cada rol en cuanto que puede tener en su StaffNavBar
  useEffect(() => {

         try {
  const auth = getAuth();
      // crear function para tener trabajador en Staff que esta iniciado sesion ahora
      //getting the current user from staff collection using getDoc
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
 //Si este usuario es gerente
 //if this user role is "gerente"
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
         setClientComplains("Quejas y consultas de clente ")
         setCita("Citas Previa ")


      } 
 
    
  }, [login.rol]);


 //Si este usuario es personal de Venta
 //if this user role is "Sale agent" 
useEffect(()=>{
function getRol1(){
  if (login.rol==="personalventa") {
        setStaffPerfil("Mi Perfil de trabajo");
        setCreatWork("Crear Listas de Trabajo");
        setPending("Listas de tareas pendientes");
        setMyWork("Mis Listas de tareas");
        setInsurance("Peticiones Seguro de Clentes")
         setPendingInsurance("Listas de Peticiones Seguros de Clentes")
          setClientComplains("Quejas y consultas de clente ")
           setCita("Citas Previa ")
     


      } 
}
getRol1()
}, [login.rol])


 //Si este usuario es Financiero
 //if this user role is "Finance"
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
          setCita("Citas Previa ")


      }
}
getRol2()
}, [login.rol])


 //Si este usuario es gestor de venta de piezas
 //if this user role is "Spare parts sale manager"
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
         setCita("Citas Previa ")

      } 
}
getRol3()
}, [login.rol])


 //Si este usuario es tecnico
 //if this user role is "Mechanic or technician"
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
          setClientComplains("Quejas y consultas de clente ")
           setCita("Citas Previa ")
        

      } 
}
getRol4()
}, [login.rol])


 //Si este usuario es Director
 //if this user role is "Director"
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
          setClientComplains("Quejas y consultas de clente ")
           setCita("Citas Previa ")


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
    <div className="bg-white border-b shadow-sm sticky top-0 z-40 mr-4">
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
                gotoRoute("/ClientComplains") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/ClientComplains")}
            >
              {clientComplains}
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
                gotoRoute("/AlmacenList") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/AlmacenList")}
            >
             {almacenList}
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
                gotoRoute("/CitaList") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/CitaList")}
            >
              {cita}
            </li>

              <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent mr-4 ${
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