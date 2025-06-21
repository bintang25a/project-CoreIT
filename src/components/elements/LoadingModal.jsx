import { useState } from "react";

export default function useLoadingSpinner() {
   const [show, setShow] = useState(false);

   const loading = (isShow) => {
      setShow(isShow);
   };

   const LoadingSpinner = () =>
      show ? (
         <div className="confirm-overlay">
            <div className="confirm-box">
               <div className="loading"></div>
            </div>
         </div>
      ) : null;

   return { loading, LoadingSpinner };
}
