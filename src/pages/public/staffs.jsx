import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function LoadingGroup() {
   return (
      <div className="group trisula">
         <div className="header">
            <h1>Trisula</h1>
         </div>
         <div className="row">
            <div className="card">
               <div className="position">
                  <h1>Loading ...</h1>
               </div>
               <div className="photo">
                  <Skeleton height={"100%"} />
               </div>
               <div className="profile">
                  <h1>Loading ...</h1>
                  <h2>Loading ...</h2>
               </div>
               <div className="social">
                  <a>
                     <FaInstagram className="icon" />
                  </a>
                  <a>
                     <FaLinkedin className="icon" />
                  </a>
                  <a>
                     <FaGithub className="icon" />
                  </a>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="card">
               <div className="position">
                  <h1>Loading ...</h1>
               </div>
               <div className="photo">
                  <Skeleton height={"100%"} />
               </div>
               <div className="profile">
                  <h1>Loading ...</h1>
                  <h2>Loading ...</h2>
               </div>
               <div className="social">
                  <a>
                     <FaInstagram className="icon" />
                  </a>
                  <a>
                     <FaLinkedin className="icon" />
                  </a>
                  <a>
                     <FaGithub className="icon" />
                  </a>
               </div>
            </div>
            <div className="card">
               <div className="position">
                  <h1>Loading ...</h1>
               </div>
               <div className="photo">
                  <Skeleton height={"100%"} />
               </div>
               <div className="profile">
                  <h1>Loading ...</h1>
                  <h2>Loading ...</h2>
               </div>
               <div className="social">
                  <a>
                     <FaInstagram className="icon" />
                  </a>
                  <a>
                     <FaLinkedin className="icon" />
                  </a>
                  <a>
                     <FaGithub className="icon" />
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function Staffs() {
   const { staffs, fetchData, setIsClose, imageUrl } = useOutletContext();

   const position = [
      "Research and Development",
      "Public Relation",
      "Media",
      "Product Publishing",
   ];

   const [ketuas, setKetuas] = useState([]);
   const [sekretaris, setSekretaris] = useState([]);
   const [bendahara, setBendahara] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (staffs.length > 0) {
            setIsLoading(false);
            setKetuas(
               staffs.filter((staff) =>
                  staff.position.toLowerCase().includes("ketua")
               )
            );
            setBendahara(
               staffs.filter((staff) =>
                  staff.position.toLowerCase().includes("bendahara")
               )
            );
            setSekretaris(
               staffs.filter((staff) =>
                  staff.position.toLowerCase().includes("sekretaris")
               )
            );
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [isLoading, staffs]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (staffs.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [fetchData, isLoading, staffs]);

   useEffect(() => {
      window.scrollTo(0, 0);
      setIsClose(true);
   }, [setIsClose]);

   console.log(ketuas[0]);
   return (
      <div className="staffs-public">
         <div className="header">
            <h1>Meet the Staff</h1>
            <h2>CORE IT 2025/2026 Generation</h2>
         </div>
         <div className="content">
            {isLoading ? (
               <LoadingGroup />
            ) : (
               <>
                  <div className="group trisula">
                     <div className="header">
                        <h1>Trisula</h1>
                     </div>
                     <div className="row">
                        {ketuas
                           .filter((item) => item.position === "Ketua")
                           .map((staff) => (
                              <div className="card">
                                 <div className="position">
                                    <h1>{staff.name}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff?.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff?.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff?.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                     <div className="row">
                        <div className="card">
                           <div className="position">
                              <h1>{sekretaris[0]?.position}</h1>
                           </div>
                           <div className="photo">
                              <img
                                 src={imageUrl + sekretaris[0].gallery?.path}
                                 alt=""
                              />
                           </div>
                           <div className="profile">
                              <h1>{sekretaris[0]?.user?.name}</h1>
                              <h2>{sekretaris[0]?.user?.prodi}</h2>
                           </div>
                           <div className="social">
                              <a href={sekretaris[0]?.instagram}>
                                 <FaInstagram className="icon" />
                              </a>
                              <a href={sekretaris[0]?.linkedin}>
                                 <FaLinkedin className="icon" />
                              </a>
                              <a href={sekretaris[0]?.github}>
                                 <FaGithub className="icon" />
                              </a>
                           </div>
                        </div>
                        <div className="card">
                           <div className="position">
                              <h1>{bendahara[0]?.position}</h1>
                           </div>
                           <div className="photo">
                              <img
                                 src={imageUrl + bendahara[0].gallery?.path}
                                 alt=""
                              />
                           </div>
                           <div className="profile">
                              <h1>{bendahara[0]?.user?.name}</h1>
                              <h2>{bendahara[0]?.user?.prodi}</h2>
                           </div>
                           <div className="social">
                              <a href={bendahara[0]?.instagram}>
                                 <FaInstagram className="icon" />
                              </a>
                              <a href={bendahara[0]?.linkedin}>
                                 <FaLinkedin className="icon" />
                              </a>
                              <a href={bendahara[0]?.github}>
                                 <FaGithub className="icon" />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="group rnd">
                     <div className="header">
                        <h1>{`Departemen ${position[0]}`}</h1>
                     </div>
                     <div className="row">
                        {ketuas
                           .filter((item) =>
                              item.position
                                 .toLowerCase()
                                 .includes(position[0].toLowerCase())
                           )
                           .map((staff) => (
                              <div className="card">
                                 <div className="position">
                                    <h1>{staff.name}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff?.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff?.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff?.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                     <div className="row anggota">
                        {staffs
                           .filter(
                              (staff) =>
                                 staff.position &&
                                 staff.position
                                    .toLowerCase()
                                    .includes(position[0].toLowerCase()) &&
                                 !staff.position.toLowerCase().includes("ketua")
                           )
                           .map((staff) => (
                              <div className="card" key={staff.id}>
                                 <div className="position">
                                    <h1>{staff.position}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                  </div>
                  <div className="group pr">
                     <div className="header">
                        <h1>{`Departemen ${position[1]}`}</h1>
                     </div>
                     <div className="row">
                        {ketuas
                           .filter((item) =>
                              item.position
                                 .toLowerCase()
                                 .includes(position[1].toLowerCase())
                           )
                           .map((staff) => (
                              <div className="card">
                                 <div className="position">
                                    <h1>{staff.name}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff?.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff?.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff?.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                     <div className="row anggota">
                        {staffs
                           .filter(
                              (staff) =>
                                 staff.position &&
                                 staff.position
                                    .toLowerCase()
                                    .includes(position[1].toLowerCase()) &&
                                 !staff.position.toLowerCase().includes("ketua")
                           )
                           .map((staff) => (
                              <div className="card" key={staff.id}>
                                 <div className="position">
                                    <h1>{staff.position}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                  </div>
                  <div className="group media">
                     <div className="header">
                        <h1>{`Departemen ${position[2]}`}</h1>
                     </div>
                     <div className="row">
                        {ketuas
                           .filter((item) =>
                              item.position
                                 .toLowerCase()
                                 .includes(position[2].toLowerCase())
                           )
                           .map((staff) => (
                              <div className="card">
                                 <div className="position">
                                    <h1>{staff.name}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff?.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff?.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff?.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                     <div className="row anggota">
                        {staffs
                           .filter(
                              (staff) =>
                                 staff.position &&
                                 staff.position
                                    .toLowerCase()
                                    .includes(position[2].toLowerCase()) &&
                                 !staff.position.toLowerCase().includes("ketua")
                           )
                           .map((staff) => (
                              <div className="card" key={staff.id}>
                                 <div className="position">
                                    <h1>{staff.position}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                  </div>
                  <div className="group pp">
                     <div className="header">
                        <h1>{`Departemen ${position[3]}`}</h1>
                     </div>
                     <div className="row">
                        {ketuas
                           .filter((item) =>
                              item.position
                                 .toLowerCase()
                                 .includes(position[3].toLowerCase())
                           )
                           .map((staff) => (
                              <div className="card">
                                 <div className="position">
                                    <h1>{staff.name}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff?.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff?.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff?.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                     <div className="row anggota">
                        {staffs
                           .filter(
                              (staff) =>
                                 staff.position &&
                                 staff.position
                                    .toLowerCase()
                                    .includes(position[3].toLowerCase()) &&
                                 !staff.position.toLowerCase().includes("ketua")
                           )
                           .map((staff) => (
                              <div className="card" key={staff.id}>
                                 <div className="position">
                                    <h1>{staff.position}</h1>
                                 </div>
                                 <div className="photo">
                                    <img
                                       src={imageUrl + staff.gallery?.path}
                                       alt=""
                                    />
                                 </div>
                                 <div className="profile">
                                    <h1>{staff?.user?.name}</h1>
                                    <h2>{staff?.user?.prodi}</h2>
                                 </div>
                                 <div className="social">
                                    <a href={staff.instagram}>
                                       <FaInstagram className="icon" />
                                    </a>
                                    <a href={staff.linkedin}>
                                       <FaLinkedin className="icon" />
                                    </a>
                                    <a href={staff.github}>
                                       <FaGithub className="icon" />
                                    </a>
                                 </div>
                              </div>
                           ))}
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
