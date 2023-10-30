import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import AddBook from "./pages/BooksPages/AddBook";
import EditBook from "./pages/BooksPages/EditBook";




function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />

            <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/addnewbook" element={access_token ? <AddBook /> : <Navigate to="/login" />} />
            <Route path="/book/edit/:id" element={access_token ? <EditBook /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
          </Route>
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
