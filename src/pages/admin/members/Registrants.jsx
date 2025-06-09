import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
   getMembers,
   updateMember,
   deleteMember,
} from "../../../_services/members";
import { getDivisionLogo } from "../../../_services/divisions";
import { FaBan, FaCheck } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./registrants.css";

function Card({ members, logoUrl }) {
   const navigate = useNavigate();

   //Kode reject member
   const handleDelete = async (id) => {
      let confirmDelete = false;
      confirmDelete = window.confirm("Reject nih?");

      if (confirmDelete) {
         try {
            await deleteMember(id);

            alert("Member rejected");
            navigate("/admin/members/registrants");
         } catch (error) {
            console.log(error);
            alert("Reject member failed\n" + error);
         }
      }
   };

   //Kode accept member
   const handleSubmit = async (id, e) => {
      e.preventDefault();

      try {
         const payload = new FormData();
         const member = members.find((m) => m.id === id);
         const division = member.division?.name;

         if (!member) {
            alert("Not found");
            return;
         }

         const data = {
            name: member.name || "",
            nim: member.nim || "",
            prodi: member.prodi || "",
            division: division.toLowerCase() || "",
            role: "member",
            email: member.email || "",
            phone_number: member.phone_number || "",
            link_project: member.link_project || "",
         };

         for (const key in data) {
            payload.append(key, data[key]);
         }

         await updateMember(id, payload);
         navigate("/admin/members/registrants");
      } catch (error) {
         console.log(error);
         alert(error);
      }
   };

   return members.map((member) => (
      <div className="card" key={member.id}>
         <form
            onSubmit={(e) => handleSubmit(member.id, e)}
            className="form-wrapper"
         >
            <div className="header">
               <img
                  src={logoUrl + member.division?.logo_path}
                  alt={member.division?.name}
               />
               {member.division?.name}
            </div>
            <div className="profile">
               <h1>
                  {member.name} | {member.nim}
               </h1>
               <h2>Prodi: {member.prodi}</h2>
            </div>
            <div className="contact">
               <h1>
                  <span>Email:</span> {member.email}
               </h1>
               <h1>
                  <span>Phone:</span> {member.phone_number}
               </h1>
            </div>
            <div className="project">
               <h1>Project:</h1>
               {member.link_project ? (
                  <div className="project-container">
                     {member.link_project
                        .split(" ")
                        .filter((link) => link.trim() !== "")
                        .map((link, idx) => (
                           <span key={idx}>
                              <a
                                 href={link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 Link {idx + 1}
                              </a>
                              {idx !==
                                 member.link_project.split(" ").length - 1 &&
                                 ", "}
                           </span>
                        ))}
                  </div>
               ) : (
                  <h2>no link project upload</h2>
               )}
            </div>
            <div className="footer">
               <button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  className="reject"
               >
                  <FaBan />
               </button>
               <button type="submit" className="accept">
                  <FaCheck /> Accept
               </button>
            </div>
         </form>
      </div>
   ));
}

function CardLoading() {
   return Array(6)
      .fill(0)
      .map((_, i) => (
         <div className="card" key={i}>
            <div className="header">Loading ...</div>
            <div className="profile">
               <Skeleton count={2} width="20vw" />
            </div>
            <div className="contact">
               <Skeleton count={2} width="20vw" />
            </div>
            <div className="project">
               <Skeleton count={2} width="20vw" />
            </div>
            <div className="footer">
               <button type="button" className="reject">
                  <FaBan />
               </button>
               <button type="submit" className="accept">
                  <FaCheck /> Accept
               </button>
            </div>
         </div>
      ));
}

function CardNull() {
   return (
      <div className="card">
         <div className="header"> no registrant</div>
         <div className="profile">no registrant, wait someone to register</div>
         <div className="contact">no registrant, wait someone to register</div>
         <div className="project">no registrant, wait someone to register</div>
         <div className="footer">
            <button type="button" className="reject">
               <FaBan />
            </button>
            <button type="submit" className="accept">
               <FaCheck /> Accept
            </button>
         </div>
      </div>
   );
}

export default function Registrants() {
   //Kode data disimpan dari database
   const [members, setMembers] = useState([]);
   const [logoUrl, setLogoUrl] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   // Kode search
   const navigateBack = useNavigate();
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const filteredMembers = members.filter(
      (member) =>
         member.role === "registrant" &&
         (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.division?.name
               .toLowerCase()
               .includes(searchTerm.toLowerCase()) ||
            member.prodi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone_number
               .toLowerCase()
               .includes(searchTerm.toLowerCase()))
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
   };

   //Kode pagination
   const itemsPerPage = 15;
   const scrollRef = useRef(null);
   const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
   const paginatedMembers = filteredMembers.slice(
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

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [membersData, logoUrlData] = await Promise.all([
            getMembers(),
            getDivisionLogo(),
         ]);

         setMembers(membersData);
         setLogoUrl(logoUrlData);
         setIsLoading(false);
      };

      const interval = setInterval(() => {
         fetchData();
      }, 5000);

      return () => clearInterval(interval);
   }, []);
   console.log(paginatedMembers);
   return (
      <main className="registrants">
         <div className="header">
            <h1>Registrants</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <button
                  className="button-back"
                  onClick={() => navigateBack(-1)} // kembali ke halaman sebelumnya
               >
                  ← Back
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
         <div className="name-space">New CORE IT Member?</div>
         <div className="content" ref={scrollRef}>
            {isLoading ? (
               <CardLoading />
            ) : (
               <>
                  {paginatedMembers.length > 0 ? (
                     <Card members={paginatedMembers} logoUrl={logoUrl} />
                  ) : (
                     <CardNull />
                  )}
               </>
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
