import { FaUser, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import "./index.css";
import background from "/images/background/gambar1.jpg";
import { useState, useEffect } from "react";
import { login } from "../../_services/auth";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../../_services/auth";
import MobileProtected from "../../components/admin/MobileProtected";
import useLoadingSpinner from "../../components/elements/LoadingModal";

export default function Login() {
   const { loading, LoadingSpinner } = useLoadingSpinner();

   const navigate = useNavigate();
   useEffect(() => {
      const checkAuth = async () => {
         const valid = await isAuthenticated();
         if (valid) {
            navigate("/admin", { replace: true });
         }
      };
      checkAuth();
   }, [navigate]);

   const [loginForm, setLoginForm] = useState({
      nim: "",
      password: "",
   });

   //Kode custom alert
   const [alert, setAlert] = useState({
      isOpen: false,
      errorMessage: "",
      successMessage: "",
   });
   const alertReset = () => {
      setTimeout(() => {
         setAlert({
            isOpen: false,
            errorMessage: "",
            successMessage: "",
         });
      }, 5000);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setLoginForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      loading(true);

      try {
         await login(loginForm);
         loading(false);
         navigate("/admin");
      } catch (error) {
         console.log(error);
         setAlert({
            isOpen: true,
            errorMessage: error,
         });
         alertReset();
         loading(false);
      }
   };

   return (
      <>
         <div className="mobile">
            <MobileProtected />
         </div>
         <main className="login">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
               <div className="background">
                  <img src={background} alt="background" />
               </div>
               <div className="login-container">
                  <div className="header-section">Staff Login</div>
                  <div
                     className={
                        alert.errorMessage ? "alert error" : "alert success"
                     }
                  >
                     {alert.errorMessage
                        ? alert.errorMessage
                        : alert.successMessage}
                  </div>
                  <div className="input-section">
                     <div className="input">
                        <FaUser className="icon" />
                        <input
                           type="text"
                           placeholder="type your nim"
                           name="nim"
                           id="nim"
                           value={loginForm.nim}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="input">
                        <FaLock className="icon" />
                        <input
                           type="password"
                           placeholder="type your password"
                           name="password"
                           id="password"
                           value={loginForm.password}
                           onChange={handleChange}
                           required
                           autoComplete="off"
                        />
                     </div>
                  </div>
                  <div className="submit-section">
                     <button type="submit">
                        <FaSignInAlt /> Login
                     </button>
                  </div>
               </div>
            </form>
            <div className="btn-back">
               <Link to={"/"} className="btn back">
                  <FaArrowLeft />
               </Link>
            </div>
            <LoadingSpinner />
         </main>
      </>
   );
}
