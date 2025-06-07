import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./galleries.css";
import {
   getImages,
   getImageUrl,
   deleteImage,
} from "../../../_services/galleries.js";

function NormalRow({ information, isSelected, handleCheckboxChange }) {
   return (
      <tr className="tr" key={information.id}>
         <td>
            <div className="kolom-1">
               <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(information.id)}
               />
               <h1>{information.title}</h1>
            </div>
         </td>
         <td>{information.paragraph_1}</td>
         <td>{information.paragraph_2}</td>
         <td>{information.paragraph_3}</td>
         <td>{information.views}</td>
         <td>
            <div className="kolom-6">
               <Link
                  to={`/admin/news/${information.id}`}
                  className="btn view"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  view
               </Link>
               <Link
                  to={`/admin/news/edit/${information.id}`}
                  className="btn edit"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  edit
               </Link>
            </div>
         </td>
      </tr>
   );
}

function LoadingRow() {
   return Array(11)
      .fill(0)
      .map((_, i) => (
         <tr key={i}>
            <td colSpan={6}>
               <Skeleton />
            </td>
         </tr>
      ));
}

export default function Galleries() {
   //Kode data disimpan dari database
   const [images, setImages] = useState([]);
   const [imageUrl, setImageUrl] = useState([]);
   // const [isLoading, setIsLoading] = useState(true);

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
   const navigate = useNavigate();
   const [selectedIds, setSelectedIds] = useState([]);
   const handleDelete = async (idData) => {
      let confirmDelete = false;
      if (idData.length > 0) {
         confirmDelete = window.confirm("Apus ga nih?");
      }

      if (confirmDelete) {
         try {
            await Promise.all(idData.map((id) => deleteImage(id)));

            setSelectedIds([]);
            alert("Delete images successfully");
            navigate("/admin/galleries");
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
         // setIsLoading(false);
      };

      const interval = setInterval(() => {
         fetchData();
      }, 5000);

      return () => clearInterval(interval);
   }, []);

   return (
      <main className="galleries">
         <div className="header" id="header">
            <h1>CORE IT News</h1>
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
               {paginatedImages.map((image, index) => {
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
                        />
                     </div>
                  );
               })}
            </div>
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
