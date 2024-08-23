
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect} from "react";
import { useNavigate, Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination,} from "swiper";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt,} from "react-icons/fa";
import {  RiCarFill} from "react-icons/ri";
import { FcManager } from "react-icons/fc";
import { FaCarCrash } from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CarFinance from "./work/CarFinance";

export default function Items() {
  const auth = getAuth();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
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
    <main>
      <Link className="contents" to={`/item-foto/${params.itemId}`}>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
        >
          {item.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${item.imgUrls[index]}) center no-repeat`,
                  backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Link>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {item.name} -{" "}
            {item.offer
              ? item.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : item.realPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            €{item.type === "new" ? " / precio" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {item.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {item.type === "new" ? "New" : "SeconHand"}
            </p>
            {item.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                €{+item.realPrice - +item.discountedPrice} rebaja
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Descripción - </span>
            {item.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <MdOutlineAirlineSeatReclineNormal icon="fa-regular fa-person-seat" />
              {+item.seats > 2 ? `${item.seats} seats` : "2 Seats"}
            </li>

            {item.type !== "new" && (
              <li className="flex items-center whitespace-nowrap">
                <FcManager icon="fa-solid fa-person" />
                {+item.previousOwners > 1
                  ? `${item.previousOwners} Owners`
                  : "1 Owner"}
              </li>
            )}

            <li className="flex items-center whitespace-nowrap">
              <RiCarFill icon="fas fa-car-mechanic" />
              {item.MOT ? "MOT" : "No MOT "}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaCarCrash icon="fas fa-car-crash" />
              {item.defect ? "Defect" : "No defect"}
            </li>
          </ul>
          <div>
            <button
              onClick={() => {
                navigate("/CarFinance");
              }}
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
            >
              Solicitar financiación 
            </button>
          
             <button
              onClick={() => {
                navigate("/Insurance");
              }}
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
            >
              Solicitar Seguro 
            </button>
                    
            <button
              onClick={() => {
                navigate(`/card-info/${params.itemId}`);
              }}
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
            >
              COMPRA AHORA
            </button>
          </div>

          <div>
            {item.userRef !== auth.currentUser?.uid && !contactOwner && (
              <div className="mt-6">
                <button
                  onClick={() => setContactOwner(true)}
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
                >
                  Contactar con Dueño
                </button>
              </div>
            )}
            {contactOwner && <Contact userRef={item.userRef} item={item} />}
          </div>
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[item.geolocation.lat, item.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[item.geolocation.lat, item.geolocation.lng]}>
              <Popup>{item.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}


