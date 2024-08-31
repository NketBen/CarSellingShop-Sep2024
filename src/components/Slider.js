
// import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination,} from "swiper";
// import "swiper/css/bundle";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import { db } from "../firebase";

// export default function Slider() {
//   const [items, setItems] = useState(null);
//   const [loading, setLoading] = useState(true);
//   SwiperCore.use([Autoplay, Navigation, Pagination]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     async function getItem() {
//       const itemsRef = collection(db, "items");
//       const q = query(itemsRef, orderBy("timestamp", "desc"), limit(10));
//       const querySnap = await getDocs(q);
//       let items = [];
//       querySnap.forEach((doc) => {
//         return items.push({
//           id: doc.id,
//           data: doc.data(),
//         });
//       });
//       setItems(items);
//       setLoading(false);
//     }
//     getItem();
//   }, []);
//   if (loading) {
//     return <Spinner />;
//   }
//   if (items.length === 0) {
//     return <div></div>;
//   }
//   return (
//     items && (
//       <div>
//         <Swiper
//           slidesPerView={1}
//           navigation
//           pagination={{ type: "progressbar" }}
//           effect="fade"
//           modules={[EffectFade]}
//           autoplay={{ delay: 2000 }}
//         >
//           {items.map(({ data, id }) => (
//             <SwiperSlide
//               key={id}
//               onClick={() => navigate(`/category/${data.type}/${id}`)}
//             >
//               <div
//                 style={{
//                   background: `url(${data.imgUrls[0]}) center, repeat`,
//                   backgroundSize: "cover",
//                 }}
//                 className="relative md:resize px-4 py-2 h-[400px] w-full overflow-hidden"
//               ></div>
//               <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
//                 {data.name}
//               </p>
//               <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
//                 €{data.discountedPrice ?? data.realPrice}
//                 {data.type === "new"}
//               </p>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     )
//   );
// }



import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination,} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
 
//solo hace deslice de imagenes de coche

export default function Slider() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  // se hace consultas de 10 imagenes con  tiempo de subida desciende y lo ponemos en swiper para muestrarlo
  useEffect(() => {
    async function getItem() {
      const itemsRef = collection(db, "items");
      const q = query(itemsRef, orderBy("timestamp", "desc"), limit(10));
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
    getItem();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (items.length === 0) {
    return <div></div>;
  }
  return (
    items && (
      <div>
      
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 2000 }}
        >
          {items.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, repeat`,
                  backgroundSize: "contain",
                }}
                className="relative md:resize px-3 py-2 h-[400px] w-full overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                €{data.discountedPrice ?? data.realPrice}
                {data.type === "new"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
}

 
