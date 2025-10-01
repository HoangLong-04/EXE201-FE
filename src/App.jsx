import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import UserRoutes from "./routes/UserRoutes";
import { AuthProvider } from "./contexts/AuthProvider";
import UserLayout from "./layouts/user_layout/UserLayout";
import HomePage from "./pages/user/homePage/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import AdminLayout from "./layouts/admin_layout/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import PostManagement from "./pages/admin/post/PostManagement";
import AddProject from "./pages/user/addProject/AddProject";
import ProfileLayout from "./layouts/profile_layout/ProfileLayout";
import InfoPage from "./pages/user/infoPage/InfoPage";
import PostPage from "./pages/user/postPage/PostPage";
import ProjectDetail from "./pages/user/projectDetail/ProjectDetail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user/home" />} />
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Private user */}
          <Route path="/" element={<UserLayout />}>
            <Route path="user/home" element={<HomePage />} />
            <Route path="user/add-project" element={<AddProject />} />
            <Route path="user/project-detail" element={<ProjectDetail />} />
          </Route>
          <Route path="/" element={<ProfileLayout />}>
            <Route path="profile/info" element={<InfoPage />} />
            <Route path="profile/post" element={<PostPage />} />
          </Route>
          {/* <Route path="/profile/info" element={<InfoPage />} /> */}

          {/* Private admin */}
          <Route path="/" element={<AdminLayout />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/post" element={<PostManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
