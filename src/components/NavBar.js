
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// export default function NavBar() {
//   const [login, setLogin] = useState("Sign in");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const auth = getAuth();
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setLogin("Profile");
//       } else {
//         setLogin("Sign in");
//       }
//     });
//   }, [auth]);
//   function gotoRoute(route) {
//     if (route === location.pathname) {
//       return true;
//     }
//   }
//   return (
//     <div className="bg-white border-b shadow-sm sticky top-0 z-40">
//       <header className="flex justify-between items-center px-3 max-w-8xl mx-auto">
//         <div>
//           <img
//             src="https://th.bing.com/th/id/R.3257eae50d03fcd75ed53f0fb2e77a17?rik=zuEWo30lcwXyVQ&riu=http%3a%2f%2fwww.udima.es%2fsites%2fudima.es%2ffiles%2flogo-udima-horizontal-COLOR.png&ehk=Gegd8l%2fesV22ouMomhrb%2bcG7vQa39ZJcwQn0x9Td268%3d&risl=&pid=ImgRaw&r=0"
//             alt="logo"
//             className="h-5 cursor-pointer"
//             onClick={() => navigate("/")}
//           />
//         </div>
//         <div>
//           <ul className="flex space-x-10">
//             <li
//               className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
//                 gotoRoute("/") && "text-black border-b-red-500"
//               }`}
//               onClick={() => navigate("/")}
//             >
//               Home
//             </li>
//             <li
//               className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
//                 gotoRoute("/offers") && "text-black border-b-red-500"
//               }`}
//               onClick={() => navigate("/offers")}
//             >
//               Ofertas
//             </li>

//             <li
//               className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent `}
//               onClick={() => navigate("/MyForms")}
//             >
//               Contactos
//             </li>
//             <li
//               className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent `}
//               onClick={() => navigate("/Staff")}
//             >
//               Staff Login
//             </li>

//             <li
//               className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
//                 (gotoRoute("/sign-in") || gotoRoute("/profile")) &&
//                 "text-black border-b-red-500"
//               }`}
//               onClick={() => navigate("/profile")}
//             >
//               {login}
//             </li>
//           </ul>
//         </div>
//       </header>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function NavBar() {
  const [login, setLogin] = useState("Sign in");
  const [stafflogin, setStaffLogin] =useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin("Profile");
        setStaffLogin("Staff Login")
      } else {
        setLogin("Sign in");
        setStaffLogin("");
      }
    });
  }, [auth]);
   


  function gotoRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-8xl mx-auto">
        <div>
          <img
            src="https://th.bing.com/th/id/R.3257eae50d03fcd75ed53f0fb2e77a17?rik=zuEWo30lcwXyVQ&riu=http%3a%2f%2fwww.udima.es%2fsites%2fudima.es%2ffiles%2flogo-udima-horizontal-COLOR.png&ehk=Gegd8l%2fesV22ouMomhrb%2bcG7vQa39ZJcwQn0x9Td268%3d&risl=&pid=ImgRaw&r=0"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Ofertas
            </li>


             <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                gotoRoute("/MyForms") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/MyForms")}
            >
             Contactos
            </li>


            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (gotoRoute("/sign-in") || gotoRoute("/profile") ) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {login}
             
            </li>

           
                   <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (gotoRoute("/sign-in") || gotoRoute("/Staff") ) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/Staff")}
            >

            {stafflogin}
             
            </li> 


          </ul>
        </div>
      </header>
    </div>
  );
}

