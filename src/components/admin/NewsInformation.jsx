import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Rate from "../elements/Rate";

function TableRow({ news, viewAll }) {
   return (
      <>
         {news.slice(0, viewAll).map((info) => (
            <tr key={info.id}>
               <td>
                  <div className="kolom-1">
                     <h1>{info.title}</h1>
                  </div>
               </td>
               <td>
                  <h1>{info.views}</h1>
               </td>
               <td>
                  <div className="kolom-3">
                     <Rate total={info.views} max={1000} />
                  </div>
               </td>
               <td>
                  <div className="kolom-4">
                     <Link className="button btn-view" to={`/news/${info.id}`}>
                        View
                     </Link>
                     <Link
                        className="button btn-edit"
                        to={`/admin/news/edit/${info.id}`}
                     >
                        Edit
                     </Link>
                  </div>
               </td>
            </tr>
         ))}
      </>
   );
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

export default function NewsInformation({ isLoading, news }) {
   const [viewAll, setViewAll] = useState(4);

   const handleClick = () => {
      if (viewAll != 4) {
         setViewAll(4);
      } else {
         setViewAll(news.length);
      }
   };

   return (
      <div className="table-container" id="news">
         <div className="header">
            <h1>News Information</h1>
         </div>
         <table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Views</th>
                  <th>Views rate</th>
                  <th>Navigation</th>
               </tr>
            </thead>
            <tbody>
               {isLoading ? (
                  <LoadingTableRow />
               ) : (
                  <TableRow news={news} viewAll={viewAll} />
               )}
            </tbody>
         </table>
         <div className="footer" onClick={handleClick}>
            {viewAll == 4 ? "View all CORE IT News" : "Close CORE IT News"}
         </div>
      </div>
   );
}
