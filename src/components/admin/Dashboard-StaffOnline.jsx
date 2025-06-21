import Skeleton from "react-loading-skeleton";
import { getImageUrl } from "../../_services/galleries";
import { useEffect, useState } from "react";

function LoadingLeftContent() {
   return (
      <div className="left-content">
         <div className="header">
            <h1>Staff Online:</h1>
         </div>
         <div className="online-list">
            {Array(4)
               .fill(0)
               .map((_, i) => (
                  <div key={i} className="user-online">
                     <div className="photo">
                        <Skeleton circle width={32} height={32} />
                     </div>
                     <div className="name">
                        <h1>
                           <Skeleton width={80} />
                        </h1>
                        <h2>
                           <Skeleton width={80} />
                        </h2>
                     </div>
                     <div className="position">
                        <h1>
                           <Skeleton count={2} />
                        </h1>
                     </div>
                  </div>
               ))}
         </div>
         <div className="footer">
            <div className="online-indikator">
               <img src="/images/logo/online.png" alt="" />
               <h1>
                  <Skeleton height={20} width={40} />
               </h1>
               <h2>online</h2>
            </div>
            <div className="online-indikator">
               <img src="/images/logo/offline.png" alt="" />
               <h1>
                  <Skeleton height={20} width={40} />
               </h1>
               <h2>offline</h2>
            </div>
         </div>
      </div>
   );
}

function LoadingRightContent() {
   return (
      <div className="right-content">
         <div className="header">
            <h1>Staff Teams</h1>
         </div>
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Last Active</th>
               </tr>
            </thead>
            <tbody>
               {Array(5)
                  .fill(0)
                  .map((_, i) => (
                     <tr key={i} className="user-online">
                        <td>
                           <div className="kolom-1">
                              <div className="photo">
                                 <Skeleton circle width={32} height={32} />
                              </div>
                              <div className="name">
                                 <h1>
                                    <Skeleton width={100} />
                                 </h1>
                                 <h2>
                                    <Skeleton width={100} />
                                 </h2>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className="kolom-2">
                              <h1>
                                 <Skeleton />
                              </h1>
                           </div>
                        </td>
                        <td>
                           <h1>
                              <Skeleton />
                           </h1>
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
}

function LeftContent({ staffs, imageUrl }) {
   const staffOnline = staffs.filter(
      (staff) => staff.isLogin == true && staff.position != "Admin"
   ).length;
   const staffOffline = staffs.length - 1 - staffOnline;

   return (
      <div className="left-content">
         <div className="header">
            <h1>Staff Online:</h1>
         </div>
         <div className="online-list">
            {staffs
               .filter(
                  (staff) => staff.isLogin == true && staff.position != "Admin"
               )
               .map((staff) => (
                  <div key={staff.id} className="user-online">
                     <div className="photo">
                        <img
                           src={imageUrl + staff.gallery?.path}
                           alt={staff.user?.name}
                        />
                     </div>
                     <div className="name">
                        <h1>{staff.user?.name}</h1>
                        <h2>{staff.user?.email}</h2>
                     </div>
                     <div className="position">
                        <h1>{staff.position}</h1>
                     </div>
                  </div>
               ))}
         </div>
         <div className="footer">
            <div className="online-indikator">
               <img src="/images/logo/online.png" alt="" />
               <h1>{staffOnline}</h1>
               <h2>online</h2>
            </div>
            <div className="online-indikator">
               <img src="/images/logo/offline.png" alt="" />
               <h1>{staffOffline}</h1>
               <h2>offline</h2>
            </div>
         </div>
      </div>
   );
}

function formatLastActive(dateStr) {
   const date = new Date(dateStr);
   const now = new Date();

   // Buat tanggal tanpa jam (00:00) agar membandingkan per hari
   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
   const updated = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
   );

   const diffTime = today - updated;
   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

   if (diffDays === 0) return "Today";
   if (diffDays === 1) return "Yesterday";
   if (diffDays === 2) return "2 days ago";
   return "More than 2 days ago";
}

function RightContent({ staffs, imageUrl }) {
   return (
      <div className="right-content">
         <div className="header">
            <h1>Staff Teams</h1>
         </div>
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Last Active</th>
               </tr>
            </thead>
            <tbody>
               {staffs
                  .sort(
                     (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                  )
                  .filter(
                     (staff) =>
                        staff.isLogin != true && staff.position != "Admin"
                  )
                  .slice(0, 5)
                  .map((staff) => (
                     <tr className="user-online" key={staff.id}>
                        <td>
                           <div className="kolom-1">
                              <div className="photo">
                                 <img
                                    src={imageUrl + staff.gallery?.path}
                                    alt={staff.user?.name}
                                 />
                              </div>
                              <div className="name">
                                 <h1>{staff.user?.name}</h1>
                                 <h2>{staff.user?.email}</h2>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className="kolom-2">
                              <h1>{staff.position}</h1>
                           </div>
                        </td>
                        <td>
                           <h1>{formatLastActive(staff.updated_at)}</h1>
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   );
}

export default function StaffOnline({ staffs, isLoading }) {
   const [imageUrl, setImageUrl] = useState("");

   useEffect(() => {
      const fetchData = async () => {
         const [imageData] = await Promise.all([getImageUrl()]);

         setImageUrl(imageData);
      };

      fetchData();
   }, []);

   return (
      <div className="staff-online" id="staff">
         {isLoading ? (
            <>
               <LoadingLeftContent />
               <LoadingRightContent />
            </>
         ) : (
            <>
               <LeftContent staffs={staffs} imageUrl={imageUrl} />
               <RightContent staffs={staffs} imageUrl={imageUrl} />
            </>
         )}
      </div>
   );
}
