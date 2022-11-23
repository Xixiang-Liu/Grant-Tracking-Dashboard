import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import { About} from "./pages/About";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import {Upload} from "./pages/Upload";
import {Profile} from "./pages/Profile";
import { Edit } from "./pages/Edit"
import { Budget } from "./pages/Budget"
import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="upload" element={<Upload />} />
        <Route path="edit" element={<Edit />} />
        <Route path="budget" element={<Budget />} />
      </Route>
    </Routes>
  );
}
  

