

// import React, { useState } from 'react';
// import { getDocs, collection, where, query } from "firebase/firestore"; 
// import { db } from "../../firebase";
// import { Form} from 'react-router-dom';

// const SearchBar = () => {

//     const [look, setLook] = useState("");
//     const [results, setResults] = useState([]);
    

// async function search(e){
//         e.preventDefault()
        
//     const collection_ref = collection(db, 'almacen')
    
//     const q = query(
//         collection_ref,
//         where("FabricantePiezaNo", "==", look)

//     );
//     const doc_refs = await getDocs(q)

//     const res = []

//     doc_refs.forEach(item => {
//         res.push({
//             id: item.id, 
//             ...item.data()
//         })
//     })

//     setResults(res)
        
//     }
   

    

//     return (
//     <div>
//       <Form onSubmit={search}>
//         <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
//             <input
//                 type="text"
//                 className="w-full placeholder-gray-400 text-gray-900 p-4"
//                 placeholder="Search"
//                  onChange={(e) => setLook(e.target.value)}
//                 value={look}
//             />
//             <button className="bg-white p-4">🔍</button>
//         </div>
//         </Form>
//         <div>
//         {results}
//         </div>
//  </div>
 
       
//     );
// };

// export default SearchBar;