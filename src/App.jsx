import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import Members from "./pages/admin/members/Members.jsx";
import Staffs from "./pages/admin/staffs/Staffs.jsx";
import Divisions from "./pages/admin/divisions/Divisions.jsx";

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="admin" element={<AdminLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="members">
                  <Route index element={<Members />} />
                  <Route path="create" element={<Members />} />
               </Route>
               <Route path="Staffs">
                  <Route index element={<Staffs />} />
                  <Route path="create" element={<Staffs />} />
               </Route>
               <Route path="Divisions">
                  <Route index element={<Divisions />} />
                  <Route path="create" element={<Divisions />} />
               </Route>
               {/* <Route index element={<Home />} />
               <Route path="/books" element={<Books />} /> */}
            </Route>
         </Routes>
      </BrowserRouter>
   );
}
