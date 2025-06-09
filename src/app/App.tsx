import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LoginPage from "../pages/login";
import Main from "../pages/main";
import Chat from "@/pages/chat";
import { SidebarProvider } from "../components/ui/sidebar";
import type { RootState } from "../store/store";
import { MainLayout } from "../layout/mainLayout";

const App = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/" element={<Main />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </SidebarProvider>
  );
};

export default App;