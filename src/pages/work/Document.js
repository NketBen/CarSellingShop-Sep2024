






import { useState } from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function Document() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
   const params = useParams();
  const [paraForm, SetParaForm] = useState({
   nameDoc:"",
  descriptionDoc: "",

    images: {},
  });
  const { 
    nameDoc,
    descriptionDoc,
    images,
  } = paraForm;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      SetParaForm((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
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

    if (images.length > 10) {
      setLoading(false);
      toast.error("No se permite mas de 10 imagenes");
      return;
    }
        async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filenameDoc = `${auth.currentUser.uid}-${image.nameDoc}-${uuidv4()}`;
        const storageRef = ref(storage, filenameDoc);
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

        const Images = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Imagenes subido");
      return;
    });

        const paraFormCopy = {
      ...paraForm,
      Images,
    };
    delete paraFormCopy.images;

    delete paraFormCopy.images;
    const docRef = doc(db, "work", params.workId);

    await updateDoc(docRef, paraFormCopy);
    //const docRef = await addDoc(collection(db, "work"), paraFormCopy);
    setLoading(false);
    toast.success("Se ha creado listado de item correctamente");
    navigate(`/close-work/${params.workId}`);





  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Crear tu Listas de Dodumentos para adjuntar
      </h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Nombre De Documento</p>
        <input
          type="text"
          id="nameDoc"
          value={nameDoc}
          onChange={onChange}
          placeholder="Nombre de Usted"
          maxLength="32"
          minLength="5"
          required
          classNameDoc="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        <p className="text-lg font-semibold">Descripción de documento</p>
        <textarea
          type="text"
          id="descriptionDoc"
          value={descriptionDoc}
          onChange={onChange}
          placeholder="Descripción"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            imagen para adjuntar (max 10)
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
          Adjuntar Imagenes
        </button>
      </form>
    </main>
  );
}
