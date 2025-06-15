import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import Profile from "./pages/admin/staffs/Profile.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";

import PublicLayout from "./layouts/public.jsx";
import Home from "./pages/public";
import DivisionsPublic from "./pages/public/divisions.jsx";
import StaffsPublic from "./pages/public/staffs.jsx";
import GalleriesPublic from "./pages/public/galleries.jsx";

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/" element={<PublicLayout />}>
               <Route index element={<Home />} />
               <Route path="divisions" element={<DivisionsPublic />} />
               <Route path="divisions/:id" element={<DivisionsPublic />} />
               <Route path="staffs" element={<StaffsPublic />} />
               <Route path="galleries" element={<GalleriesPublic />} />
            </Route>

            <Route
               path="admin"
               element={
                  <ProtectedRoute>
                     <AdminLayout />
                  </ProtectedRoute>
               }
            >
               <Route index element={<Dashboard />} />
               <Route path="members">
                  <Route index element={<Members />} />
                  <Route path="division/:divisionName" element={<Members />} />
                  <Route path="registrants" element={<Registrants />} />
               </Route>
               <Route path="staffs">
                  <Route index element={<Staffs />} />
                  <Route path="register-account" element={<Registers />} />
                  <Route path="profile/:id" element={<Profile />} />
               </Route>
               <Route path="divisions">
                  <Route index element={<Divisions />} />
                  <Route path="create" element={<Divisions />} />
                  <Route path="update/:id" element={<Divisions />} />
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
