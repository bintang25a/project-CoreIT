import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import "./galleries.css";
import { createImage } from "../../../_services/galleries.js";

export default function GalleryAdd() {
   //Kode data disimpan dari database
   const [imagePreview, setImagePreview] = useState(null);
   const initialFormData = {
      name: "",
      category: "",
      image: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const [fileImage, setFileImage] = useState(false);
   const category = [
      "Meeting",
      "Program",
      "Project",
      "Competition",
      "Achievment",
   ];
   const navigateBack = useNavigate();
   const navigate = useNavigate();

   //Kode add data
   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "image") {
         const file = files[0];
         setFileImage(true);
         setImagePreview(URL.createObjectURL(file));

         setFormData({
            ...formData,
            image: file,
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

         await createImage(payload);

         alert("Add image successfully");
         navigate("/admin/galleries");
      } catch (error) {
         console.log(error);
         alert("Add galleries failed\n" + error);
      }
   };

   return (
      <main className="galleries">
         <div className="header">
            <h1>Add Image</h1>
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
            <div className="search"></div>
         </div>
         <div className="name-space">Add Image to CORE IT Galleries</div>

         <div className="content-add">
            <form onSubmit={handleSubmit}>
               <div className="form-container">
                  <div className="top-section">
                     <div className="left-section">
                        <label className="input-image">
                           <input
                              type="file"
                              accept="image/*"
                              name="image"
                              id="image"
                              onChange={handleChange}
                           />
                           {fileImage ? (
                              <img src={imagePreview} alt="Main Preview" />
                           ) : (
                              <>
                                 Image <FiUpload className="icon-style" />
                              </>
                           )}
                        </label>
                     </div>
                     <div className="right-section">
                        <input
                           type="text"
                           name="name"
                           id="name"
                           onChange={handleChange}
                           value={formData.name}
                           placeholder="Nama gambar"
                           required
                        />
                        <input
                           type="text"
                           name="category"
                           id="category"
                           onChange={handleChange}
                           value={formData.category}
                           placeholder="Choose category below"
                           disabled
                           required
                        />
                        <div className="category">
                           {category.map((data, i) => (
                              <button
                                 key={i}
                                 type="button"
                                 name="category"
                                 id="category"
                                 value={data.toLocaleLowerCase()}
                                 onClick={handleChange}
                              >
                                 {data}
                              </button>
                           ))}
                        </div>
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
