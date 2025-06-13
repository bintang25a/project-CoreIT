import { useEffect, useState } from "react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./galleries.css";
import { deleteImage } from "../../../_services/galleries.js";
import useConfirmDialog from "../../../components/admin/ConfirmModal.jsx";

export default function Galleries() {
   const { images, imageUrl, fetchData } = useOutletContext();

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

   //Kode confirm modal
   const { confirm, ConfirmDialog } = useConfirmDialog();

   //Kode data disimpan dari database
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
   }, [images, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (images.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [images, fetchData, isLoading]);

   //Kode modal
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
      let result = false;
      if (idData.length > 0) {
         result = await confirm("Are you sure you want to delete this?");
      }

      if (result) {
         try {
            await Promise.all(idData.map((id) => deleteImage(id)));

            setSelectedIds([]);
            setAlert({
               isOpen: true,
               successMessage: "Delete iamges successfully",
            });
            alertReset();
            fetchData();
         } catch (error) {
            console.log(error);
            setAlert({
               isOpen: true,
               errorMessage: error,
            });
            alertReset();
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
         <ConfirmDialog />
      </main>
   );
}
