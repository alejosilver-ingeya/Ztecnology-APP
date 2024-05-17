import CIcon from "@coreui/icons-react";
import {
  cilCalculator,
  cilUser,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Ztecnology APP",
  },
  {
    component: CNavGroup,
    name: "Clientes",
    to: "/clientes",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Listado de Clientes",
        to: "/consultar-clientes",
      },
      {
        component: CNavItem,
        name: "Crear Cliente",
        to: "/guardar-cliente",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Cotizaciones",
    to: "/cotizaciones",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Listado de Cotizaciones",
        to: "/consultar-cotizaciones",
      },
      {
        component: CNavItem,
        name: "Crear Cotización",
        to: "/guardar-cotizacion",
      },
      {
        component: CNavItem,
        name: "Actualizar Cotización",
        to: "/editar-cotizacion",
      },
      {
        component: CNavItem,
        name: "Eliminar Cotización",
        to: "/eliminar-cotizacion",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Productos",
    to: "/productos",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Listado de Productos",
        to: "/consultar-productos",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Usuarios",
    to: "/usuarios",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Listado de Usuarios",
        to: "/consultar-usuarios",
      },
      {
        component: CNavItem,
        name: "Crear Usuario",
        to: "/guardar-usuario",
      },
    ],
  },
];

export default _nav;
