import { useEffect, useState } from "react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./news.css";
import { deleteNews } from "../../../_services/news.js";
import useConfirmDialog from "../../../components/admin/ConfirmModal.jsx";

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

export default function News() {
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

   //Kode confirm modal
   const { confirm, ConfirmDialog } = useConfirmDialog();

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

   //Kode search
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
   const filteredInformations = informations.filter(
      (information) =>
         information.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         information.paragraph_1
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
         information.paragraph_2
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
         information.paragraph_3
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
   };

   //Kode pagination
   const itemsPerPage = 10;
   const totalPages = Math.ceil(filteredInformations.length / itemsPerPage);
   const paginatedInformations = filteredInformations.slice(
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
            await Promise.all(idData.map((id) => deleteNews(id)));

            setSelectedIds([]);
            setAlert({
               isOpen: true,
               successMessage: "Delete news successfully",
            });
            alertReset();
            fetchData();
         } catch (error) {
            console.log(error);
            setAlert({
               isOpen: true,
               errorMessage: "Delete news failed\n" + error,
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

   return (
      <main className="news">
         <div className="header">
            <h1>CORE IT News</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <Link to={"add"} className="btn">
                  Add
               </Link>
               {selectedIds.length < 1 || selectedIds.length > 1 ? (
                  <>
                     <button disabled className="btn disable">
                        Edit
                     </button>
                  </>
               ) : (
                  <>
                     <Link className="btn" to={`edit/${selectedIds}`}>
                        Edit
                     </Link>
                  </>
               )}
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
         <div className="content">
            <table>
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Paragraph 1</th>
                     <th>Paragraph 2</th>
                     <th>Paragraph 3</th>
                     <th>Views</th>
                     <th>Navigation</th>
                  </tr>
               </thead>
               <tbody>
                  {isLoading ? (
                     <LoadingRow />
                  ) : (
                     <>
                        {paginatedInformations.map((information) => {
                           const isSelected = selectedIds.includes(
                              information.id
                           );

                           return (
                              <NormalRow
                                 key={information.id}
                                 information={information}
                                 isSelected={isSelected}
                                 handleCheckboxChange={handleCheckboxChange}
                              />
                           );
                        })}
                     </>
                  )}
               </tbody>
            </table>
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
