import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import EditWorkOrder from "./pages/work/EditWorkOrder";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateProductList from "./pages/CreateProductList";
import EditProductList from "./pages/EditProductList";
import Items from "./pages/Items";
import MyStaffProfile from "./pages/work/MyStaffProfile";
import Category from "./pages/Category";
import MyForms from "./pages/MyForms";
import Insurance from "./pages/work/Insurance";
import CreateWorks from "./pages/work/CreateWorks";
import ContactUs from "./pages/ContactUs";
import WorkList from "./pages/work/WorkList";
import MyWorkList from "./pages/work/MyWorkList";
import ClientComplains from "./pages/work/ClientComplains";
import UpdateWork from "./pages/work/UpdateWork";
import PendingWorks from "./pages/work/PendingWorks";
import Staff from "./pages/work/Staff";
import ProfileInfo from "./profileFoto/ProfileInfo";
import StaffHome from "./pages/work/StaffHome";
import CompletedWork from "./pages/work/CompletedWork";
import CloseWork from "./pages/work/CloseWork";
import CardInfo from "./buying/CardInfo";
import BuyCard from "./buying/BuyCard";
import ItemFoto from "./pages/ItemFoto";
import OpenWorkOrder from "./pages/work/OpenWorkOrder";
import ReAbreOT from "./pages/work/ReAbreOT";
import Document from "./pages/work/Document";
import OpenAttachedDocument from "./pages/work/OpenAttachedDocument";
import OpenAlmacen from "./pages/work/OpenAlmacen";
import AlmacenList from "./pages/work/AlmacenList"; 
import StaffNavBar from "./pages/work/StaffNavBar";
import CitaReply from "./pages/work/CitaReply";
import CarFinance from "./pages/work/CarFinance";
import PendingFinance from "./pages/work/PendingFinance";
import CreateAlmacen from "./pages/work/CreateAlmacen";
import OpenFinance from "./pages/work/OpenFinance";
import OpenAttachedFinance from "./pages/work/OpenAttachedFinance";
import PendingInsurance from "./pages/work/PendingInsurance";
import OpenInsurance from "./pages/work/OpenInsurance";
import OpenAttachedInsurance from "./pages/work/OpenAttachedInsurance";
import CitaPrevia from "./pages/work/CitaPrevia";
import CitaList from "./pages/work/CitaList";
import OpenCitaList from "./pages/work/OpenCitaList";
import WarrantAndDocuments from "./pages/work/WarrantAndDocuments";
import OpenWarrantAndDocumentsList from "./pages/work/OpenWarrantAndDocumentsList";
import OpenAttachedWarrantAndDocuments from "./pages/work/OpenAttachedWarrantAndDocuments";
import WarrantAndDocumentsList from "./pages/work/WarrantAndDocumentsList";
import OpenJustMyCita from "./pages/work/OpenJustMyCita";





// con ayuda de BrowserRouter, hacemos todo navegación 
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/MyForms" element={<MyForms />} />
          <Route path="/Document" element={<Document/>} />
          <Route path="/WarrantAndDocuments" element={<WarrantAndDocuments/>} />
          <Route path="/WarrantAndDocumentsList" element={<WarrantAndDocumentsList/>} />
          <Route path="/OpenWarrantAndDocumentsList" element={<OpenWarrantAndDocumentsList/>} />
          <Route path="/open-warrant-and-documentsList/:warrantId" element={<OpenWarrantAndDocumentsList />} />
          <Route path="/OpenAttachedWarrantAndDocuments" element={<OpenAttachedWarrantAndDocuments/>} />
          <Route path="/open-attached-warrant-andDocuments/:warrantId" element={<OpenAttachedWarrantAndDocuments />} />
          <Route path="/document/:workId" element={<Document />} />
          <Route path="/ReAbreOT" element={<ReAbreOT />} />
          <Route path="/re-abre-OT/:workClosedId" element={<ReAbreOT />} />
          <Route path="/MyWorkList" element={<MyWorkList />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/CarFinance" element={<CarFinance />} />
          <Route path="/Insurance" element={<Insurance />} />
         <Route path="/PendingInsurance" element={<PendingInsurance />} />
         <Route path="/pending-insurance/:insuranceId" element={<PendingInsurance />} />
         <Route path="/OpenInsurance" element={<OpenInsurance />} />
           <Route path="/open-insurance/:insuranceId" element={<OpenInsurance />} />
            <Route path="/OpenAttachedInsurance" element={<OpenAttachedInsurance />} />
            <Route path="/open-attached-insurance/:insuranceId" element={<OpenAttachedInsurance />} />
          <Route path="/PendingFinance" element={<PendingFinance />} />
          <Route path="/OpenFinance" element={<OpenFinance />} />
          <Route path="/OpenAttachedFinance" element={<OpenAttachedFinance />} />
          <Route path="/open-attached-finance/:financeId" element={<OpenAttachedFinance />} />
          <Route path="/open-finance/:financeId" element={<OpenFinance />} />
          <Route path="/ProfileInfo" element={<ProfileInfo />} />
          <Route path="/MyStaffProfile" element={<MyStaffProfile />} />
           <Route path="/OpenJustMyCita" element={<OpenJustMyCita />} />
          <Route path="/StaffHome" element={<StaffHome />} />
          <Route path="/CompletedWork" element={<CompletedWork />} />
          <Route path="/completed-work/:workId" element={<CompletedWork />} />
          <Route path="/WorkList" element={<WorkList />} />
           <Route path="/CitaReply" element={<CitaReply />} />
           <Route path="/cita-reply/:citaListId" element={<CitaReply />} />
          <Route path="/CitaList" element={<CitaList />} />
          <Route path="/cita-list/:citaListId" element={<CitaList />} />
          <Route path="/Open-cita-list/:citaListId" element={<OpenCitaList />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact-us/:messageId" element={<ContactUs />} />
          <Route path="/CloseWork" element={<CloseWork />} />
          <Route path="/UpdateWork" element={<UpdateWork />} />
          <Route path="/AlmacenList" element={<AlmacenList />} />
          <Route path="/almacen-list/:almacenId" element={<AlmacenList />} />
          <Route path="/OpenAlmacen" element={<OpenAlmacen />} />
           <Route path="/open-almacen/:almacenId" element={<OpenAlmacen />} />
          <Route path="/PendingWorks" element={<PendingWorks />} />
          <Route path="/OpenAttachedDocument" element={<OpenAttachedDocument/>}/>
          <Route path="/open-attached-document/:workId" element={<OpenAttachedDocument />} />
          <Route path="/CardInfo" element={<CardInfo />} />
          <Route path="/card-info/:itemId" element={<CardInfo />} />
          <Route path="/BuyCard" element={<BuyCard />} />
          <Route path="/buy-card/:itemId" element={<BuyCard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/ClientComplains" element={<ClientComplains />} />
          <Route path="/category/:categoryName/:itemId" element={<Items />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          
          <Route path="/OpenWorkOrder" element={<OpenWorkOrder />} />
          <Route path="/open-work-order/:worksId" element={<OpenWorkOrder />} />
          <Route path="/StaffNavBar" element={<StaffNavBar />} />
          <Route path="/CreateAlmacen" element={<CreateAlmacen />} />
          <Route path="/CitaPrevia" element={<CitaPrevia/>} />
          <Route path="/CloseWork" element={<CloseWork />} />
          <Route path="/close-work/:workId" element={<CloseWork />} />
          <Route path="/ItemFoto" element={<ItemFoto />} />
          <Route path="/item-foto/:itemId" element={<ItemFoto />} />
           <Route path="/CreateWorks" element={<CreateWorks />} />
         <Route path="/create-works" element={<CreateWorks />} />
          <Route path="edit-work-order" element={<PrivateRoute />}></Route>
          <Route path="/edit-work-order/:workId" element={<EditWorkOrder />} />
          <Route path="create-product-list" element={<PrivateRoute />}>
            <Route
              path="/create-product-list"
              element={<CreateProductList />}
            />
          </Route>
          <Route path="edit-product-list" element={<PrivateRoute />}>
            <Route
              path="/edit-product-list/:itemId"
              element={<EditProductList />}
            />
          </Route>
        </Routes>
      </Router>
      
      <ToastContainer 
        position="bottom-center" //todos toast que utilizaremos in nuestra componentes
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
