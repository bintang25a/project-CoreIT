import {
   FaUser,
   FaSignInAlt,
   FaUniversity,
   FaIdCard,
   FaPhoneAlt,
   FaEnvelope,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruitmentStatus } from "../../_services/auth";
import background from "/images/background/gambar1.jpg";
import { getDivisions } from "../../_services/divisions";
import { createMember } from "../../_services/members";

export default function Register() {
   const navigate = useNavigate();
   const [status, setStatus] = useState(true);
   const [divisions, setDivisions] = useState([]);

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

   const [loginForm, setLoginForm] = useState({
      name: "",
      nim: "",
      prodi: "",
      division: "",
      phone_number: "",
      email: "",
      link_project: "",
      role: "registrant",
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
         await createMember(loginForm);
         navigate("/", { replace: true });
      } catch (error) {
         console.log(error);
         alert("Failed, NIM already registed, try contact Staff" + error);
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
                           onChange={(e) => handleChange(e)}
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
                           onChange={(e) => handleChange(e)}
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
                           onChange={(e) => handleChange(e)}
                           required
                        />
                     </div>
                  </div>
                  <div className="division">
                     <select
                        name="division"
                        required
                        value={loginForm.division}
                        onChange={(e) => handleChange(e)}
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
                           onChange={(e) => handleChange(e)}
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
                           onChange={(e) => handleChange(e)}
                           required
                        />
                     </div>
                  </div>
                  <div className="project">
                     <textarea placeholder="Masukan link project disini, Gdrive, github, linked, dll" />
                  </div>
               </div>
               <div className="submit-section">
                  <button type="submit">
                     <FaSignInAlt /> Submit
                  </button>
               </div>
            </div>
         </form>
      </main>
   );
}
