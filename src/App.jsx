import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import UserRoutes from "./routes/UserRoutes";
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
import { AuthProvider } from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import DonateWeb from "./pages/donateWeb/DonateWeb";
import SuccessPayment from "./pages/successPayment/SuccessPayment";
import PaymentForm from "./components/paymentForm/PaymentForm";
import WebDonator from "./pages/admin/webDonator/WebDonator";
import TawkMessenger from "./components/TawkMessenger/TawkMessenger";

function App() {
  return (
    <AuthProvider>
      <TawkMessenger />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user/home" />} />
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment-success" element={<SuccessPayment />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* ✅ Khi PayOS redirect đến /payment/cancel thì tự về trang chủ */}
          <Route path="/payment/cancel" element={<Navigate to="https://zentive.vercel.app/" replace />} />
          {/* <Route path="/payment/cancel" element={<Navigate to="/" replace />} /> */}

          {/* Private user */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/donate-web" element={<DonateWeb />} />
            <Route path="user/home" element={<HomePage />} />
            <Route path="payment-form" element={<PaymentForm />} />
            <Route path="user/add-project" element={<AddProject />} />
            <Route
              path="user/project-detail/:title"
              element={<ProjectDetail />}
            />
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
            <Route path="admin/web-donator" element={<WebDonator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
