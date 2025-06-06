import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   getMembers,
   createMember,
   updateMember,
   deleteMember,
} from "../../../_services/members";
import { getDivisions, getDivisionLogo } from "../../../_services/divisions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./member.css";

function NormalRow({ member, isSelected, handleCheckboxChange, logoUrl }) {
   return (
      <tr className="tr" key={member.id}>
         <td>
            <div className="kolom-1">
               <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(member.id)}
               />
               <h1>{member.name}</h1>
            </div>
         </td>
         <td>{member.nim}</td>
         <td>{member.prodi}</td>
         <td>
            <div className="kolom-4">
               <img
                  draggable="false"
                  src={logoUrl + member.division?.logo_path}
                  alt={member.division?.name}
               />
               <h1>{member.division?.name}</h1>
            </div>
         </td>
         <td>{member.role}</td>
         <td>{member.email}</td>
         <td>{member.phone_number}</td>
      </tr>
   );
}

function AddRow({ formData, setFormData, divisions }) {
   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData({
         ...formData,
         [name]: value,
      });
   };

   return (
      <tr className="add">
         <td>
            <input
               type="text"
               name="name"
               id="name"
               value={formData.name}
               onChange={handleChange}
               placeholder="Add new member"
               required
            />
         </td>
         <td>
            <input
               type="text"
               name="nim"
               id="nim"
               value={formData.nim}
               onChange={handleChange}
               placeholder="Member NIM"
               required
            />
         </td>
         <td>
            <input
               type="text"
               name="prodi"
               id="prodi"
               value={formData.prodi}
               onChange={handleChange}
               placeholder="program studi"
               required
            />
         </td>
         <td>
            <select
               name="division"
               id="division"
               value={formData.division}
               onChange={handleChange}
               required
            >
               <option value="">--Select Division--</option>
               {divisions.map((division) => (
                  <option key={division.id} value={division.name.toLowerCase()}>
                     {division.name.toLowerCase()}
                  </option>
               ))}
            </select>
         </td>
         <td>
            <select
               name="role"
               id="role"
               value={formData.role}
               onChange={handleChange}
               required
            >
               <option value="">--Role--</option>
               <option value="member">Member</option>
               <option value="bph">BPH</option>
            </select>
         </td>
         <td>
            <input
               type="email"
               name="email"
               id="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Email"
               required
            />
         </td>
         <td>
            <input
               type="text"
               name="phone_number"
               id="phone_number"
               value={formData.phone_number}
               onChange={handleChange}
               placeholder="Phone Number"
               required
            />
         </td>
      </tr>
   );
}

function EditingRow({
   members,
   selectedIds,
   divisions,
   formData,
   setFormData,
}) {
   const handleChange = (e, id) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [id]: {
            ...prev[id],
            [name]: value,
         },
      }));
   };

   useEffect(() => {
      const initialData = {};
      members
         .filter((member) => selectedIds.includes(member.id))
         .forEach((member) => {
            initialData[member.id] = {
               name: member.name || "",
               nim: member.nim || "",
               prodi: member.prodi || "",
               division: member.division?.name?.toLowerCase() || "",
               role: member.role || "",
               email: member.email || "",
               phone_number: member.phone_number || "",
            };
         });
      setFormData(initialData);
   }, [selectedIds, members, setFormData]);

   return members
      .filter((member) => selectedIds.includes(member.id))
      .map((member) => (
         <tr className="tr" key={member.id}>
            <td>
               <input
                  type="text"
                  name="name"
                  value={formData[member.id]?.name || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               />
            </td>
            <td>
               <input
                  type="text"
                  name="nim"
                  value={formData[member.id]?.nim || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               />
            </td>
            <td>
               <input
                  type="text"
                  name="prodi"
                  value={formData[member.id]?.prodi || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               />
            </td>
            <td>
               <select
                  name="division"
                  value={formData[member.id]?.division || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               >
                  <option value="">--Select Division--</option>
                  {divisions.map((division) => (
                     <option
                        key={division.id}
                        value={division.name.toLowerCase()}
                     >
                        {division.name.toLowerCase()}
                     </option>
                  ))}
               </select>
            </td>
            <td>
               <select
                  name="role"
                  value={formData[member.id]?.role || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               >
                  <option value="">--Role--</option>
                  <option value="member">Member</option>
                  <option value="bph">BPH</option>
               </select>
            </td>
            <td>
               <input
                  type="email"
                  name="email"
                  value={formData[member.id]?.email || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               />
            </td>
            <td>
               <input
                  type="text"
                  name="phone_number"
                  value={formData[member.id]?.phone_number || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required
               />
            </td>
         </tr>
      ));
}

function LoadingRow() {
   return Array(10)
      .fill(0)
      .map((_, i) => (
         <tr key={i}>
            <td colSpan={7}>
               <Skeleton />
            </td>
         </tr>
      ));
}

export default function Members() {
   //Kode data disimpan dari database
   const [members, setMembers] = useState([]);
   const [divisions, setDivisions] = useState([]);
   const [logoUrl, setLogoUrl] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   // Kode search
   const { divisionName } = useParams();
   const navigateBack = useNavigate();
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const filteredMembers = members.filter(
      (member) =>
         member.role !== "admin" &&
         member.role !== "registrant" &&
         (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.division?.name
               .toLowerCase()
               .includes(searchTerm.toLowerCase()) ||
            member.prodi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone_number
               .toLowerCase()
               .includes(searchTerm.toLowerCase()))
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
   };

   //Kode pagination
   const itemsPerPage = 10;
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
   const scroll = (direction) => {
      const offset = direction === "left" ? -2000 : 2000;
      scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
   };

   //Kode add member
   const initialFormData = {
      name: "",
      nim: "",
      prodi: "",
      division: "",
      role: "",
      email: "",
      phone_number: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const formRef = useRef(null);
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         if (!isEditing) {
            const payload = new FormData();
            for (const key in formData) {
               payload.append(key, formData[key]);
            }

            await createMember(payload);

            alert("Add member successfully");
            setFormData(initialFormData);
            navigate("/admin/members");
         } else {
            await Promise.all(
               selectedIds.map(async (id) => {
                  const payload = new FormData();
                  const data = formData[id]; // Ambil data berdasarkan ID
                  for (const key in data) {
                     payload.append(key, data[key]);
                  }

                  await updateMember(id, payload); // Kirim ID dan data
               })
            );

            alert("Edit members successfully");
            setFormData({});
            setSelectedIds([]);
            setIsEditing(false);
            navigate("/admin/members");
         }
      } catch (error) {
         console.log(error);
         alert("Add or Edit members failed\n" + error);
      }
   };
   const triggerSubmit = () => {
      if (formRef.current) {
         formRef.current.requestSubmit();
      }
   };

   //Kode edit member
   const [selectedIds, setSelectedIds] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const handleEdit = () => setIsEditing((prev) => !prev);
   const handleCheckboxChange = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };

   //Kode delete member
   const handleDelete = async (idData) => {
      let confirmDelete = false;
      if (!isEditing && idData.length > 0) {
         confirmDelete = window.confirm("Apus ga nih?");
      }

      if (confirmDelete) {
         try {
            await Promise.all(idData.map((id) => deleteMember(id)));

            setSelectedIds([]);
            alert("Delete members successfully");
            navigate("/admin/members");
         } catch (error) {
            console.log(error);
            alert("Delete members failed\n" + error);
         }
      }
   };

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [membersData, divisionsData, logoUrlData] = await Promise.all([
            getMembers(),
            getDivisions(),
            getDivisionLogo(),
         ]);

         if (divisionName) {
            setSearchTerm(divisionName);
         }
         setMembers(membersData);
         setIsLoading(false);
         setDivisions(divisionsData);
         setLogoUrl(logoUrlData);
      };

      if (!isEditing) {
         const interval = setInterval(() => {
            fetchData();
         }, 5000);

         return () => clearInterval(interval);
      }
   }, [isEditing, divisionName]);

   return (
      <main className="members">
         <div className="header">
            <h1>CORE IT Members</h1>
         </div>
         <div className="navigation">
            <div className="button">
               {divisionName ? (
                  <button
                     className="button-back"
                     onClick={() => navigateBack(-1)} // kembali ke halaman sebelumnya
                  >
                     ← Back
                  </button>
               ) : (
                  <>
                     <button onClick={triggerSubmit}>
                        {isEditing ? "Save" : "Add"}
                     </button>
                     <button
                        disabled={selectedIds.length < 1}
                        onClick={handleEdit}
                        className={selectedIds < 1 ? "disable" : ""}
                     >
                        Edit
                     </button>
                     <button
                        disabled={selectedIds.length < 1 || isEditing}
                        onClick={() => handleDelete(selectedIds)}
                        className={
                           selectedIds < 1 || isEditing ? "disable" : ""
                        }
                     >
                        Delete
                     </button>
                  </>
               )}
            </div>
            <div className="search">
               <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  disabled={isEditing}
               />
            </div>
         </div>
         <div className="content" ref={scrollRef}>
            <form onSubmit={handleSubmit} ref={formRef}>
               <table>
                  <thead>
                     <tr>
                        <th>name</th>
                        <th>NIM</th>
                        <th>Prodi</th>
                        <th>division</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                     </tr>
                  </thead>
                  <tbody>
                     {isLoading ? (
                        <LoadingRow />
                     ) : isEditing ? (
                        <EditingRow
                           selectedIds={selectedIds}
                           members={members}
                           divisions={divisions}
                           formData={formData}
                           setFormData={setFormData}
                        />
                     ) : (
                        <>
                           <AddRow
                              divisions={divisions}
                              formData={formData}
                              setFormData={setFormData}
                           />

                           {paginatedMembers.map((member) => {
                              const isSelected = selectedIds.includes(
                                 member.id
                              );

                              return (
                                 <NormalRow
                                    key={member.id}
                                    member={member}
                                    isSelected={isSelected}
                                    handleCheckboxChange={handleCheckboxChange}
                                    logoUrl={logoUrl}
                                 />
                              );
                           })}
                        </>
                     )}
                  </tbody>
               </table>
            </form>
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
