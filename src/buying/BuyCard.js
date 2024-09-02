
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc} from "firebase/firestore";
import { db } from "../firebase";
import GooglePayButton from "@google-pay/button-react";
import { toast } from "react-toastify";
import { useAuthStatus } from "../hooks/useAuthStatus";

//demonstracion de pago por googlepay
function BuyCard() {
 
  const [item, setItem] = useState("");
  const [id, setId] = useState("");
  const [offer, setOffer] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [realPrice, setRealPrice] = useState("");
   const { loggedIn, checkingStatus } = useAuthStatus();
  
  
  const navigate = useNavigate();
  const params = useParams();

useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "items", params.itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setId(docSnap.data().id);
         setOffer(docSnap.data().offer);
          setDiscountedPrice(docSnap.data().discountedPrice);
           setRealPrice(docSnap.data().realPrice);
           
       setItem(docSnap.data())
      } else {
        alert("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.itemId]); 

const price = offer? discountedPrice.toString(): realPrice.toString();
  return (
    <div className=" text-center">
      <nav className="mt-3 ">
        <button
          onClick={() => {
            navigate(`/card-info/${params.itemId}`);
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          React Credit Card
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
          Pagina Principal
        </button>
      </nav>
      <h1>Google Payment</h1>
      <hr />
     { (loggedIn)? (
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "stripe",
                  gatewayMerchantId: " process.env.REACT_APP_GPAY_PUBLIC_KEY",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "BCR2DN4TVHVPFLZ4",
            merchantName: "CarSellingShop",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: price,
            currencyCode: "EUR",
            countryCode: "ES",
          },
          shippingAddressRequired: true,
          callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorised Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        onPaymentDataChanged={(paymentData) => {
          console.log("On Payment Data Changed", paymentData);
          return {};
        }}
        existingPaymentMethodRequired="false"
        buttonColor="black"
        buttonType="Buy"
      />) : "Tienes que inicia sesion antes de hacer compras" }

      
      <Link className="contents" to={`/category/${item.type}/${params.itemId}`}>
        <img
          className="h-[300px] w-1/2 contain p-2 mt-3 hover:scale-110 transition-scale duration-300 ease-in"
          alt=""
          loading="lazy"
          src={item.imgUrls}
          width="100"
          height="50"
        /> 
      </Link>
      <p>{item.name}</p>
      <h2 className=" left-1 m-1">
        Precio de coche elegido: €
        {item.offer ? item.discountedPrice : item.realPrice}
      </h2>
    </div>
  );
}

export default BuyCard;