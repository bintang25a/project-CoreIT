import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className="not-found">
         <div className="container">
            <h1>404 - Page Not Found</h1>
            <p>The page your looking for not found</p>
            <button onClick={() => navigate(-1, { replace: true })}>
               <FaArrowLeft />
            </button>
         </div>
      </div>
   );
}
