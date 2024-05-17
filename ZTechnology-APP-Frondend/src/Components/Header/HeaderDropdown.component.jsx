import { useNavigate } from "react-router-dom";
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked, cilTask, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "../../assets/images/avatars/8.jpg";

export const HeaderDropdownComponent = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("Token"), localStorage.removeItem("color-theme");
    navigate("/");
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0"
        caret={false}
      >
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Cuenta
        </CDropdownHeader>
        <CDropdownItem href="">
          <CIcon icon={cilTask} className="me-2" />
          Tareas
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Perfil
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem>
          <CButton onClick={handleLogOut}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Cerrar Sesión
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};
