import { Link } from "react-router-dom";
import { FaUsers, FaTasks, FaBriefcase } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

function Cards({ members, staffs }) {
   const projects = members.filter(
      (member) => member.link_project === !null
   ).length;
   const registrants = members.filter(
      (member) => member.role === "registrant"
   ).length;

   return (
      <>
         <div className="card">
            <div className="header">
               <h1>Member</h1>
               <div className="icon users">
                  <FaUsers className="icon-style" />
               </div>
            </div>
            <div className="main">
               <h1>{members.length - 1 - registrants}</h1>
            </div>
            <div className="footer">
               <h1>
                  2023<span> - now</span>
               </h1>
            </div>
         </div>
         <div className="card">
            <div className="header">
               <h1>Staff</h1>
               <div className="icon users">
                  <FaUsers className="icon-style" />
               </div>
            </div>
            <div className="main">
               <h1>{staffs.length - 1}</h1>
            </div>
            <div className="footer">
               <h1>2025 - 2026</h1>
            </div>
         </div>
         <div className="card">
            <div className="header">
               <h1>Registrant</h1>
               <div className="icon tasks">
                  <FaTasks className="icon-style" />
               </div>
            </div>
            <div className="main">
               <h1>{registrants}</h1>
            </div>
            <div className="footer">
               <h1>
                  2025<span> Open Recruitment</span>
               </h1>
            </div>
         </div>
         <div className="card">
            <div className="header">
               <h1>Reg. Project</h1>
               <div className="icon briefcase">
                  <FaBriefcase className="icon-style" />
               </div>
            </div>
            <div className="main">
               <h1>{projects}</h1>
            </div>
            <div className="footer">
               <h1>
                  <span>Check registrant project</span>
               </h1>
            </div>
         </div>
      </>
   );
}

function LoadingCards() {
   return Array(4)
      .fill(0)
      .map((_, i) => (
         <div className="card" key={i}>
            <div className="header">
               <h1>Loading...</h1>
               <div className="icon users">
                  <FaUsers className="icon-style" />
               </div>
            </div>
            <div className="main">
               <h1>{<Skeleton />}</h1>
            </div>
            <div className="footer">
               <h1>{<Skeleton />}</h1>
            </div>
         </div>
      ));
}

export default function MemberData({ members, staffs, isLoading }) {
   return (
      <div className="member-data" id="member">
         <div className="header">
            <h1>Member Data</h1>
            <Link to={"/admin/members/registrants"}>Accept Registrant</Link>
         </div>
         <div className="content">
            {isLoading ? (
               <LoadingCards />
            ) : (
               <Cards members={members} staffs={staffs} />
            )}
         </div>
      </div>
   );
}
