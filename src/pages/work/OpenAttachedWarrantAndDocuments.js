

import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { db } from "../../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination,} from "swiper";
import "swiper/css/bundle";

import { getAuth } from "firebase/auth";

// componente para abrir imagenes adjuntados a gestor de garantias y documentaciones
export default function OpenAttachedWarrantAndDocuments() {
  const auth = getAuth();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);
 
// tener documento que se busca mediante id que viene useParam de router
  useEffect(() => {
    async function getItem() {
      const docRef = doc(db, "warrant", params.warrantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
        setId(docSnap.id);
        setLoading(false);
      }
    }
    getItem();
  }, [params.warrantId]);


  if (loading) {
    return <Spinner />;//cuando esta cargando se utiliza componente spinner
  }
  return (
    <div>
<nav>
  <div>
        <button
          onClick={() => {
            navigate(`/open-warrant-and-documentsList/${params.warrantId}`);//para volver a este documento que abrió
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 absolute top-40 right-1 h-26 w-26  border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Back
        </button>
      </div>
</nav>
    
    <main>
  
        <Swiper
          slidesPerView={1} //muestramos este imagenes en swiper
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
          className="relative w-1/2 overflow-hidden h-[800px]"
        >
          {item.Images.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[800px]"
                style={{
                  background: `url(${item.Images[index]}) center no-repeat`,
                  backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

    </main>
    </div>
  );
}