import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className="not-found">
         <div className="container">
            <h1>Please access in your desktop</h1>
            <p>The page you want to open doesnt support mobile access</p>
            <button onClick={() => navigate(-1, { replace: true })}>
               <FaArrowLeft />
            </button>
         </div>
      </div>
   );
}
