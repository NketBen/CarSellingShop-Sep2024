

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


// componente para abrir imagenes adjuntados a CompletedWork
export default function OpenAttachedDocument() {
  const auth = getAuth();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);
 
//tener documento que se busca mediante id que viene useParam de router
  useEffect(() => {
    async function getItem() {
      const docRef = doc(db, "workClosed", params.workId); // tener referencia de coleccion workClosed
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
        setId(docSnap.id);
        setLoading(false);
      }
    }
    getItem();
  }, [params.workId]);


  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
    <nav>
        <div>
        <button
          onClick={() => {
            navigate("/CompletedWork");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 absolute top-20 right-1 h-26 w-26  border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Back
        </button>
      </div>

    </nav>

    
    <main>
     {item.imageUrl? (
      <Swiper
          slidesPerView={1} // abrimos imagenes en swipers
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
          className="relative w-1/2 overflow-hidden h-[800px]"
        >
          {item.imageUrl.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[600px]"
                style={{
                  background: `url(${item.imageUrl[index]}) center no-repeat`,
                  backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
       
     ): "No imagen Adjuntado" }
        




    </main>
    </div>
  );
}


