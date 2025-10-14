import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function WaRedirect() {
   const navigate = useNavigate();
   useEffect(() => {
      window.location.href =
         "https://chat.whatsapp.com/ChqqjRtT9jz1Om5WLMnpJg?mode=wwt";
   }, []);

   return (
      <div className="not-found">
         <div className="container">
            <h1>Mengarahkan ke WhatsApp...</h1>
            <p>Please wait more patient</p>
            <button onClick={() => navigate(-1, { replace: true })}>
               <FaArrowLeft />
            </button>
         </div>
      </div>
   );
}
