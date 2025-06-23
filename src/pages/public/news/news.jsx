import { useState, useEffect } from "react";
import {
   useOutletContext,
   Link,
   useNavigate,
   useParams,
} from "react-router-dom";
import { showNews, updateNews } from "../../../_services/news";
import { FaArrowLeft } from "react-icons/fa";
import background from "/images/background/gambar2.jpg";
import Message from "../../../components/elements/NotFoundData";
import Skeleton from "react-loading-skeleton";

function NewsDetailLoading() {
   return (
      <>
         <div className="header detail">
            <div className="text">
               <h1>
                  <span>News:</span> Loading ...
               </h1>
            </div>
            <div className="background">
               <img src={background} alt="background" />
            </div>
         </div>
         <div className="news-detail">
            <div className="time">
               <h1>News updated at: Loading ... </h1>
            </div>
            <div className="image">
               <Skeleton height={"100%"} />
            </div>
            <div className="paragraph">
               <p>Loading paragraph ...</p>
            </div>
            <div className="image">
               <Skeleton height={"100%"} />
            </div>
            <div className="paragraph">
               <p>Loading paragraph ...</p>
            </div>
            <div className="paragraph">
               <p>Loading paragraph ...</p>
            </div>
         </div>
      </>
   );
}

function NewsDetail({ id, formatTanggal, imageUrl, isLoading }) {
   const [news, setNews] = useState([]);
   useEffect(() => {
      const fetchNews = async () => {
         const [newsData] = await Promise.all([showNews(id)]);

         setNews(newsData);

         const data = {
            views: newsData.views + 1,
         };

         const newsID = localStorage.getItem("newsID");
         if (newsID != id) {
            await updateNews(id, data);
         }

         localStorage.setItem("newsID", id);
      };

      fetchNews();
   }, [id]);

   return (
      <>
         {isLoading ? (
            <NewsDetailLoading />
         ) : (
            <>
               <div className="header detail">
                  <div className="text">
                     <h1>
                        <span>News:</span> {news.title}
                     </h1>
                  </div>
                  <div className="background">
                     <img src={background} alt="background" />
                  </div>
               </div>
               <div className="news-detail">
                  <div className="time">
                     <h1>News updated at: {formatTanggal(news.updated_at)}</h1>
                  </div>
                  <div className="image">
                     <img
                        src={imageUrl(news.main_image?.path)}
                        alt={news.title}
                     />
                  </div>
                  <div className="paragraph">
                     <p>{news.paragraph_1}</p>
                  </div>
                  <div className="image">
                     <img
                        src={imageUrl(news.body_image?.path)}
                        alt={news.title}
                     />
                  </div>
                  <div className="paragraph">
                     <p>{news.paragraph_2}</p>
                  </div>
                  <div className="paragraph">
                     <p>{news.paragraph_1}</p>
                  </div>
               </div>
            </>
         )}
         <div className="btn-back">
            <Link to={"/news"} className="btn back">
               <FaArrowLeft />
            </Link>
         </div>
      </>
   );
}

function NewsHome({
   filteredNews,
   news,
   imageUrl,
   searchTerm,
   handleSearchTerm,
   formatTanggal,
   handleNavigate,
   isLoading,
}) {
   return (
      <>
         <div className="header">
            <div className="text">
               <h1>CORE IT News and Event</h1>
            </div>
            <div className="background">
               <img src={background} alt="background" />
            </div>
            <div className="search">
               <input
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search news by : title or paragraph"
               />
            </div>
         </div>
         <div className="content">
            {isLoading ? (
               <>
                  <div className="left-content">
                     <Skeleton count={5} height={"15vw"} />
                  </div>
                  <div className="right-content">
                     <Skeleton count={5} height={"8vw"} />
                  </div>
               </>
            ) : news.length > 0 ? (
               <>
                  <div className="left-content">
                     {[...filteredNews]
                        ?.reverse()
                        .slice(0, 5)
                        .map((item) => (
                           <div key={item.id} className="card">
                              <div className="image">
                                 <img
                                    src={imageUrl(item.main_image?.path)}
                                    alt={item.title}
                                 />
                              </div>
                              <div className="title">
                                 <h1>{item.title}</h1>
                              </div>
                              <div className="time">
                                 <h1>
                                    Created at {formatTanggal(item.created_at)}
                                 </h1>
                              </div>
                              <div className="summary">
                                 <p>{item.paragraph_2}</p>
                              </div>
                              <div className="button">
                                 <Link className="btn" to={`/news/${item.id}`}>
                                    Read more
                                 </Link>
                              </div>
                           </div>
                        ))}
                  </div>

                  <div className="right-content-news">
                     <div className="header-content">
                        <h1>See other news</h1>
                     </div>
                     {news.slice(0, 20).map((item) => (
                        <div
                           onClick={() => handleNavigate(item.id)}
                           key={item.id}
                           className="card"
                        >
                           <div className="image">
                              <img
                                 src={imageUrl(item.main_image?.path)}
                                 alt={item.title}
                              />
                           </div>
                           <div className="title">
                              <h1>{item.title}</h1>
                           </div>
                        </div>
                     ))}
                  </div>
               </>
            ) : (
               <Message message={"No news uploaded in here, :'("} />
            )}
         </div>
      </>
   );
}

export default function News() {
   const { news, imageUrl, fetchData, setIsClose } = useOutletContext();
   const { id } = useParams();

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (news.length > 0) {
            setIsLoading(false);
         } else {
            setTimeout(() => {
               setIsLoading(false);
            }, 2500);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [isLoading, news]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading && news.length < 1) fetchData();
      }, 500);

      return () => clearTimeout(fetchTimeout);
   }, [fetchData, isLoading, news.length]);

   const [searchTerm, setSearchTerm] = useState("");
   const filteredNews = news.filter(
      (item) =>
         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.paragraph_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.paragraph_2.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.paragraph_3.toLowerCase().includes(searchTerm.toLowerCase())
   );
   const handleSearchTerm = (search) => {
      setSearchTerm(search);
   };

   function formatTanggal(created_at) {
      const tanggal = new Date(created_at);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return tanggal.toLocaleDateString("en-EN", options);
   }

   const navigate = useNavigate();
   const handleNavigate = (path) => {
      navigate(`/news/${path}`, { replace: true });
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      setIsClose(true);
   }, [setIsClose]);

   return (
      <div className="news-public">
         {id ? (
            <NewsDetail
               id={id}
               formatTanggal={formatTanggal}
               imageUrl={imageUrl}
               isLoading={isLoading}
            />
         ) : (
            <NewsHome
               filteredNews={filteredNews}
               news={news}
               imageUrl={imageUrl}
               searchTerm={searchTerm}
               handleSearchTerm={handleSearchTerm}
               formatTanggal={formatTanggal}
               handleNavigate={handleNavigate}
               isLoading={isLoading}
            />
         )}
      </div>
   );
}
