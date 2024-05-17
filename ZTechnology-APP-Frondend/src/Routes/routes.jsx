import { DashboardComponent } from "../Components/Dashboard/Dashboard.component";
import { LoginPage } from "../Pages/Users/Login/Login.page";

//Clientes
import { ClientPage } from "../Pages/Clients/List/Client.page";
import { NewClient } from "../Pages/Clients/New/NewClient";

//Productos
import { ProductPage } from "../Pages/Products/List/Products.page";

//Cotizaciones
import { QuotePage } from "../Pages/Quotes/List/Quote.page";
import { NewQuote } from "../Pages/Quotes/New/NewQuote";
import { QuoteEdit } from "../Pages/Quotes/Edit/Quote.edit";
import { QuoteDelete } from "../Pages/Quotes/Delete/Quote.delete";

//Usuarios
import { UsersPage } from "../Pages/Users/List/User.page";
import { RegisterPage } from "../Pages/Users/Register/Register.page";

const routes = [
  { path: "*", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: DashboardComponent },
  { path: "/", name: "Login", element: LoginPage },
  {
    path: "/consultar-clientes",
    name: "Listado Clientes",
    element: ClientPage,
  },
  { path: "/guardar-cliente", name: "Nuevo Cliente", element: NewClient },
  {
    path: "/consultar-productos",
    name: "Listado Productos",
    element: ProductPage,
  },
  {
    path: "/consultar-cotizaciones",
    name: "Listado Cotizaciones",
    element: QuotePage,
  },
  { path: "/guardar-cotizacion", name: "Nueva Cotizacion", element: NewQuote },
  { path: "/editar-cotizacion", name: "Editar Cotizacion", element: QuoteEdit },
  {
    path: "/eliminar-cotizacion",
    name: "Eliminar cotizacion",
    element: QuoteDelete,
  },
  {
    path: "/consultar-usuarios",
    name: "Listado Usuarios",
    element: UsersPage,
  },
  { path: "/guardar-usuario", name: "Nuevo Usuario", element: RegisterPage },
];

export default routes;
