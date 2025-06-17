import { FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Footer() {
   return (
      <footer>
         <div className="header">
            <h1>Community of Research and Innovation Technology</h1>
         </div>
         <div className="content">
            <div className="content">
               <a target="_blank" href={"core.it@ftumj.ac.id"}>
                  <FaEnvelope className="icon-style" />
               </a>
               <a
                  target="_blank"
                  href={
                     "https://www.linkedin.com/company/forum-riset-teknologi-informasi-universitas-muhammadiyah-jakarta/posts/?feedView=all"
                  }
               >
                  <FaLinkedin className="icon-style" />
               </a>
               <a
                  target="_blank"
                  href={
                     "https://www.instagram.com/core.it_umj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  }
               >
                  <FaInstagram className="icon-style" />
               </a>
            </div>
         </div>
         <div className="footer">
            <h1>
               &#169; Copyright 2025 - Community of Research and Innovation
               Technology, Bintang Al Fizar
            </h1>
         </div>
      </footer>
   );
}
