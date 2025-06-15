import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Galleries() {
   const { images, imageUrl, fetchData } = useOutletContext();

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (images.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [isLoading, images]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (images.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [fetchData, isLoading, images]);

   useEffect(() => {
      fetchData();
   }, []);

   const [selectedImage, setSelectedImage] = useState(null);
   const openModal = (image) => setSelectedImage(image);
   const closeModal = () => setSelectedImage(null);

   const [searchTerm, setSearchTerm] = useState("");
   const filteredImages = images.filter(
      (image) =>
         image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         image.category.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   return (
      <div className="galleries-public">
         <div className="header">
            <div className="text">
               <h1>CORE IT Gallery</h1>
               <h2>Please take a look</h2>
            </div>
            <div className="search">
               <input
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search image by : category, name or title"
               />
               <div className="category-container">
                  <button onClick={() => handleSearchTerm("meeting")}>
                     Meeting
                  </button>
                  <button onClick={() => handleSearchTerm("program")}>
                     Program
                  </button>
                  <button onClick={() => handleSearchTerm("project")}>
                     Project
                  </button>
                  <button onClick={() => handleSearchTerm("competition")}>
                     Competition
                  </button>
                  <button onClick={() => handleSearchTerm("achievment")}>
                     Achievment
                  </button>
               </div>
            </div>
         </div>
         <div className="content">
            <div className="gallery-grid">
               {filteredImages.slice(0, 20).map((image, index) => {
                  return (
                     <div className="gallery-item" key={index}>
                        <img
                           src={imageUrl + image.path}
                           alt={`Gallery ${index}`}
                           onClick={() => openModal(image)}
                        />
                     </div>
                  );
               })}
            </div>
            {selectedImage && (
               <div className="modal-overlay" onClick={closeModal}>
                  <div
                     className="modal-content"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <button className="close-button" onClick={closeModal}>
                        ×
                     </button>
                     <img
                        src={imageUrl + selectedImage.path}
                        alt="Preview"
                        className="modal-image"
                     />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
