import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Rate from "../elements/Rate";

function TableRow({ members, divisions, viewAll, logoUrl }) {
   const memberCount = divisions.map(
      (division) =>
         members.filter((member) => member.division_id == division.id).length
   );
   const maxMemberCount = Math.max(...memberCount);

   return divisions.slice(0, viewAll).map((division) => {
      const memberCount = members.filter(
         (member) => member.division_id === division.id
      ).length;

      return (
         <tr key={division.id} className="slide-anim">
            <td>
               <div className="kolom-1">
                  <img
                     draggable="false"
                     src={logoUrl + division.logo_path}
                     alt={division.name}
                  />
                  <h1>{division.name}</h1>
               </div>
            </td>
            <td>
               <h1>{memberCount}</h1>
            </td>
            <td>
               <div className="kolom-3">
                  <Rate total={memberCount} max={maxMemberCount} />
               </div>
            </td>
            <td>
               <div className="kolom-4">
                  <Link
                     className="button btn-member"
                     to={`/admin/divisions/${division.id}/members`}
                  >
                     Member
                  </Link>
                  <Link
                     className="button btn-view"
                     to={`/admin/divisions/${division.id}`}
                  >
                     View
                  </Link>
                  <Link
                     className="button btn-edit"
                     to={`/admin/divisions/edit/${division.id}`}
                  >
                     Edit
                  </Link>
               </div>
            </td>
         </tr>
      );
   });
}

function LoadingTableRow() {
   return Array(5)
      .fill(0)
      .map((_, i) => (
         <tr key={i}>
            <td colSpan={4}>
               <Skeleton />
            </td>
         </tr>
      ));
}

export default function DivisionData({
   members,
   divisions,
   logoUrl,
   isLoading,
}) {
   const [viewAll, setViewAll] = useState(5);

   const handleClick = () => {
      if (viewAll != 5) {
         setViewAll(5);
      } else {
         setViewAll(divisions.length);
      }
   };

   return (
      <div className="table-container" id="division">
         <div className="header">
            <h1>Division Data</h1>
         </div>
         <table>
            <thead>
               <tr>
                  <th>Division name</th>
                  <th>Member</th>
                  <th>Rate</th>
                  <th>Navigation</th>
               </tr>
            </thead>
            <tbody>
               {isLoading ? (
                  <LoadingTableRow />
               ) : (
                  <TableRow
                     members={members}
                     divisions={divisions}
                     logoUrl={logoUrl}
                     viewAll={viewAll}
                  />
               )}
            </tbody>
         </table>
         <div onClick={handleClick} className="footer">
            {viewAll == 5 ? "View all divisions" : "Close half divisions"}
         </div>
      </div>
   );
}
