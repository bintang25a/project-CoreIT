import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { showDivision } from "../../_services/divisions";

export default function Division() {
   const { divisionsLogo } = useOutletContext();
   const { id } = useParams();
   // const [isLoading, setIsLoading] = useState(true);
   const [division, setDivision] = useState([]);

   useEffect(() => {
      const fetchDivision = async () => {
         const [divisionData] = await Promise.all([showDivision(id)]);

         setDivision(divisionData);
      };

      fetchDivision();
   });

   const [searchTerm, setSearchTerm] = useState("");
   const filteredMembers = division?.user?.filter(
      (member) =>
         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.prodi.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   return (
      <div className="division-public">
         <div className="name">
            <h1>{division.name}</h1>
            <img src={divisionsLogo + division.logo_path} alt={division.name} />
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
      </div>
   );
}
