import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import "./login.css";
import background from "/images/background/gambar1.jpg";
import { useState } from "react";
import { login } from "../../_services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();
   const [loginForm, setLoginForm] = useState({
      nim: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;

      setLoginForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await login(loginForm);

         alert("Login Success");
         navigate("/admin");
      } catch (error) {
         console.log(error);
         alert("NIM or Password not correct\n" + error);
         console.log(loginForm);
      }
   };

   return (
      <main className="login">
         <form onSubmit={(e) => handleSubmit(e)}>
            <div className="background">
               <img src={background} alt="background" />
            </div>
            <div className="login-container">
               <div className="header-section">Staff Login</div>
               <div className="input-section">
                  <div className="input">
                     <FaUser className="icon" />
                     <input
                        type="text"
                        placeholder="type your nim"
                        name="nim"
                        id="nim"
                        value={loginForm.nim}
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
      </main>
   );
}
