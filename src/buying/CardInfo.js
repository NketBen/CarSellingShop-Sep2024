import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

//demonstracion de react-creadit-card

const CardInfo = () => {

  const [item, setItem] = useState("");
  const [id, setId] = useState("");
  const params = useParams();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    amount:0,
  });





useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "items", params.itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setId(docSnap.data().id);
       setItem(docSnap.data())
      } else {
        alert("No existe este documento en base de datos!");
      }
    }
    fetchData();
  }, [params.itemId]); 


  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

    const handleSubmit = (e) => {
    e.preventDefault();
    alert("Compra esta enviado");
    
  
  };


  return (
    <div
      style={{
        backgroundColor: " #888",
        textAlign: "center",
        marginRight: "500px",
      }}
    >
      <nav className="mt-3 ">
        <button
          onClick={() => {
            navigate(`/buy-card/${params.itemId}`);
          }}
          className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-8 m-3 border-gray-300 rounded transition duration-150 ease-in-out"
        >
         Google pay
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
      <section className="hero container max-w-0 mx-auto pb-10 m-4">
        <img
          className="h-[300px] w-1/2 contain hover:scale-110 transition-scale duration-300 ease-in"
          alt=""
          loading="lazy"
          src={item.imgUrls}
          width="50"
          height="100"
        />
      </section>
      <h2 className=" left-3 m-2">
        Precio de coche elegido: €{item.offer ? item.discountedPrice : item.realPrice}
      </h2>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit} className="m-3">
        <input
          style={{
            padding: ".375rem .75rem",
            fontSize: "1rem",
            lineHeight: "1.5",
            backgroundColor: "#fff",
            border: "1px solid #ced4da",
            borderRadius: ".25rem",
          }}
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div>
          <input
            style={{
              padding: ".375rem .75rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              backgroundColor: "#fff",
              border: "1px solid #ced4da",
              borderRadius: ".25rem",
            }}
            type="text"
            name="expiry"
            placeholder="MM/YY expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            style={{
              padding: ".375rem .75rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              backgroundColor: "#fff",
              border: "1px solid #ced4da",
              borderRadius: ".25rem",
            }}
            type="password"
            name="cvc"
            placeholder="cvc"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            style={{
              padding: ".375rem .75rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              backgroundColor: "#fff",
              border: "1px solid #ced4da",
              borderRadius: ".25rem",
            }}
            type="text"
            name="name"
            placeholder="Card Holder's Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="mt-2 mb-2">
            <input
              style={{
                padding: ".375rem .75rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                backgroundColor: "#fff",
                border: "1px solid #ced4da",
                borderRadius: ".25rem",
              }}
              type="text"
              name="amount"
              placeholder="Car Selling price"
              value={item.offer ? item.discountedPrice : item.realPrice}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="mt-3 mb-3">
            <input type="submit" name="enviar" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardInfo;
