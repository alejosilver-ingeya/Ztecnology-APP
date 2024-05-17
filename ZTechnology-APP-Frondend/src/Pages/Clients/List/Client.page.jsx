import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

//Importaciones de CORE UI
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
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople, cilOptions, cilPlus, cilGlobeAlt } from "@coreui/icons";

//Importacion de API
import {
  getClient,
  deleteClient,
  updateClient,
} from "../../../Api/Clients/Client.api";
import { getCitie } from "../../../Api/City/Citie.api";

export const ClientPage = ({ showNewClientButton = true }) => {
  const [clientData, setClientData] = useState([]);
  const [cities, setCities] = useState([]);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editClientData, setEditClientData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getClient()
      .then((data) => {
        setClientData(data.customers);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del cliente:", error);
      });
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCitie();
        setCities(response.city);
      } catch (error) {
        console.error("Error al obtener las ciudades:", error);
      }
    };

    fetchCities();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getCityName = (idCitie) => {
    const city = cities.find((city) => city.id === idCitie);
    return city ? city.name : "Desconocido";
  };

  const handleEdit = (clientId) => {
    const client = clientData.find((client) => client.id === clientId);
    if (client) {
      // Verifica si el cliente existe antes de abrir el modal de edición
      setEditClientData(client);
      setSelectedCity(client.idCitie); // Actualiza la ciudad seleccionada al abrir el modal
      setShowEditModal(true);
    } else {
      console.error(`No se encontró un cliente con ID: ${clientId}`);
    }
  };

  const handleDelete = (clientId) => {
    setDeleteClientId(clientId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    console.log("Eliminar cliente con ID:", deleteClientId);
    setShowDeleteConfirmation(false);
    deleteClient(deleteClientId)
      .then((response) => {
        if (
          response.msg === `Se elimino con exito el Cliente ${deleteClientId}`
        ) {
          setClientData(
            clientData.filter((client) => client.id !== deleteClientId)
          );
        } else {
          console.error("Error al eliminar el cliente:", response.msg);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el cliente:", error);
      });
  };

  const cancelDelete = () => {
    setDeleteClientId(null);
    setShowDeleteConfirmation(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setSelectedCity(parseInt(value)); // Asegúrate de que el valor sea un entero
    } else {
      setEditClientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const updatedClientData = {
        ...editClientData,
        idCitie: selectedCity,
      };
      console.log("Datos del cliente a enviar al backend:", updatedClientData); // Agregar este console.log
      const response = await updateClient(updatedClientData);
      console.log("Respuesta del backend:", response); // Agregar este console.log
      if (response.msg === "Se edito con exito el Cliente") {
        // Mostrar mensaje de éxito genérico
        console.log("El cliente se ha editado exitosamente.");
        setClientData((prevData) =>
          prevData.map((client) =>
            client.id === updatedClientData.id ? updatedClientData : client
          )
        );
        setShowEditModal(false);
      } else {
        // Mostrar mensaje de error si la edición falla
        console.error("Error al actualizar el cliente:", response.msg);
      }
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  return (
    <div>
      {showNewClientButton && (
        <NavLink to="/guardar-cliente" className="btn btn-primary mb-3">
          <CIcon icon={cilPlus} /> Crear Nuevo Cliente
        </NavLink>
      )}

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead
          className="bg-primary text-white text-nowrap"
          color="primary"
        >
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nombre del Cliente</CTableHeaderCell>
            <CTableHeaderCell>Identificación</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Teléfono</CTableHeaderCell>
            <CTableHeaderCell>Dirección</CTableHeaderCell>
            <CTableHeaderCell>Ciudad</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {clientData.map((client, index) => (
            <CTableRow key={index}>
              <CTableDataCell className="text-center"></CTableDataCell>
              <CTableDataCell>
                <div>{client.name}</div>
                <div className="small text-muted">
                  <span className="fw-bold">Creado el: </span>
                  {formatDate(client.createdAt)}
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{client.document}</div>
                <div className="small text-muted">
                  <span className="fw-bold">Actualizado el: </span>
                  {formatDate(client.updatedAt)}
                </div>
              </CTableDataCell>
              <CTableDataCell>{client.email}</CTableDataCell>
              <CTableDataCell>{client.phone}</CTableDataCell>
              <CTableDataCell>{client.address}</CTableDataCell>
              <CTableDataCell>{getCityName(client.idCitie)}</CTableDataCell>
              <CTableDataCell>
                <CDropdown>
                  <CDropdownToggle size="sm">
                    <CIcon icon={cilOptions} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleEdit(client.id)}>
                      Editar
                    </CDropdownItem>
                    <CDropdownItem
                      className="deleteButton"
                      onClick={() => handleDelete(client.id)}
                    >
                      Eliminar
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
          <CModalTitle>Eliminar Cliente</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro de que deseas eliminar este cliente?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={confirmDelete}>
            Eliminar
          </CButton>{" "}
          <CButton color="secondary" onClick={cancelDelete}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="modal-lg"
      >
        <CModalHeader closeButton>
          <CModalTitle style={{ margin: "auto", textAlign: "center" }}>
            Actualizar datos del Cliente
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>Nombre</CInputGroupText>
              <CFormInput
                name="name"
                value={editClientData ? editClientData.name : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Identificación</CInputGroupText>
              <CFormInput
                name="document"
                value={editClientData ? editClientData.document : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Email</CInputGroupText>
              <CFormInput
                name="email"
                value={editClientData ? editClientData.email : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Teléfono</CInputGroupText>
              <CFormInput
                name="phone"
                value={editClientData ? editClientData.phone : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Dirección</CInputGroupText>
              <CFormInput
                name="address"
                value={editClientData ? editClientData.address : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilGlobeAlt} />
              </CInputGroupText>
              <CFormSelect
                aria-label="idCitie"
                name="idCitie"
                value={selectedCity}
                onChange={handleEditInputChange}
              >
                <option value="">Selecciona una ciudad...</option>
                {Array.isArray(cities) &&
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
              </CFormSelect>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleEditSubmit}>
            Guardar Cambios
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

ClientPage.propTypes = {
  showNewClientButton: PropTypes.bool,
};
