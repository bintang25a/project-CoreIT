import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Programs() {
   const navigate = useNavigate();

   return (
      <div className="not-found">
         <div className="container">
            <h1>Program is coming soon</h1>
            <p>The page you are looking for is still under built</p>
            <button onClick={() => navigate(-1, { replace: true })}>
               <FaArrowLeft />
            </button>
         </div>
      </div>
   );
}
