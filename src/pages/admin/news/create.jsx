import { useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { createNews } from "../../../_services/news.js";

export default function NewsAdd() {
   const { informations, fetchData } = useOutletContext();

   //Kode custom alert
   const [alert, setAlert] = useState({
      isOpen: false,
      errorMessage: "",
      successMessage: "",
   });
   const alertReset = () => {
      setTimeout(() => {
         setAlert({
            isOpen: false,
            errorMessage: "",
            successMessage: "",
         });
      }, 5000);
   };

   //Kode data disimpan dari database
   const [mainImagePreview, setMainImagePreview] = useState(null);
   const [bodyImagePreview, setBodyImagePreview] = useState(null);
   const initialFormData = {
      title: "",
      paragraph_1: "",
      paragraph_2: "",
      paragraph_3: "",
      main_image: "",
      body_image: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const [fileMain, setFileMain] = useState(false);
   const [fileBody, setFileBody] = useState(false);
   const navigateBack = useNavigate();
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (informations.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [informations, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (informations.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [informations, fetchData, isLoading]);

   //Kode add data
   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "main_image") {
         const file = files[0];
         setFileMain(true);
         setMainImagePreview(URL.createObjectURL(file));

         setFormData({
            ...formData,
            main_image: file,
         });
      } else if (name === "body_image") {
         const file = files[0];
         setFileBody(true);
         setBodyImagePreview(URL.createObjectURL(file));

         setFormData({
            ...formData,
            body_image: file,
         });
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const payload = new FormData();
         for (const key in formData) {
            payload.append(key, formData[key]);
         }

         await createNews(payload);

         setAlert({
            isOpen: true,
            successMessage: "Add news successfully",
         });
         alertReset();
         navigate("/admin/news");
      } catch (error) {
         console.log(error);
         setAlert({
            isOpen: true,
            errorMessage: "Failed: " + error,
         });
         alertReset();
      }
   };

   return (
      <main className="news">
         <div className="header">
            <h1>Post News</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <button
                  className="btn button-back"
                  onClick={() => navigateBack(-1)}
               >
                  ← Back
               </button>
            </div>
            {alert.isOpen ? (
               <div
                  className={
                     alert.errorMessage ? "alert error" : "alert success"
                  }
               >
                  {alert.errorMessage
                     ? alert.errorMessage
                     : alert.successMessage}
               </div>
            ) : (
               ""
            )}
            <div className="search"></div>
         </div>
         <div className="name-space">
            {isLoading
               ? "Loading ... "
               : "Berita ke-" + (informations.length + 1)}
         </div>
         <div className="content-add-edit">
            <form onSubmit={handleSubmit}>
               <div className="form-container">
                  <div className="top-section">
                     <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Judul Berita"
                        required
                     />
                  </div>
                  <div className="middle-section">
                     <div className="left-section">
                        <label className="input-image">
                           <input
                              type="file"
                              accept="image/*"
                              name="main_image"
                              id="main_image"
                              onChange={handleChange}
                           />
                           {fileMain ? (
                              <img src={mainImagePreview} alt="Main Preview" />
                           ) : (
                              <>
                                 Main Image <FiUpload className="icon-style" />
                              </>
                           )}
                        </label>
                        <label className="input-image">
                           <input
                              type="file"
                              accept="image/*"
                              name="body_image"
                              id="body_image"
                              onChange={handleChange}
                           />
                           {fileBody ? (
                              <img src={bodyImagePreview} alt="Body Preview" />
                           ) : (
                              <>
                                 Body Image <FiUpload className="icon-style" />
                              </>
                           )}
                        </label>
                     </div>
                     <div className="right-section">
                        <textarea
                           type="text"
                           name="paragraph_1"
                           id="paragraph_1"
                           onChange={handleChange}
                           value={formData.paragraph_1}
                           placeholder="Paragraph 1"
                           required
                        />
                        <textarea
                           type="text"
                           name="paragraph_2"
                           id="paragraph_2"
                           onChange={handleChange}
                           value={formData.paragraph_2}
                           placeholder="Paragraph 2"
                           required
                        />
                        <textarea
                           type="text"
                           name="paragraph_3"
                           id="paragraph_3"
                           onChange={handleChange}
                           value={formData.paragraph_3}
                           placeholder="Paragraph 3"
                           required
                        />
                     </div>
                  </div>
                  <div className="bottom-section">
                     <button type="submit">Submit</button>
                  </div>
               </div>
            </form>
         </div>
      </main>
   );
}
