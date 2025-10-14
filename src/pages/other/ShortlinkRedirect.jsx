import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getShortlinks } from "../../_services/shortlinks";

export default function ShortlinkRedirect() {
   const { slug } = useParams();
   const navigate = useNavigate();
   const [target, setTarget] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchShortlink = async () => {
         try {
            const [shortlinksData] = await Promise.all([getShortlinks()]);
            const shortlink = await shortlinksData.find(
               (shortlink) => shortlink.shortlink === slug
            );

            setTarget(shortlink.target);
            setLoading(false);
         } catch (err) {
            console.error(err);
            setError("Shortlink not found or invalid.");
         } finally {
            setLoading(false);
         }
      };

      fetchShortlink();
   }, [slug]);

   useEffect(() => {
      if (target) {
         const timer = setTimeout(() => {
            window.location.replace(target);
         }, 1000);
         return () => clearTimeout(timer);
      }
   }, [target]);

   return (
      <div className="not-found">
         <div className="container">
            {loading && (
               <>
                  <h1>Trying to redirect ...</h1>
                  <p>Please wait more patient ...</p>
               </>
            )}

            {!loading && !error && (
               <>
                  <h1>Redirect to ... </h1>
                  <p>{target}</p>
               </>
            )}

            {!loading && !target && (
               <>
                  <h1>Redirect Failed</h1>
                  <p>Refresh this page and try again</p>
                  <button onClick={() => navigate(-1, { replace: true })}>
                     <FaArrowLeft />
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
