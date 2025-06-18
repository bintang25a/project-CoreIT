import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { showDivision } from "../../../_services/divisions";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function DivisionLoading() {
   return (
      <>
         <div className="name">
            <h1>Loading ... </h1>
            <Skeleton height={"90%"} />
         </div>
         <div className="description">
            <h1>About ... </h1>
            <div className="box">
               <p>
                  <Skeleton height={"90%"} count={5} />
               </p>
            </div>
         </div>
         <div className="members">
            <div className="nav">
               <h1> ... Members</h1>
               <input type="search" name="search" id="search" />
            </div>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>NIM</th>
                     <th>Program Studi</th>
                     <th>As</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td colSpan={4}>
                        <Skeleton height={"90%"} />
                     </td>
                  </tr>
                  <tr>
                     <td colSpan={4}>
                        <Skeleton height={"90%"} />
                     </td>
                  </tr>
                  <tr>
                     <td colSpan={4}>
                        <Skeleton height={"90%"} />
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </>
   );
}

export default function Division() {
   const { divisionsLogo, setIsClose, fetchData } = useOutletContext();
   const { id } = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [division, setDivision] = useState([]);

   useEffect(() => {
      const fetchDivision = async () => {
         const [divisionData] = await Promise.all([showDivision(id)]);

         setDivision(divisionData);
      };

      fetchDivision();

      const loadingTimeout = setTimeout(() => {
         if (divisionsLogo) {
            setIsLoading(false);
         } else {
            setTimeout(() => {
               setIsLoading(false);
            }, 2500);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [id, divisionsLogo]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (divisionsLogo) {
         clearTimeout(fetchTimeout);
      }
   }, [fetchData, isLoading, divisionsLogo]);

   useEffect(() => {
      const fetchDivision = async () => {
         const [divisionData] = await Promise.all([showDivision(id)]);

         setDivision(divisionData);
      };

      const fetchDataAndStopLoading = async () => {
         await fetchData();
         await fetchDivision();
         setTimeout(() => setIsLoading(false), 250);
      };

      fetchDataAndStopLoading();
   }, [fetchData, id]);

   const [searchTerm, setSearchTerm] = useState("");
   const filteredMembers = division?.user?.filter(
      (member) =>
         member.role !== "registrant" &&
         member.role !== "admin" &&
         (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.prodi.toLowerCase().includes(searchTerm.toLowerCase()))
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   const navigate = useNavigate();
   const handleNavigateBack = () => {
      navigate("/divisions");
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      setIsClose(true);
   }, [setIsClose]);

   return (
      <div className="division-public">
         {isLoading ? (
            <DivisionLoading />
         ) : (
            <>
               <div className="name" onClick={handleNavigateBack}>
                  <h1>{division.name}</h1>
                  <img
                     src={divisionsLogo + division.logo_path}
                     alt={division.name}
                  />
                  <div className="back">
                     <h1>Click to Back</h1>
                  </div>
               </div>
               <div className="description">
                  <h1>About {division.name}</h1>
                  <div className="box">
                     <p>{division.description}</p>
                  </div>
               </div>
               <div className="members">
                  <div className="nav">
                     <h1>{division.name} Members</h1>
                     <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder={`Search ${division.name} member`}
                        value={searchTerm}
                        onChange={(e) => handleSearchTerm(e.target.value)}
                     />
                  </div>
                  <table>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>NIM</th>
                           <th>Program Studi</th>
                           <th>As</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredMembers?.map((member) => (
                           <tr>
                              <td>{member.name}</td>
                              <td>{member.nim}</td>
                              <td>{member.prodi}</td>
                              <td>{member.role}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </>
         )}
         <div className="btn-back">
            <Link to={"/divisions"} className="btn back">
               <FaArrowLeft />
            </Link>
         </div>
      </div>
   );
}
