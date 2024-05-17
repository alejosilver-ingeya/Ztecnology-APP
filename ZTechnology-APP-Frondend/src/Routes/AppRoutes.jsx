//Importaciones del sistema
import { Routes, Route } from "react-router-dom";
import { AppRoutesProtected } from "./AppRoutesProtected";
//Importaciones de Paginas
import { LoginPage } from "../Pages/Users/Login/Login.page";
import { LayoutComponent } from "../Components/layout/Layout.component";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppRoutesProtected />}>
          <Route path="*" element={<LayoutComponent />} />
        </Route>
      </Routes>
    </>
  );
};
