import logoBText from "/images/logo/Logo CORE IT transparan.png";
import background from "/images/background/gambar2.jpg";
import history1 from "/images/background/gambar3.png";
import history2 from "/images/background/gambar4.png";
import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import "./responsive.css";

function DivisionsCardLoading() {
   return Array(4)
      .fill(0)
      .map((_, i) => (
         <div key={i} className="card">
            <Skeleton circle height={75} width={75} />
            <h1>
               <Skeleton height={20} />
            </h1>
            <h2>
               <Skeleton count={6} height={10} />
            </h2>
         </div>
      ));
}

function NewsCardLoading() {
   return Array(3)
      .fill(0)
      .map((_, i) => (
         <div key={i} className="news-card">
            <div className="image">
               <Skeleton height={100} />
            </div>
            <h1>Loading ..</h1>
            <div className="title">
               <h1>
                  <Skeleton height={20} />
               </h1>
            </div>
            <div className="footer">
               <h1>
                  <Skeleton count={3} height={10} />
               </h1>
               <a className="btn">Loading ...</a>
            </div>
         </div>
      ));
}

export default function Home() {
   const { divisions, divisionsLogo, news, imageUrl, fetchData, setIsClose } =
      useOutletContext();

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if ((divisions.length > 0) & (news.length > 0)) {
            setIsLoading(false);
         } else {
            setTimeout(() => {
               setIsLoading(false);
            }, 2500);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [isLoading, divisions, news]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading && (divisions.length < 1 || news.length < 1))
            fetchData();
      }, 500);

      return () => clearTimeout(fetchTimeout);
   }, [fetchData, isLoading, divisions.length, news.length]);

   function formatTanggal(created_at) {
      const tanggal = new Date(created_at);
      const options = { day: "numeric", month: "long", year: "numeric" };
      return tanggal.toLocaleDateString("id-ID", options);
   }

   useEffect(() => {
      window.scrollTo(0, 0);
      setIsClose(true);
   }, [setIsClose]);

   return (
      <div className="home-page">
         <div className="hero-section">
            <div className="hero-background">
               <img src={background} alt="" />
            </div>
            <div className="hero-content">
               <h2>Welcome to our website!</h2>
               <h1>Community of Research and Innovation Technology</h1>
            </div>
            <a className="btn" href="/register" target="_blank">
               Join Now! <FaArrowRight />
            </a>
         </div>
         <div className="about-section">
            <div className="about-logo">
               <img src={logoBText} alt="Logo" />
            </div>
            <div className="about-text">
               <h1>
                  About CORE IT (Community of Research and Innovation
                  Technology)
               </h1>
               <h2>
                  CORE IT is a community that focuses on developing the
                  potential and talents of students to be able to create
                  innovations and compete globally. CORE IT is a forum for 11
                  divisions in the field of technology to guide students to
                  become innovators in the field of technology.
               </h2>
            </div>
         </div>
         <div className="division-section">
            <div className="division-header">
               <h1>Our Divisions</h1>
               <h2>Explore Your Interests</h2>
            </div>
            <div className="division-content">
               {isLoading ? (
                  <DivisionsCardLoading />
               ) : (
                  [...divisions]
                     .sort(() => Math.random() - 0.5)
                     .slice(0, 4)
                     .map((division) => (
                        <div key={division.id} className="card">
                           <img
                              src={divisionsLogo(division.logo_path)}
                              alt={division.name}
                           />
                           <h1>{division.name}</h1>
                           <h2>{division.description}</h2>
                        </div>
                     ))
               )}
            </div>
            <div className="division-button">
               <Link className="btn" to={"/divisions"}>
                  View all divisions <FiArrowUpRight />
               </Link>
            </div>
         </div>
         <div className="history-section">
            <div className="history-left">
               <h1>History of Core IT</h1>
               <p>
                  CORE IT was formed due to student awareness of the lack of a
                  forum that houses national competitions such as Gemastik. It
                  all started with the Gemastik competition in 2023. Students
                  felt that they did not get maximum guidance when participating
                  in this competition. So the formation of CORE IT was born as a
                  community that focuses on the field of technology competitions
                  in Indonesia. CORE IT was initiated by 3 students who
                  participated in the competition in Malang, East Java.
               </p>
               <p>
                  On September 16, 2023, the formation of this community was
                  formulated. This was done on the spur of the moment at
                  Brawijaya Resto, Malang, East Java. In this formulation, the
                  results of the agreement regarding the community chairman,
                  community secretary and RnD were obtained.
               </p>
               <p>
                  Then on December 14, 2023, CORE IT was officially established
                  as a research community at UMJ.
               </p>
            </div>
            <div className="history-right">
               <img src={history1} alt="History 1" />
               <img src={history2} alt="History 1" />
            </div>
         </div>
         <div className="news-section">
            <div className="news-header">
               <h1>Latest News</h1>
            </div>
            <div className="news-card-container">
               {isLoading ? (
                  <NewsCardLoading />
               ) : (
                  [...news]
                     .sort(() => Math.random() - 0.5)
                     .slice(0, 3)
                     .map((item) => (
                        <div key={item.id} className="news-card">
                           <div className="image">
                              <img
                                 src={imageUrl(item.main_image?.path)}
                                 alt={item.title}
                              />
                           </div>
                           <h1>NEWS</h1>
                           <div className="title">
                              <h1>{item.title}</h1>
                           </div>
                           <div className="footer">
                              <h1>{formatTanggal(item.updated_at)}</h1>
                              <a
                                 className="btn"
                                 href={`/news/${item.id}`}
                                 target="_blank"
                              >
                                 Read More
                              </a>
                           </div>
                        </div>
                     ))
               )}
            </div>
            <div className="news-button">
               <Link className="btn" to={"/news"}>
                  View all news <FiArrowUpRight />
               </Link>
            </div>
         </div>
         <div className="register-section">
            <h1>Ready to Innovate with Us?</h1>
            <h2>
               CORE IT is the best place to develop your potential in
               technology, collaborate on innovative projects, and build a
               professional network.
            </h2>
            <a className="btn" href="/register" target="_blank">
               Register Now! <FaExternalLinkAlt />
            </a>
         </div>
      </div>
   );
}
