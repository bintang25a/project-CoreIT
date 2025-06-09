import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruitmentStatus } from "../../_services/auth";

export default function Register() {
   const navigate = useNavigate();
   const [status, setStatus] = useState(true);

   useEffect(() => {
      const fetchStatus = async () => {
         const [statusData] = await Promise.all([getRecruitmentStatus()]);

         setStatus(statusData);
         if (!status) {
            alert("Recruitment is currently closed.");
            navigate("/");
         }
      };

      fetchStatus();
   }, [navigate, status]);

   console.log(status);

   return (
      <main>
         <h1>Register Page</h1>
         {/* form pendaftaran */}
      </main>
   );
}
