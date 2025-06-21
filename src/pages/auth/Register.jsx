import {
   FaUser,
   FaSignInAlt,
   FaUniversity,
   FaIdCard,
   FaPhoneAlt,
   FaEnvelope,
   FaArrowLeft,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRecruitmentStatus } from "../../_services/auth";
import background from "/images/background/gambar1.jpg";
import { getDivisions } from "../../_services/divisions";
import { createMember } from "../../_services/members";
import useLoadingSpinner from "../../components/elements/LoadingModal";

export default function Register() {
   const { loading, LoadingSpinner } = useLoadingSpinner();

   const navigate = useNavigate();
   const [status, setStatus] = useState(true);
   const [divisions, setDivisions] = useState([]);

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

   useEffect(() => {
      const fetchStatus = async () => {
         const [statusData, divisionsData] = await Promise.all([
            getRecruitmentStatus(),
            getDivisions(),
         ]);

         setStatus(statusData);
         if (!status) {
            alert("Recruitment is currently closed.");
            return navigate("/");
         }

         setDivisions(divisionsData);
      };

      fetchStatus();
   }, [navigate, status]);

   const initialForm = {
      name: "",
      nim: "",
      prodi: "",
      division: "",
      phone_number: "",
      email: "",
      link_project: "",
      role: "registrant",
   };
   const [loginForm, setLoginForm] = useState(initialForm);

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
         await createMember(loginForm);
         setAlert({
            isOpen: true,
            successMessage: "Congratulations, Register successfully",
         });
         alertReset();
         setLoginForm(initialForm);
         loading(false);
      } catch (error) {
         console.log(error);
         setAlert({
            isOpen: true,
            errorMessage: "Failed: " + error,
         });
         alertReset();
         loading(false);
      }
   };

   return (
      <main className="register">
         <form onSubmit={(e) => handleSubmit(e)}>
            <div className="background">
               <img src={background} alt="background" />
            </div>
            <div className="register-container">
               <div className="header-section">Join Core IT</div>
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
                  <div className="profile">
                     <div className="input">
                        <FaUser className="icon" />
                        <input
                           type="text"
                           placeholder="type your name"
                           name="name"
                           id="name"
                           value={loginForm.name}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="input">
                        <FaIdCard className="icon" />
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
                        <FaUniversity className="icon" />
                        <input
                           type="text"
                           placeholder="type your prodi"
                           name="prodi"
                           id="prodi"
                           value={loginForm.prodi}
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>
                  <div className="division">
                     <select
                        name="division"
                        required
                        value={loginForm.division}
                        onChange={handleChange}
                     >
                        <option value="">--Select Division--</option>
                        {divisions.map((division) => (
                           <option value={division.name.toLowerCase()}>
                              {division.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="contact">
                     <div className="input">
                        <FaPhoneAlt className="icon" />
                        <input
                           type="text"
                           placeholder="type your phone number"
                           name="phone_number"
                           id="phone_number"
                           value={loginForm.phone_number}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="input">
                        <FaEnvelope className="icon" />
                        <input
                           type="text"
                           placeholder="type your email"
                           name="email"
                           id="email"
                           value={loginForm.email}
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>
                  <div className="project">
                     <textarea
                        name="link_project"
                        id="link_project"
                        value={loginForm.link_project}
                        onChange={handleChange}
                        placeholder="Masukan link project disini, Gdrive, github, linked, dll"
                     />
                  </div>
               </div>
               <div className="submit-section">
                  <button type="submit">
                     <FaSignInAlt /> Submit
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
   );
}
