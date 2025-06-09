import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./galleries.css";
import {
   getImages,
   getImageUrl,
   deleteImage,
} from "../../../_services/galleries.js";

export default function Galleries() {
   //Kode data disimpan dari database
   const [images, setImages] = useState([]);
   const [imageUrl, setImageUrl] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedImage, setSelectedImage] = useState(null);

   const openModal = (image) => setSelectedImage(image);
   const closeModal = () => setSelectedImage(null);

   //Kode search
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
   const filteredImages = images.filter(
      (image) =>
         image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         image.category.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
   };

   //Kode pagination
   const itemsPerPage = 25;
   const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
   const paginatedImages = filteredImages.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );
   const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
   };
   const handlePrevious = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
   };
   const handleNext = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   };

   //Kode delete staff
   const [selectedIds, setSelectedIds] = useState([]);
   const handleDelete = async (idData) => {
      let confirmDelete = false;
      if (idData.length > 0) {
         confirmDelete = window.confirm("Apus ga nih?");
      }

      if (confirmDelete) {
         try {
            await Promise.all(idData.map((id) => deleteImage(id)));
            setImages((prev) => prev.filter((img) => !idData.includes(img.id)));

            setSelectedIds([]);
            alert("Delete images successfully");
         } catch (error) {
            console.log(error);
            alert("Delete images failed\n" + error);
         }
      }
   };
   const handleCheckboxChange = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };
   const handleClearCheckBox = () => {
      setSelectedIds([]);
   };

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [imagesData, imageUrlData] = await Promise.all([
            getImages(),
            getImageUrl(),
         ]);

         setImages(imagesData);
         setImageUrl(imageUrlData);
         setIsLoading(false);
      };

      fetchData();
   }, [paginatedImages]);

   return (
      <main className="galleries">
         <div className="header" id="header">
            <h1>CORE IT Gallery</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <Link to={"add"} className="btn">
                  Add
               </Link>
               <button
                  className={selectedIds.length < 1 ? "disable btn" : "btn"}
                  onClick={handleClearCheckBox}
                  disabled={selectedIds.length < 1}
               >
                  Reset
               </button>
               <button
                  disabled={selectedIds.length < 1}
                  onClick={() => handleDelete(selectedIds)}
                  className={selectedIds < 1 ? "disable btn" : "btn"}
               >
                  Delete
               </button>
            </div>
            <div className="search">
               <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
               />
            </div>
         </div>
         <div className="name-space">Pages {currentPage}</div>
         <div className="content">
            <div className="gallery-grid">
               {isLoading
                  ? Array(6)
                       .fill(0)
                       .map((_, i) => (
                          <div className="gallery-item" key={i}>
                             <Skeleton width={"20vw"} height={"30vw"} />
                          </div>
                       ))
                  : paginatedImages.map((image, index) => {
                       const isSelected = selectedIds.includes(image.id);
                       return (
                          <div className="gallery-item" key={index}>
                             <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleCheckboxChange(image.id)}
                             />
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
         <div className="pagination">
            <div className="left-section">
               <button onClick={handlePrevious} disabled={currentPage === 1}>
                  Previous
               </button>
               <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
               >
                  Next
               </button>
            </div>
            <div className="right-section">
               {Array.from({ length: totalPages }, (_, index) => (
                  <button
                     key={index + 1}
                     onClick={() => handlePageClick(index + 1)}
                     className={currentPage === index + 1 ? "active" : ""}
                     disabled={currentPage === index + 1}
                  >
                     {index + 1}
                  </button>
               ))}
            </div>
         </div>
      </main>
   );
}
