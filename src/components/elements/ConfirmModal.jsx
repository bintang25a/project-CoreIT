import { useState } from "react";

export default function useConfirmDialog() {
   const [show, setShow] = useState(false);
   const [message, setMessage] = useState("");
   const [resolver, setResolver] = useState(null);

   const confirm = (msg) => {
      setMessage(msg);
      setShow(true);

      return new Promise((resolve) => {
         setResolver(() => resolve);
      });
   };

   const handleYes = () => {
      setShow(false);
      if (resolver) resolver(true);
   };

   const handleNo = () => {
      setShow(false);
      if (resolver) resolver(false);
   };

   const ConfirmDialog = () =>
      show ? (
         <div className="confirm-overlay">
            <div className="confirm-box">
               <p>{message}</p>
               <div className="confirm-buttons">
                  <button className="yes" onClick={handleYes}>
                     Yes
                  </button>
                  <button className="no" onClick={handleNo}>
                     No
                  </button>
               </div>
            </div>
         </div>
      ) : null;

   return { confirm, ConfirmDialog };
}
