import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import DashBoard from "../pages/Dashboard";
import SignIn from "../pages/Signin";
import ProductList from "../pages/Products/List";
import ProductAdd from "../pages/Products/Create";
import ProductUpdate from "../pages/Products/Update";
import UserCreate from "../pages/Users";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/useAuth";

export default function Router() {
  const { data } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.user) {
      navigate("/product-list");
    }
  }, [data.user]);

  return (
    <Routes>
      {data.user ? (
        <Route path="/" element={<DashBoard />}>
          <Route path="users" element={<UserCreate />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product-add" element={<ProductAdd />} />
          <Route path="product-updated/:id" element={<ProductUpdate />} />
        </Route>
      ) : (
        <Route path="/" element={<SignIn />} />
      )}
    </Routes>
  );
}
