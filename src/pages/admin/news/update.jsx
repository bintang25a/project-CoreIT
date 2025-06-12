import { useEffect, useState } from "react";
import {
   useNavigate,
   Link,
   useParams,
   useOutletContext,
} from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import "./news.css";
import { showNews, updateNews } from "../../../_services/news.js";
import { getImageUrl } from "../../../_services/galleries.js";

export default function NewsEdit() {
   const { informations, fetchData } = useOutletContext();

   //Kode data disimpan dari database
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

   const [mainImagePreview, setMainImagePreview] = useState(null);
   const [bodyImagePreview, setBodyImagePreview] = useState(null);
   const initialFormData = {
      title: "",
      paragraph_1: "",
      paragraph_2: "",
      paragraph_3: "",
      main_image: null,
      body_image: null,
   };
   const [formData, setFormData] = useState(initialFormData);
   const [fileMain, setFileMain] = useState(false);
   const [fileBody, setFileBody] = useState(false);
   const navigateBack = useNavigate();
   const navigate = useNavigate();
   const { id } = useParams();

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [informationData, imageUrlData] = await Promise.all([
            showNews(id),
            getImageUrl(),
         ]);

         setFormData({
            title: informationData.title,
            paragraph_1: informationData.paragraph_1,
            paragraph_2: informationData.paragraph_2,
            paragraph_3: informationData.paragraph_3,
            main_image: informationData.main_image?.path || null,
            body_image: informationData.body_image?.path || null,
         });
         setMainImagePreview(imageUrlData + informationData.main_image?.path);
         setBodyImagePreview(imageUrlData + informationData.body_image?.path);
         setFileMain(true);
         setFileBody(true);
      };

      fetchData();
   }, [id]);

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

      const payload = new FormData();

      for (const key in formData) {
         const value = formData[key];

         if (key === "main_image" || key === "body_image") {
            if (value instanceof File) {
               payload.append(key, value);
            }
         } else {
            payload.append(key, value);
         }
      }

      try {
         await updateNews(id, payload);
         alert("Edit news successfully");
         navigate("/admin/news");
      } catch (error) {
         console.log(error);
         alert("Edit news failed\n" + error);
      }
   };

   const handleSelectChange = (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
         navigate(`/admin/news/edit/${selectedId}`);
      }
   };

   return (
      <main className="news">
         <div className="header">
            <h1>Edit News</h1>
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
            <div className="search">
               <select onChange={handleSelectChange}>
                  <option value="">--Edit other News--</option>
                  {informations.map((information) => (
                     <option key={information.id} value={information.id}>
                        {information.title}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         <div className="name-space">
            {informations
               .filter((information) => information.id == id)
               .map((information) => "Judul: " + information.title)}
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
                        value={formData.title || ""}
                        placeholder="Judul Berita"
                        required
                     />
                  </div>
                  <div className="middle-section">
                     <div className="left-section">
                        <label
                           className={
                              fileMain ? "input-image has-image" : "input-image"
                           }
                        >
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
                        <label
                           className={
                              fileBody ? "input-image has-image" : "input-image"
                           }
                        >
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
                           onChange={handleChange || ""}
                           value={formData.paragraph_1}
                           placeholder="Paragraph 1"
                           required
                        />
                        <textarea
                           type="text"
                           name="paragraph_2"
                           id="paragraph_2"
                           onChange={handleChange || ""}
                           value={formData.paragraph_2}
                           placeholder="Paragraph 2"
                           required
                        />
                        <textarea
                           type="text"
                           name="paragraph_3"
                           id="paragraph_3"
                           onChange={handleChange || ""}
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
