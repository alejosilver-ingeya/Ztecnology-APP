import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// Importaciones de CORE UI
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilOptions,
  cilPlus,
  cilHome,
  cilPencil,
  cilEnvelopeClosed,
  cilLockLocked,
  cilPhone,
} from "@coreui/icons";

// Importa las imágenes de avatar disponibles
import avatar1 from "../../../assets/images/avatars/1.jpg";
import avatar2 from "../../../assets/images/avatars/2.jpg";
import avatar3 from "../../../assets/images/avatars/3.jpg";
import avatar4 from "../../../assets/images/avatars/4.jpg";
import avatar5 from "../../../assets/images/avatars/5.jpg";
import avatar6 from "../../../assets/images/avatars/6.jpg";

// Array de imágenes de avatar
const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

// Importacion de API
import { getUsers, deleteUser, updateUser } from "../../../Api/Users/User.api";

export const UsersPage = ({ showNewUserButton = true }) => {
  const [userData, setUserData] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUserData(data.users);
      })
      .catch((error) => {
        console.error("Error al consultar los datos de Usuario:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    console.log("Inactivar el usuario con id:", deleteUserId);
    setShowDeleteConfirmation(false);
    deleteUser(deleteUserId)
      .then((response) => {
        if (
          response.msg === `Fue posible inactivar el Usuario ${deleteUserId}`
        ) {
          setUserData(userData.filter((user) => user.id !== deleteUserId));
        } else {
          console.error("Error al inactivar el usuario:", response.msg);
        }
      })
      .catch((error) => {
        console.error("Error no fue posible inactivar el usuario:", error);
      });
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (userId) => {
    const user = userData.find((user) => user.id === userId);
    if (user) {
      setEditUserData(user);
      setShowEditModal(true);
    } else {
      console.error(`No fue posible editar el Usuario cin ID: ${userId}`);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const updatedUserData = { ...editUserData };
      const response = await updateUser(updatedUserData);
      console.log("Respuesta del backend:", response);
      if (response.msg === "Se editó con éxito el usuario") {
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === updatedUserData.id ? updatedUserData : user
          )
        );
        setShowEditModal(false);
      } else {
        console.error("Error al actualizar el Usuario:", response.msg);
      }
    } catch (error) {
      console.error("Error al actualizar el Usuario:", error);
    }
  };

  return (
    <div>
      {showNewUserButton && (
        <NavLink to="/guardar-usuario" className="btn btn-primary mb-3">
          <CIcon icon={cilPlus} /> Crear Nuevo Usuario
        </NavLink>
      )}

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead
          className="bg-primary text-white text-nowrap"
          color="primary"
        >
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilUser} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nombre de usuario</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Área</CTableHeaderCell>
            <CTableHeaderCell>Rol</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userData.map((user, index) => (
            <CTableRow key={index}>
              <CTableDataCell className="text-center">
                {/* Asignar un avatar aleatorio */}
                <img
                  src={
                    avatarImages[
                      Math.floor(Math.random() * avatarImages.length)
                    ]
                  }
                  className="avatar"
                  alt="avatar"
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{user.names}</div>
                <div className="small text-muted">
                  {/* Mostrar la fecha de creación */}
                  <span className="fw-bold">Creado el: </span>
                  {formatDate(user.createdAt)}
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{user.email}</div>
                <div className="small text-muted">
                  {/* Mostrar la fecha de actualización */}
                  <span className="fw-bold">Actualizado el: </span>
                  {formatDate(user.updatedAt)}
                </div>
              </CTableDataCell>
              <CTableDataCell>{user.phone}</CTableDataCell>
              <CTableDataCell>{user.area}</CTableDataCell>
              <CTableDataCell>
                {user.idRol === 1
                  ? "Administrador"
                  : user.idRol === 2
                  ? "Gestor"
                  : "Otro"}
              </CTableDataCell>
              <CTableDataCell>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: user.state === 1 ? "green" : "red",
                    display: "inline-block",
                  }}
                ></div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown>
                  <CDropdownToggle size="sm">
                    <CIcon icon={cilOptions} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleEdit(user.id)}>
                      Actualizar datos
                    </CDropdownItem>
                    <CDropdownItem
                      className="deleteButton"
                      onClick={() => handleDelete(user.id)}
                    >
                      Cambiar Estado
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CModal visible={showDeleteConfirmation} onClose={cancelDelete} centered>
        <CModalHeader closeButton>
          <CModalTitle>Delete User</CModalTitle>
        </CModalHeader>
        <CModalBody>Esta seguro que desea inactivar al usuario?</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={confirmDelete}>
            Inactivar
          </CButton>{" "}
          <CButton color="secondary" onClick={cancelDelete}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="modal-lg"
      >
        <CModalHeader closeButton className="bg-primary text-white">
          <CModalTitle style={{ margin: "auto", textAlign: "center" }}>
            <CIcon icon={cilPencil} /> Actualizar datos
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                name="names"
                value={editUserData ? editUserData.names : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilEnvelopeClosed} />
              </CInputGroupText>
              <CFormInput
                name="email"
                value={editUserData ? editUserData.email : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="text"
                name="password"
                value={editUserData ? editUserData.password : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput
                name="phone"
                value={editUserData ? editUserData.phone : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilHome} />
              </CInputGroupText>
              <CFormInput
                name="area"
                value={editUserData ? editUserData.area : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleEditSubmit}>
            Actualizar
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

UsersPage.propTypes = {
  showNewUserButton: PropTypes.bool,
};
