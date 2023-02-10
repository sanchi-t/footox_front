import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";
import ProductListing from "../pages/ProductListing";
import HomePage from "../pages/HomePage";
import AdminPage from "../Admin/AdminPage";
import AdminNavbar from "../Admin/AdminNavbar";
import CouponPage from "../Admin/CouponPage";
import AddCoupon from "../Admin/AddCoupon";
import Banner from "../Admin/Banner";
import Checkout from "../pages/Checkout";
import InstagramPreview from "../components/InstagramPreview";
import Authentication from "../Authentication/Auth";




const withLocation = Component => props => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<HomePage />} forceRefresh={true} />
        <Route path="/:id" element={<Authentication><ProductDetails /></Authentication>}/>
        {/* <Route path="/login" element={<Login />} />    */}
        <Route
          path="/admin"
          element={<AdminPage />
          }
        />
        <Route path="/coupon" element={<CouponPage />}
        />
        <Route
          path="/couponAdd"
          element={<><AdminNavbar />
              <AddCoupon /></>}
        />
        <Route path="/banner" element={<Banner/>}/>  
        <Route path="/checkout" element={<Checkout/>}/>    
  
      </Routes>
    </div>
  );
};

export default withLocation(AllRoutes);
