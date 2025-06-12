import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showStaff } from "../../../_services/staffs";
import { getImageUrl } from "../../../_services/galleries";
import { showDivision } from "../../../_services/divisions";
import { changePassword } from "../../../_services/auth";
import Skeleton from "react-loading-skeleton";

function LoadingProfile() {
   return (
      <>
         <div className="general">
            <Skeleton circle width={120} height={120} />
            <div className="profile">
               <h1>
                  <Skeleton />
               </h1>
               <h2>
                  <Skeleton />
               </h2>
            </div>
         </div>
         <div className="specific">
            <div className="left-section">
               <div className="box">
                  <h1>Name</h1>
                  <h2>
                     <Skeleton />
                  </h2>
               </div>
               <div className="box">
                  <h1>Email</h1>
                  <h2>
                     <Skeleton />
                  </h2>
               </div>
               <div className="box">
                  <h1>Phone</h1>
                  <h2>
                     <Skeleton />
                  </h2>
               </div>
            </div>
         </div>
         <div className="update">
            <Skeleton />
         </div>
      </>
   );
}

export default function Profile() {
   const [staff, setStaff] = useState([]);
   const [division, setDivision] = useState([]);
   const [imageUrl, setImageUrl] = useState("");
   const [passwordNow, setPasswordNow] = useState("");
   const [passwordNew, setPasswordNew] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isDivLoading, setIsDivLoading] = useState(true);
   const { id } = useParams();

   useEffect(() => {
      const fetchData = async () => {
         const [staffData, imageUrlData] = await Promise.all([
            showStaff(id),
            getImageUrl(),
         ]);

         setStaff(staffData);
         setImageUrl(imageUrlData);
         setIsLoading(false);
      };

      fetchData();
   }, [id]);

   useEffect(() => {
      const fetchData = async () => {
         const [divisionData] = await Promise.all([
            showDivision(staff.user?.division_id),
         ]);

         setDivision(divisionData);
         setIsDivLoading(false);
      };

      fetchData();
   }, [staff.user?.division_id]);

   const handleChangePassword = async () => {
      if (!passwordNow || !passwordNew) {
         alert("Both fields are required.");
         return;
      }

      try {
         await changePassword(id, {
            passwordNow,
            passwordNew,
         });

         alert("Password changed successfully!");
         setPasswordNow("");
         setPasswordNew("");
      } catch (err) {
         alert("Failed to change password:\n" + err);
      }
   };

   return (
      <main className="profile-user">
         {isLoading ? (
            <LoadingProfile />
         ) : (
            <>
               <div className="general">
                  <img
                     src={imageUrl + staff.gallery?.path}
                     alt={staff.user?.name}
                  />
                  <div className="profile">
                     <h1>{staff.user?.name}</h1>
                     <h2>
                        {staff.nim} | {staff.user?.prodi}
                     </h2>
                  </div>
               </div>
               <div className="specific">
                  <div className="left-section">
                     <div className="box">
                        <h1>Name</h1>
                        <h2>{staff.user?.name}</h2>
                     </div>
                     <div className="box">
                        <h1>Email</h1>
                        <h2>{staff.user?.email}</h2>
                     </div>
                     <div className="box">
                        <h1>Phone</h1>
                        <h2>{staff.user?.phone_number}</h2>
                     </div>
                  </div>
                  <div className="right-section">
                     <div className="box">
                        <h1>Divisions</h1>
                        <h2>{isDivLoading ? <Skeleton /> : division.name}</h2>
                     </div>
                     <div className="box">
                        <h1>Role</h1>
                        <h2>{staff.user?.role}</h2>
                     </div>
                     <div className="box">
                        <h1>Position</h1>
                        <h2>{staff.position}</h2>
                     </div>
                  </div>
               </div>
               <div className="update">
                  <input
                     type="password"
                     name="passwordNow"
                     placeholder="Type your current password"
                     value={passwordNow}
                     onChange={(e) => setPasswordNow(e.target.value)}
                     autoComplete="new-password"
                  />
                  <input
                     type="password"
                     name="passwordNew"
                     placeholder="Type your new password"
                     value={passwordNew}
                     onChange={(e) => setPasswordNew(e.target.value)}
                     autoComplete="new-password"
                  />
                  <button onClick={handleChangePassword}>Change</button>
               </div>
            </>
         )}
      </main>
   );
}
