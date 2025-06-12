import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import React from "react";
import { createStaffs } from "../../../_services/staffs.js";
import { FiUpload } from "react-icons/fi";
import "./staff.css";

export default function Registers() {
   const { members, fetchData } = useOutletContext();

   //Kode data disimpan dari database
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (members.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [members, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (members.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [members, fetchData, isLoading]);

   //Kode set count
   const [countTerm, setCountTerm] = useState(1);
   const [count, setCount] = useState(1);
   const handleCountTerm = (search) => {
      setCountTerm(search);
   };
   const handleCountSubmit = () => {
      if (count > countTerm) {
         const confirmSet = window.confirm(
            "Data will not be saved, are you sure?"
         );

         if (confirmSet) {
            setCount(countTerm);
         }
      } else {
         setCount(countTerm);
      }
   };

   //Kode add staff
   const [fileSelected, setFileSelected] = useState({});
   const [imagePreview, setImagePreview] = useState({});
   const [disableInput, setDisableInput] = useState(false);
   const [submitted, setSubmitted] = useState([]);
   const navigate = useNavigate();
   const initialFormData = {
      position: "",
      nim: "",
      password: "",
      photo: null,
      instagram: "",
      linkedin: "",
      github: "",
   };
   const [formData, setFormData] = useState(
      Array(Number(count))
         .fill()
         .map(() => ({ ...initialFormData }))
   );

   const handleChange = (e, i) => {
      const { name, value, files } = e.target;

      if (name === "photo") {
         const file = files[0];
         setImagePreview((prev) => ({
            ...prev,
            [i]: URL.createObjectURL(file),
         }));
         setFileSelected((prev) => ({
            ...prev,
            [i]: true,
         }));

         setFormData((prev) => ({
            ...prev,
            [i]: {
               ...prev[i],
               photo: files[0],
            },
         }));
      } else {
         setFormData((prev) => ({
            ...prev,
            [i]: {
               ...prev[i],
               [name]: value,
            },
         }));
      }
   };
   const handleSubmit = async (e, i) => {
      e.preventDefault();

      try {
         const payload = new FormData();
         for (const key in formData[i]) {
            console.log(formData[key]);
            payload.append(key, formData[i][key]);
         }

         await createStaffs(payload);

         setSubmitted((prev) =>
            prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
         );

         setDisableInput(true);

         alert("Add staffs successfully");

         if (submitted.length + 1 === Number(count)) {
            navigate("/admin/staffs");
         }
      } catch (error) {
         console.log(error);
         alert("Add staffs failed\n" + error);
      }
   };
   const handleSubmits = async (e) => {
      e.preventDefault();

      try {
         await Promise.all(
            Array(Number(count))
               .fill()
               .map((_, i) => {
                  if (!submitted.includes(i)) {
                     const payload = new FormData();
                     for (const key in formData[i]) {
                        payload.append(key, formData[i][key]);
                     }

                     return createStaffs(payload).then(() => {
                        setSubmitted((prev) =>
                           prev.includes(i)
                              ? prev.filter((item) => item !== i)
                              : [...prev, i]
                        );

                        if (submitted) {
                           setDisableInput(true);
                        }
                     });
                  } else {
                     return Promise.resolve();
                  }
               })
         );

         alert("Add all staffs successfully");
         navigate("/admin/staffs");
      } catch (error) {
         console.log(error);
         alert("Add staffs failed\n" + error);
      }
   };
   const scrollRef = useRef(null);

   const handleReset = () => {
      const confirm = window.confirm("Are you sure? the data will be lost");

      if (confirm) {
         setSubmitted([]);
         setCount(1);
         setCountTerm(1);
         setDisableInput(false);
         setFileSelected({});
         setImagePreview({});
      }
   };

   console.table(formData);

   return (
      <main className="staffs">
         <div className="header">
            <h1>CORE IT Staffs</h1>
         </div>
         <div className="navigation">
            <div className="button">
               <Link to={"/admin/staffs"} className="btn button-back">
                  ← Back to staff
               </Link>
               <button className="btn button-save" onClick={handleSubmits}>
                  Save all
               </button>
               <button className="btn" onClick={handleReset}>
                  Reset
               </button>
            </div>
            <div className="count">
               <label htmlFor="count">Number staff created</label>
               <input
                  type="number"
                  name="count"
                  id="count"
                  placeholder="10"
                  value={countTerm}
                  onChange={(e) => handleCountTerm(e.target.value)}
                  disabled={disableInput}
                  inputMode="numeric"
               />
               <button onClick={handleCountSubmit} disabled={disableInput}>
                  Set
               </button>
            </div>
         </div>
         <div className="name-space">New CORE IT Staffs</div>
         <div className="content-register" ref={scrollRef}>
            {Array(Number(count))
               .fill(0)
               .map((_, i) => {
                  if (!submitted.includes(i)) {
                     return (
                        <div className="card" key={i}>
                           <form onSubmit={(e) => handleSubmit(e, i)}>
                              <div className="image">
                                 <label className="input-image">
                                    <input
                                       type="file"
                                       accept="image/*"
                                       name="photo"
                                       onChange={(e) => handleChange(e, i)}
                                    />
                                    {fileSelected[i] && imagePreview[i] ? (
                                       <img src={imagePreview[i]} />
                                    ) : (
                                       <>
                                          Main Image{" "}
                                          <FiUpload className="icon-style" />
                                       </>
                                    )}
                                 </label>
                              </div>
                              <div className="profile">
                                 <select
                                    name="nim"
                                    value={formData.nim}
                                    onChange={(e) => handleChange(e, i)}
                                 >
                                    <option value="">
                                       {isLoading
                                          ? "Loading ..."
                                          : "--NIM - NAMA--"}
                                    </option>
                                    {members
                                       .filter(
                                          (member) => member.role === "member"
                                       )
                                       .map((member) => (
                                          <option
                                             value={member.nim}
                                             key={member.id}
                                          >
                                             {member.nim + " - " + member.name}
                                          </option>
                                       ))}
                                 </select>
                                 <input
                                    type="text"
                                    name="position"
                                    placeholder="position"
                                    value={formData.position}
                                    onChange={(e) => handleChange(e, i)}
                                    autoComplete="off"
                                 />
                              </div>
                              <div className="support">
                                 <div className="left-section">
                                    <input
                                       type="password"
                                       name="password"
                                       placeholder="create password"
                                       value={formData.password}
                                       onChange={(e) => handleChange(e, i)}
                                       required
                                       autoComplete="new-password"
                                    />
                                    <input
                                       type="text"
                                       name="github"
                                       placeholder="link github"
                                       value={formData.github}
                                       onChange={(e) => handleChange(e, i)}
                                       required
                                    />
                                 </div>
                                 <div className="right-section">
                                    <input
                                       type="text"
                                       name="linkedin"
                                       placeholder="link linkedin"
                                       value={formData.linkedin}
                                       onChange={(e) => handleChange(e, i)}
                                       required
                                    />
                                    <input
                                       type="text"
                                       name="instagram"
                                       placeholder="link instagram"
                                       value={formData.instagram}
                                       onChange={(e) => handleChange(e, i)}
                                       required
                                    />
                                 </div>
                              </div>
                              <div className="button-submit">
                                 <button type="submit">Submit</button>
                              </div>
                           </form>
                        </div>
                     );
                  }
               })}
         </div>
      </main>
   );
}
