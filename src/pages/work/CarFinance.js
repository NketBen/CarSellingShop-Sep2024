


import { useState } from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {getStorage, ref, uploadBytesResumable, getDownloadURL,} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";


export default function CarFinance() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [paraForm, SetParaForm] = useState({
    type: "new",
    name: "",
    seats: 1,
    previousOwners: 1,
    MOT: false,
    defect: false,
    namePerson: "",
    SurnamePerson: "",
    previousName: false,
    Oldname: "",
    oldSurname: "",
    address: "",
    yearInAddress:"",
    oldAddress:"",
    residencialStatus:"",
    maritalStatus:"",
    currentEmployment:"",
    yearsInEmployment:"",
    oldEmployment:"",
    payslips:"",
    description: "",
    TelNo:+34,
    email:"",
    bankName:"",
    accountHolderName:"",
    accountNumber:"",
    bankAddress:"",
    images: {},
  });
  const {
    type,
    name,
   seats,
    previousOwners,
    MOT,
    namePerson,
    SurnamePerson,
    address,
    yearInAddress,
     oldAddress,
    residencialStatus,
    currentEmployment,
    yearsInEmployment,
    oldEmployment,
    TelNo,
    email,
    bankName,
     bankAddress,
     accountHolderName,
     accountNumber,
    defect,
    description,
    previousName,
    Oldname,
    oldSurname,
    images,
  } = paraForm;
  
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {  //verificamos si el entrada es verdadera
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Verifica si entradas son archivos
    if (e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // verificar si entradas son Text0/Booleano/Numeros
    if (!e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // if (name) {
    //   setLoading(false);
    //   toast.error("Has dicho que has cambiado su nombre, una de sus nombres debe ser differente");
    //   return;
    // }
    if (images.length > 50) {
      setLoading(false);
      toast.error("No se permite mas de 10 imagenes");
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
                default:console.log("Something is wrong");
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Imagenes subido");
      return;
    });

    const paraFormCopy = {
      ...paraForm,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete paraFormCopy.images;
    !paraFormCopy.previousName && delete paraFormCopy.oldSurname;
    delete paraFormCopy.latitude;
    delete paraFormCopy.longitude;
    const docRef = await addDoc(collection(db, "finance"), paraFormCopy);
    setLoading(false);
    toast.success("Se ha creado listado de finance correctamente. En 48hrs te llamaremos por el resultado");
    navigate(`/OpenFinance/${docRef.id}`)
   
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
   
      <h1 className="text-3xl text-center mt-6 font-bold">Subir su Informacion para Financiar el Coche</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">secondHand / new</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "new"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            secondHand
          </button>
          <button
            type="button"
            id="type"
            value="new"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            New
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Nombre De Coche</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Nombre de Coche"
          maxLength="32"
          minLength="5"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Seats</p>
            <input
              type="number"
              id="seats"
              value={seats}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
         { type!== "new" && (
             <div>
            <p className="text-lg font-semibold">Dueños Anteriores</p>
            <input
              type="number"
              id="previousOwners"
              value={previousOwners}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          )}
        </div>
        <p className="text-lg mt-6 font-semibold">MOT Pass</p>
        <div className="flex">
          <button
            type="button"
            id="MOT"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !MOT? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="MOT"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              MOT? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Defect</p>
        <div className="flex">
          <button
            type="button"
            id="defect"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !defect ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
          Yes
          </button>
          <button
            type="button"
            id="defect"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              defect ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Direccion"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
              <p className="text-lg font-semibold">Años en este dirección</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="Number"
                  id="yearInAddress"
                  value={yearInAddress}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div> 

        {yearInAddress<3?

          <div>
            <p className="text-lg font-semibold">direccion anterior</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="oldaddress"
                  value={oldAddress}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
              : ""

        }

        
        <p className="text-lg font-semibold">Descripción</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Descripción"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">Has cambiado nombre?</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="previousName"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !previousName ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
           Si
          </button>
          <button
            type="button"
            id="previousName"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              previousName ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Nombre que llevas Ahora</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="text"
                id="Oldname"
                value={Oldname}
                onChange={onChange}
                
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              
            </div>
          </div>
        </div>
        {previousName && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">nombre antes</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="oldSurname"
                  value={oldSurname}
                  onChange={onChange}
                  required={oldSurname}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                
              </div>
            </div>
          </div>
        )}
          
        <div>
        <label>
      Elegir Estado de Vivienda
      <select  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"  
       type="select"
                  id="residencialStatus"
                  value={residencialStatus}
                  onChange={onChange}>
        <option value="apple">Alquiler</option>
        <option value="banana">Comprado</option>
        <option value="orange">Con Familiares</option>
      </select>
    </label>
        </div>


        <div>
                <p className="text-lg mt-6 font-semibold">Employment and their address</p>
        <textarea
          type="text"
          id="currentEmployment"
          value={currentEmployment}
          onChange={onChange}
          placeholder="Direccion"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
              <p className="text-lg font-semibold">Años en este Empresa</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="Number"
                  id="yearsInEmployment"
                  value={yearsInEmployment}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div> 

        {yearsInEmployment<3?

          <div>
            <p className="text-lg font-semibold">Employment Anteriores</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="oldEmployment"
                  value={oldEmployment}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
              : ""

        }
        </div>
       
            <div>
            <p className="text-lg font-semibold">Telefono de cliente</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="TelNo"
                  value={TelNo}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>

          <div>
            <p className="text-lg font-semibold">Email de cliente</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>

           <div>
            <p className="text-lg font-semibold">Nombre de Banco</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="bankName"
                  value={bankName}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>


             <div>
            <p className="text-lg font-semibold">direccion de Banco</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="bankAddress"
                  value={bankAddress}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>


                   <div>
            <p className="text-lg font-semibold">Nombre de duena de Cuenta</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="accountHolderName"
                  value={accountHolderName}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>


           <div>
            <p className="text-lg font-semibold">Numero de Cuenta</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
      
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
          Necisitamos que subas su DNI/NIE, 3 ultimas nominas, copia de carterla de banco y factura de casa
             (maxima 50 documentos)  
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Crear tu Listas
        </button>
      </form>
    </main>
  );
}
