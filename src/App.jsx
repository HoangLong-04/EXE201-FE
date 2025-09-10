import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import UserRoutes from "./routes/UserRoutes";
import { AuthProvider } from "./contexts/AuthProvider";
import UserLayout from "./layouts/user_layout/UserLayout";
import HomePage from "./pages/user/homePage/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

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

          {/* Private */}
          <Route path="/" element={<UserLayout />}>
            <Route path="user/home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
