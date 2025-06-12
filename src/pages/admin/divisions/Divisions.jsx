import { useEffect, useState, useRef } from "react";
import React from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import {
   createDivision,
   updateDivision,
   deleteDivision,
} from "../../../_services/divisions.js";
import { FaCheckCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "./divisions.css";

function NormalRow({ division, logoUrl, isSelected, handleCheckboxChange }) {
   return (
      <tr className="tr" key={division.id}>
         <td>
            <div className="kolom-1">
               <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(division.id)}
               />
               <img src={logoUrl + division.logo_path} alt={division.name} />
            </div>
         </td>
         <td>{division.name}</td>
         <td>{division.description}</td>
         <td>{division.user?.length}</td>
         <td>
            <div className="kolom-5">
               <Link
                  to={`/admin/divisions/${division.id}`}
                  className="button view"
               >
                  view
               </Link>
               <Link
                  to={`/admin/members/division/${division.name.toLowerCase()}`}
                  className="button member"
               >
                  member
               </Link>
            </div>
         </td>
      </tr>
   );
}

function AddRow({ formData, setFormData, fileSelected, setFileSelected }) {
   const inputRef = useRef(null);

   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "logo") {
         setFileSelected(true);

         setFormData({
            ...formData,
            logo: files[0],
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
            <label className={`file-upload ${fileSelected ? "has-file" : ""}`}>
               {fileSelected ? (
                  <FaCheckCircle className="icon-style" />
               ) : (
                  "Upload Logo"
               )}
               <input
                  type="file"
                  accept="image/*"
                  name="logo"
                  id="logo"
                  ref={inputRef}
                  onChange={handleChange}
                  required
               />
            </label>
         </td>
         <td>
            <input
               type="text"
               name="name"
               id="name"
               value={formData.name}
               onChange={handleChange}
               placeholder="Add new Division"
               required
            />
         </td>
         <td colSpan={3}>
            <input
               type="text"
               name="description"
               id="description"
               value={formData.description}
               onChange={handleChange}
               placeholder="Description about this new division"
               required
            />
         </td>
      </tr>
   );
}

function EditingRow({ divisions, selectedIds, formData, setFormData }) {
   const [fileSelected, setFileSelected] = useState({});
   const inputRef = useRef(null);

   const handleChange = (e, divisionId) => {
      const { name, value, files } = e.target;

      if (name === "logo") {
         setFileSelected((prev) => ({
            ...prev,
            [divisionId]: true,
         }));

         setFormData((prev) => ({
            ...prev,
            [divisionId]: {
               ...prev[divisionId],
               logo: files[0],
            },
         }));
      } else {
         setFormData((prev) => ({
            ...prev,
            [divisionId]: {
               ...prev[divisionId],
               [name]: value,
            },
         }));
      }
   };

   useEffect(() => {
      const initialData = {};
      divisions
         .filter((division) => selectedIds.includes(division.id))
         .forEach((division) => {
            initialData[division.id] = {
               logo: null,
               name: division.name || "",
               description: division.description || "",
            };
         });

      setFormData(initialData);
   }, [selectedIds, divisions, setFormData]);

   return divisions
      .filter((division) => selectedIds.includes(division.id))
      .map((division) => (
         <tr key={division.id}>
            <td>
               <label
                  className={`file-upload ${
                     fileSelected[division.id] ? "has-file" : ""
                  }`}
               >
                  {fileSelected[division.id] ? (
                     <FaCheckCircle className="icon-style" />
                  ) : (
                     "Upload Logo"
                  )}
                  <input
                     type="file"
                     accept="image/*"
                     name="logo"
                     id="logo"
                     ref={inputRef}
                     onChange={(e) => handleChange(e, division.id)}
                  />
               </label>
            </td>
            <td>
               <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData[division.id]?.name || ""}
                  onChange={(e) => handleChange(e, division.id)}
                  placeholder="edit name"
                  required
               />
            </td>
            <td colSpan={3}>
               <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData[division.id]?.description || ""}
                  onChange={(e) => handleChange(e, division.id)}
                  placeholder="edit description"
                  required
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
            <td colSpan={5}>
               <Skeleton />
            </td>
         </tr>
      ));
}

export default function Divisions() {
   const { divisions, logoUrl, fetchData } = useOutletContext();

   //Kode data disimpan dari database
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (divisions.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [divisions, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (divisions.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [divisions, fetchData, isLoading]);

   //Kode search
   const [searchTerm, setSearchTerm] = useState("");
   const filteredDivisions = divisions.filter(
      (division) =>
         division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         division.description.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   //Kode add staff
   const initialFormData = {
      name: "",
      description: "",
      logo: "",
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

            await createDivision(payload);

            alert("Add division successfully");
            setFileSelected(false);
            setFormData(initialFormData);
            fetchData();
         } else {
            await Promise.all(
               selectedIds.map(async (id) => {
                  const payload = new FormData();
                  const data = formData[id];

                  for (const key in data) {
                     if (key === "logo") {
                        if (data.logo instanceof File) {
                           payload.append("logo", data.logo);
                        }
                     } else {
                        payload.append(key, data[key]);
                     }
                  }

                  await updateDivision(id, payload);
               })
            );

            alert("Edit divisions successfully");
            setFormData({});
            setSelectedIds([]);
            setIsEditing(false);
            fetchData();
            navigate("/admin/divisions");
         }
      } catch (error) {
         console.log(error);
         alert("Add or Edit divisions failed\n" + error);
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
            await Promise.all(idData.map((id) => deleteDivision(id)));

            setSelectedIds([]);
            alert("Deleting divisions successfully");
            fetchData();
         } catch (error) {
            console.error(error);
            alert("Deleting divisions failed\n" + error);
         }
      }
   };

   return (
      <main className="divisions">
         <div className="header">
            <h1>CORE IT {divisions.length} Divisions</h1>
         </div>
         <div className="navigation">
            <div className="button">
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
                  className={selectedIds < 1 || isEditing ? "disable" : ""}
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
         <div className="content">
            <form ref={formRef} onSubmit={handleSubmit}></form>
            <table>
               <thead>
                  <tr>
                     <th>Logo</th>
                     <th>Name</th>
                     <th>Description</th>
                     <th>Member</th>
                     <th>Navigation</th>
                  </tr>
               </thead>
               <tbody className={isEditing ? "edit" : ""}>
                  {isLoading ? (
                     <LoadingRow />
                  ) : isEditing ? (
                     <EditingRow
                        divisions={divisions}
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
                           fileSelected={fileSelected}
                           setFileSelected={setFileSelected}
                        />

                        {filteredDivisions.map((division) => {
                           const isSelected = selectedIds.includes(division.id);

                           return (
                              <NormalRow
                                 key={division.id}
                                 division={division}
                                 logoUrl={logoUrl}
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
      </main>
   );
}
