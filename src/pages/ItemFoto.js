




import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination,} from "swiper";
import "swiper/css/bundle";

import { getAuth } from "firebase/auth";

//componente solo abre imagenes de item cuando se lo hace clic sobre ellos
export default function Items() {
  const auth = getAuth();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);
 

  useEffect(() => {
    async function getItem() {
      const docRef = doc(db, "items", params.itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
        setId(docSnap.id);
        setLoading(false);
      }
    }
    getItem();
  }, [params.itemId]);


  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
    
    <div>
        <button
          onClick={() => { //boto para volver a item que se abrio
            navigate(`/category/${item.type}/${params.itemId}`); 
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 absolute top-20 right-1 h-26 w-26  border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Back
        </button>
      </div>

    
    <main>
  
        <Swiper 
          slidesPerView={1}// imagenes de item que se pulso
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
           className="relative w-1/2 overflow-hidden h-[800px]"
        >
          {item.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[600px]"
                style={{
                  background: `url(${item.imgUrls[index]}) center no-repeat`,
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


