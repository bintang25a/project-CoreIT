import { useEffect, useState, useRef } from "react";
import React from "react";
import {
   useNavigate,
   Link,
   useOutletContext,
   useParams,
} from "react-router-dom";
import {
   createShortlink,
   updateShortlink,
   deleteShortlink,
} from "../../../_services/shortlinks.js";
import Skeleton from "react-loading-skeleton";
import useConfirmDialog from "../../../components/elements/ConfirmModal.jsx";
import useLoadingSpinner from "../../../components/elements/LoadingModal.jsx";
import Message from "../../../components/elements/NotFoundData.jsx";

function NormalRow({
   shortlink,
   isSelected,
   handleCheckboxChange,
   handleDelete,
}) {
   const hostUrl = window.location.host;
   const originUrl = window.location.origin;

   return (
      <tr className="tr" key={shortlink.id}>
         <td>
            <div className="kolom-1">
               <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(shortlink.id)}
               />
               {shortlink.id}
            </div>
         </td>
         <td>{`${hostUrl}/me/${shortlink.shortlink}`}</td>
         <td>{shortlink.target}</td>
         <td>
            <div className="kolom-5">
               <a
                  target="_blank"
                  href={`${originUrl}/me/${shortlink.shortlink}`}
                  className="button view"
               >
                  Go To
               </a>
               <button
                  onClick={() => handleDelete([shortlink.id])}
                  className="button member"
               >
                  Delete
               </button>
            </div>
         </td>
      </tr>
   );
}

function AddingRow({ formData, setFormData }) {
   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData({
         ...formData,
         [name]: value,
      });
   };

   return (
      <tr className="add">
         <td colSpan={2}>
            <input
               type="text"
               name="shortlink"
               id="shortlink"
               value={formData.shortlink}
               onChange={handleChange}
               placeholder="Add new short url"
               required
            />
         </td>
         <td colSpan={3}>
            <input
               type="text"
               name="target"
               id="target"
               value={formData.target}
               onChange={handleChange}
               placeholder="Input target url"
               required
            />
         </td>
      </tr>
   );
}

function EditingRow({ shortlinks, selectedIds, formData, setFormData }) {
   const handleChange = (e, shortlinkId) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [shortlinkId]: {
            ...prev[shortlinkId],
            [name]: value,
         },
      }));
   };

   useEffect(() => {
      const initialData = {};
      shortlinks
         .filter((shortlink) => selectedIds.includes(shortlink.id))
         .forEach((shortlink) => {
            initialData[shortlink.id] = {
               target: shortlink.target || "",
               shortlink: shortlink.shortlink || "",
            };
         });

      setFormData(initialData);
   }, [selectedIds, shortlinks, setFormData]);

   return shortlinks
      .filter((shortlink) => selectedIds.includes(shortlink.id))
      .map((shortlink) => (
         <tr className="edit" key={shortlink.id}>
            <td colSpan={2}>
               <input
                  type="text"
                  name="shortlink"
                  id="shortlink"
                  value={formData[shortlink.id]?.shortlink || ""}
                  onChange={(e) => handleChange(e, shortlink.id)}
                  placeholder="Edit shortlink"
                  required
               />
            </td>
            <td colSpan={3}>
               <input
                  type="text"
                  name="target"
                  id="target"
                  value={formData[shortlink.id]?.target || ""}
                  onChange={(e) => handleChange(e, shortlink.id)}
                  placeholder="Edit target url"
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

export default function Shortlinks() {
   const { shortlinks, fetchData } = useOutletContext();
   const { confirm, ConfirmDialog } = useConfirmDialog();
   const { loading, LoadingSpinner } = useLoadingSpinner();

   //Kode data disimpan dari database
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (shortlinks.length > 0) {
            setIsLoading(false);
         } else {
            setTimeout(() => {
               setIsLoading(false);
            }, 2500);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [shortlinks, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading && shortlinks.length < 1) fetchData();
      }, 500);

      return () => clearTimeout(fetchTimeout);
   }, [fetchData, isLoading, shortlinks.length]);

   //Kode search
   const [searchTerm, setSearchTerm] = useState("");
   const filteredShortlinks = shortlinks.filter(
      (shortlinks) =>
         shortlinks.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
         shortlinks.shortlink.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   //Kode add shortlink
   const initialFormData = {
      target: "",
      shortlink: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const formRef = useRef(null);
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      loading(true);

      try {
         if (!isEditing) {
            await createShortlink(formData);

            confirm("Add shortlink successfully", "success", "neutral");
            setFormData(initialFormData);
            fetchData();
            loading(false);
         } else {
            await Promise.all(
               selectedIds.map(async (id) => {
                  const data = formData[id];

                  await updateShortlink(id, data);
               })
            );

            confirm("Edit shortlink successfully", "success", "neutral");
            setFormData({});
            setSelectedIds([]);
            setIsEditing(false);
            fetchData();
            loading(false);
            navigate("/admin/shortlinks");
         }
      } catch (error) {
         console.log(error);
         confirm(error, "failed", "neutral");
         loading(false);
      }
   };
   const triggerSubmit = () => {
      if (formRef.current) {
         formRef.current.requestSubmit();
      }
   };

   //Kode edit shortlinks
   const [selectedIds, setSelectedIds] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const handleEdit = () => setIsEditing((prev) => !prev);
   const handleCheckboxChange = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
   };

   //Kode delete shortlinks
   const handleDelete = async (idData) => {
      let result = false;
      if (!isEditing && idData.length > 0) {
         result = await confirm(
            "Are you sure you want to delete this?",
            "neutral",
            "danger"
         );
      }

      if (result) {
         loading(true);

         try {
            await Promise.all(idData.map((id) => deleteShortlink(id)));

            setSelectedIds([]);
            confirm("Delete shorlink successfully", "success", "neutral");
            fetchData();
            loading(false);
         } catch (error) {
            confirm(error, "failed", "neutral");
            loading(false);
         }
      }
   };

   //Kode untuk edit 1 data
   const navigateBack = useNavigate();
   const { id } = useParams();
   useEffect(() => {
      const ID = Number(id);
      setSelectedIds([]);
      setIsEditing(false);

      if (ID) {
         setSelectedIds([ID]);
         setIsEditing(true);
      }
   }, [id]);

   return (
      <main className="shortlinks">
         <div className="header">
            <h1>CORE IT Shortlinks</h1>
         </div>
         <div className="navigation">
            <div className="button">
               {id ? (
                  <>
                     <button
                        className="button-back btn"
                        onClick={() => navigateBack(-1)}
                     >
                        ← Back
                     </button>
                     <button
                        className="btn button-save"
                        onClick={triggerSubmit}
                     >
                        {isEditing ? "Save" : "Add"}
                     </button>
                  </>
               ) : (
                  <>
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
         <div className="content">
            <form ref={formRef} onSubmit={handleSubmit}>
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Shortlink</th>
                        <th>Target</th>
                        <th>Navigation</th>
                     </tr>
                  </thead>
                  <tbody className={isEditing ? "edit" : ""}>
                     {isLoading ? (
                        <LoadingRow />
                     ) : isEditing ? (
                        <EditingRow
                           shortlinks={shortlinks}
                           selectedIds={selectedIds}
                           formData={formData}
                           setFormData={setFormData}
                        />
                     ) : (
                        <>
                           <AddingRow
                              formData={formData}
                              setFormData={setFormData}
                           />

                           {shortlinks.length > 0 ? (
                              filteredShortlinks.map((shortlink) => {
                                 const isSelected = selectedIds.includes(
                                    shortlink.id
                                 );

                                 return (
                                    <NormalRow
                                       key={shortlink.id}
                                       shortlink={shortlink}
                                       isSelected={isSelected}
                                       handleCheckboxChange={
                                          handleCheckboxChange
                                       }
                                       handleDelete={handleDelete}
                                    />
                                 );
                              })
                           ) : (
                              <tr>
                                 <td colSpan={6}>
                                    <Message
                                       message={
                                          "no divisions in database, create any division"
                                       }
                                    />
                                 </td>
                              </tr>
                           )}
                        </>
                     )}
                  </tbody>
               </table>
            </form>
         </div>
         <ConfirmDialog />
         <LoadingSpinner />
      </main>
   );
}
