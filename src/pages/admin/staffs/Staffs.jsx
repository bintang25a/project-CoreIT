import { useEffect, useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../../../_services/members";
import {
   getStaffs,
   createStaffs,
   deleteStaff,
   updateStaff,
} from "../../../_services/staffs.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./staff.css";

function NormalRow({ staff, isSelected, handleCheckboxChange }) {
   return (
      <tr className="tr" key={staff.id}>
         <td>
            <div className="kolom-1">
               <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(staff.id)}
               />
               <h1>{staff.position}</h1>
            </div>
         </td>
         <td>{staff.user?.nim}</td>
         <td>{staff.user?.name}</td>
         <td>{staff.gallery?.path}</td>
         <td>{staff.instagram}</td>
         <td>{staff.linkedin}</td>
         <td>{staff.github}</td>
      </tr>
   );
}

function AddRow({
   formData,
   setFormData,
   members,
   fileSelected,
   setFileSelected,
}) {
   const [fileUploadName, setFileUploadName] = useState("");
   const inputRef = useRef(null);

   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "photo") {
         setFileSelected(true);
         setFileUploadName(e.target.files[0].name);

         setFormData({
            ...formData,
            photo: files[0],
         });
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   return (
      <tr className="add">
         <td>
            <input
               type="text"
               name="position"
               id="position"
               value={formData.position}
               onChange={handleChange}
               placeholder="Add member to CORE IT Staff"
               required
            />
         </td>

         <td>
            <input
               type="text"
               name="password"
               id="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="password"
               required
            />
         </td>
         <td>
            <select
               name="nim"
               id="nim"
               required
               onChange={handleChange}
               value={formData.nim}
            >
               <option value="">--NIM - Nama--</option>
               {members
                  .filter((member) => member.role != "bph")
                  .map((member) => (
                     <option key={member.id} value={member.nim}>
                        {member.nim} - {member.name}
                     </option>
                  ))}
            </select>
         </td>
         <td>
            <label className={`file-upload ${fileSelected ? "has-file" : ""}`}>
               {fileSelected ? fileUploadName : "Upload Photo"}
               <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  ref={inputRef}
                  onChange={handleChange}
                  required
               />
            </label>
         </td>
         <td>
            <input
               type="text"
               name="instagram"
               id="instagram"
               value={formData.instagram}
               onChange={handleChange}
               placeholder="Instagram link"
            />
         </td>
         <td>
            <input
               type="text"
               name="linkedin"
               id="linkedin"
               value={formData.linkedin}
               onChange={handleChange}
               placeholder="Lnkedin link"
            />
         </td>
         <td>
            <input
               type="text"
               name="github"
               id="github"
               value={formData.github}
               onChange={handleChange}
               placeholder="Github link"
            />
         </td>
      </tr>
   );
}

function EditingRow({ members, staffs, selectedIds, formData, setFormData }) {
   const [fileUploadName, setFileUploadName] = useState({});
   const [fileSelected, setFileSelected] = useState({});
   const inputRef = useRef(null);

   const handleChange = (e, staffId) => {
      const { name, value, files } = e.target;

      if (name === "photo") {
         setFileSelected((prev) => ({
            ...prev,
            [staffId]: true,
         }));

         setFileUploadName((prev) => ({
            ...prev,
            [staffId]: files[0].name,
         }));

         setFormData((prev) => ({
            ...prev,
            [staffId]: {
               ...prev[staffId],
               photo: files[0],
            },
         }));
      } else if (name === "nim") {
         const selectedMember = members.find((m) => m.nim === value);
         setFormData((prev) => ({
            ...prev,
            [staffId]: {
               ...prev[staffId],
               nim: value,
               name: selectedMember?.name || "",
            },
         }));
      } else if (name === "name") {
         const selectedMember = members.find((m) => m.name === value);
         setFormData((prev) => ({
            ...prev,
            [staffId]: {
               ...prev[staffId],
               name: value,
               nim: selectedMember?.nim || "",
            },
         }));
      } else {
         setFormData((prev) => ({
            ...prev,
            [staffId]: {
               ...prev[staffId],
               [name]: value,
            },
         }));
      }
   };

   useEffect(() => {
      const initialData = {};
      staffs
         .filter((staff) => selectedIds.includes(staff.id))
         .forEach((staff) => {
            initialData[staff.id] = {
               position: staff.position || "",
               nim: staff.nim || "",
               name: staff.user?.name || "",
               photo: null,
               instagram: staff.instagram || "",
               linkedin: staff.linkedin || "",
               github: staff.github || "",
            };
         });

      setFormData(initialData);
   }, [selectedIds, staffs, setFormData]);

   return staffs
      .filter((staff) => selectedIds.includes(staff.id))
      .map((staff) => (
         <tr key={staff.id}>
            <td>
               <input
                  type="text"
                  name="position"
                  id="position"
                  value={formData[staff.id]?.position || ""}
                  onChange={(e) => handleChange(e, staff.id)}
                  placeholder="add position"
                  required
               />
            </td>
            <td>
               <select
                  name="nim"
                  required
                  onChange={(e) => handleChange(e, staff.id)}
                  value={formData[staff.id]?.nim || ""}
               >
                  <option value="">--NIM--</option>
                  {members.map((member) => (
                     <option key={member.id} value={member.nim}>
                        {member.nim}
                     </option>
                  ))}
               </select>
            </td>
            <td>
               <select
                  name="name"
                  required
                  onChange={(e) => handleChange(e, staff.id)}
                  value={formData[staff.id]?.name || ""}
               >
                  <option value="">--MEMBER NAME--</option>
                  {members.map((member) => (
                     <option key={member.id} value={member.name}>
                        {member.name}
                     </option>
                  ))}
               </select>
            </td>
            <td>
               <label
                  className={`file-upload ${
                     fileSelected[staff.id] ? "has-file" : ""
                  }`}
               >
                  {fileSelected[staff.id]
                     ? fileUploadName[staff.id]
                     : "Upload Photo"}
                  <input
                     type="file"
                     accept="image/*"
                     name="photo"
                     id="photo"
                     ref={inputRef}
                     onChange={(e) => handleChange(e, staff.id)}
                  />
               </label>
            </td>
            <td>
               <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  value={formData[staff.id]?.instagram || ""}
                  onChange={(e) => handleChange(e, staff.id)}
                  placeholder="Instagram link"
               />
            </td>
            <td>
               <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={formData[staff.id]?.linkedin || ""}
                  onChange={(e) => handleChange(e, staff.id)}
                  placeholder="Lnkedin link"
               />
            </td>
            <td>
               <input
                  type="text"
                  name="github"
                  id="github"
                  value={formData[staff.id]?.github || ""}
                  onChange={(e) => handleChange(e, staff.id)}
                  placeholder="Github link"
               />
            </td>
         </tr>
      ));
}

function LoadingRow() {
   return Array(11)
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
   const [staffs, setStaffs] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   //Kode search
   const [searchTerm, setSearchTerm] = useState("");
   const filteredStaffs = staffs.filter(
      (staff) =>
         staff.user?.role !== "admin" &&
         (staff.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.user?.nim.toLowerCase().includes(searchTerm.toLowerCase()))
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
      setCurrentPage(1);
   };

   //Kode pagination
   const itemsPerPage = 10;
   const [currentPage, setCurrentPage] = useState(1);
   const scrollRef = useRef(null);
   const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);
   const paginatedStaffs = filteredStaffs.slice(
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

   //Kode add staff
   const initialFormData = {
      position: "",
      nim: "",
      password: "",
      photo: null,
      instagram: "",
      linkedin: "",
      github: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const [fileSelected, setFileSelected] = useState(false);
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

            await createStaffs(payload);

            alert("Add staff successfully");
            setFileSelected(false);
            setFormData(initialFormData);
            navigate("/admin/staffs");
         } else {
            await Promise.all(
               selectedIds.map(async (id) => {
                  const payload = new FormData();
                  const data = formData[id];

                  for (const key in data) {
                     if (key === "photo") {
                        if (data.photo instanceof File) {
                           payload.append("photo", data.photo);
                        }
                     } else {
                        payload.append(key, data[key]);
                     }
                  }

                  await updateStaff(id, payload);
               })
            );

            alert("Edit staffs successfully");
            setFormData({});
            setSelectedIds([]);
            setIsEditing(false);
            navigate("/admin/staffs");
         }
      } catch (error) {
         console.log(error);
         alert("Add or Edit staffs failed\n" + error);
      }
   };
   const triggerSubmit = () => {
      if (formRef.current) {
         formRef.current.requestSubmit();
      }
   };

   //Kode edit staff
   const [selectedIds, setSelectedIds] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const handleEdit = () => setIsEditing((prev) => !prev);
   const handleCheckboxChange = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };

   //Kode delete staff
   const handleDelete = async (idData) => {
      let confirmDelete = false;
      if (!isEditing && idData.length > 0) {
         confirmDelete = window.confirm("Apus ga nih?");
      }

      if (confirmDelete) {
         try {
            await Promise.all(idData.map((id) => deleteStaff(id)));

            setSelectedIds([]);
            alert("Delete staffs successfully");
            navigate("/admin/staffs");
         } catch (error) {
            console.error(error);
            alert("Delete staff failed\n" + error);
         }
      }
   };

   //Kode mengambil semua data saat halaman dimuat
   useEffect(() => {
      const fetchData = async () => {
         const [membersData, staffsData] = await Promise.all([
            getMembers(),
            getStaffs(),
         ]);

         setStaffs(staffsData);
         setMembers(membersData);
         setIsLoading(false);
      };

      if (!isEditing) {
         const interval = setInterval(() => {
            fetchData();
         }, 5000);

         return () => clearInterval(interval);
      }

      setFileSelected(false);
   }, [isEditing]);

   console.table(formData);

   return (
      <main className="staffs">
         <div className="header">
            <h1>CORE IT Staffs</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <button className="btn" onClick={triggerSubmit}>
                  {isEditing ? "Save" : "Add"}
               </button>
               <button
                  disabled={selectedIds.length < 1}
                  onClick={handleEdit}
                  className={selectedIds < 1 ? "disable btn" : "btn"}
               >
                  Edit
               </button>
               <button
                  disabled={selectedIds.length < 1 || isEditing}
                  onClick={() => handleDelete(selectedIds)}
                  className={
                     selectedIds < 1 || isEditing ? "disable btn" : "btn"
                  }
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
                  disabled={isEditing}
               />
            </div>
         </div>
         <div className="content" ref={scrollRef}>
            <form ref={formRef} onSubmit={handleSubmit}></form>
            <table>
               <thead>
                  <tr>
                     <th>Position</th>
                     <th>NIM</th>
                     <th>Name</th>
                     <th>Photo path</th>
                     <th>Instagram link</th>
                     <th>LinkedIn link</th>
                     <th>Github link</th>
                  </tr>
               </thead>
               <tbody>
                  {isLoading ? (
                     <LoadingRow />
                  ) : isEditing ? (
                     <EditingRow
                        members={members}
                        staffs={staffs}
                        selectedIds={selectedIds}
                        formData={formData}
                        setFormData={setFormData}
                        fileSelected={fileSelected}
                        setFileSelected={setFileSelected}
                     />
                  ) : (
                     <>
                        <AddRow
                           formData={formData}
                           setFormData={setFormData}
                           members={members}
                           fileSelected={fileSelected}
                           setFileSelected={setFileSelected}
                        />

                        {paginatedStaffs.map((staff) => {
                           const isSelected = selectedIds.includes(staff.id);

                           return (
                              <NormalRow
                                 key={staff.id}
                                 staff={staff}
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
