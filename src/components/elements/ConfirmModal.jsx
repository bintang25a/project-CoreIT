import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function useConfirmDialog() {
   const [show, setShow] = useState(false);
   const [message, setMessage] = useState("");
   const [success, setSuccess] = useState("neutral");
   const [save, setSave] = useState("neutral");
   const [resolver, setResolver] = useState(null);

   const confirm = (msg, scs, sv) => {
      setMessage(msg);
      setSuccess(scs);
      setSave(sv);
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
               {success === "success" ? (
                  <div className="logo success">
                     <FaCheckCircle />
                  </div>
               ) : success === "failed" ? (
                  <div className="logo failed">
                     <FaTimesCircle />
                  </div>
               ) : null}
               <p>{message}</p>
               <div className="confirm-buttons">
                  {save === "neutral" ? (
                     <button className="save" onClick={handleYes}>
                        OK
                     </button>
                  ) : (
                     <>
                        <button
                           className="danger"
                           onClick={save === "save" ? handleNo : handleYes}
                        >
                           {save === "save" ? "No" : "Yes"}
                        </button>
                        <button
                           className="save"
                           onClick={save === "save" ? handleYes : handleNo}
                        >
                           {save === "save" ? "Yes" : "No"}
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      ) : null;

   return { confirm, ConfirmDialog };
}
