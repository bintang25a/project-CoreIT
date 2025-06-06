import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import Members from "./pages/admin/members/Members.jsx";
import Staffs from "./pages/admin/staffs/Staffs.jsx";
import Divisions from "./pages/admin/divisions/Divisions.jsx";
import News from "./pages/admin/news/news.jsx";
import NewsAdd from "./pages/admin/news/create.jsx";
import NewsEdit from "./pages/admin/news/update.jsx";

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="admin" element={<AdminLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="members">
                  <Route index element={<Members />} />
                  <Route path="division/:divisionName" element={<Members />} />
               </Route>
               <Route path="staffs">
                  <Route index element={<Staffs />} />
                  <Route path="create" element={<Staffs />} />
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
            </Route>
         </Routes>
      </BrowserRouter>
   );
}
