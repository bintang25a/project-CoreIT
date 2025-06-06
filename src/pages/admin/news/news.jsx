import { useEffect, useState, useRef } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./news.css";
import { deleteNews, getNews } from "../../../_services/news.js";

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
   //Kode data disimpan dari database
   const [informations, setInformations] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

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
   const scrollRef = useRef(null);
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
   const scroll = (direction) => {
      const offset = direction === "left" ? -2000 : 2000;
      scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
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
            await Promise.all(idData.map((id) => deleteNews(id)));

            setSelectedIds([]);
            alert("Delete news successfully");
            navigate("/admin/news");
         } catch (error) {
            console.log(error);
            alert("Delete news failed\n" + error);
         }
      }
   };
   const handleCheckboxChange = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [informationsData] = await Promise.all([getNews()]);

         setInformations(informationsData);
         setIsLoading(false);
      };

      const interval = setInterval(() => {
         fetchData();
      }, 5000);

      return () => clearInterval(interval);
   }, []);

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
            <div className="middle-section">
               <FaChevronLeft
                  onClick={() => scroll("left")}
                  className="icon-style"
               />
               <h1>scroll</h1>
               <FaChevronRight
                  onClick={() => scroll("right")}
                  className="icon-style"
               />
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
