import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import Members from "./pages/admin/members/Members.jsx";
import Staffs from "./pages/admin/staffs/Staffs.jsx";
import Divisions from "./pages/admin/divisions/Divisions.jsx";
import News from "./pages/admin/news/news.jsx";
import NewsAdd from "./pages/admin/news/create.jsx";
import NewsEdit from "./pages/admin/news/update.jsx";
import Galleries from "./pages/admin/galleries/galleries.jsx";
import GalleryAdd from "./pages/admin/galleries/create.jsx";
import Registrants from "./pages/admin/members/Registrants.jsx";
import Registers from "./pages/admin/staffs/Registers.jsx";

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="admin" element={<AdminLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="members">
                  <Route index element={<Members />} />
                  <Route path="division/:divisionName" element={<Members />} />
                  <Route path="registrants" element={<Registrants />} />
               </Route>
               <Route path="staffs">
                  <Route index element={<Staffs />} />
                  <Route path="register account" element={<Registers />} />
               </Route>
               <Route path="divisions">
                  <Route index element={<Divisions />} />
                  <Route path="create" element={<Divisions />} />
               </Route>
               <Route path="news">
                  <Route index element={<News />} />
                  <Route path="add" element={<NewsAdd />} />
                  <Route path="edit/:id" element={<NewsEdit />} />
               </Route>
               <Route path="galleries">
                  <Route index element={<Galleries />} />
                  <Route path="add" element={<GalleryAdd />} />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}
