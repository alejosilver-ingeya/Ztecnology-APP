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
  // CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople, cilOptions, cilPlus } from "@coreui/icons";

//Importacion de API
import {
  getQuote,
  deleteQuote,
  updateQuote,
} from "../../../Api/Quotes/Quotes.api";

export const QuotePage = ({ showNewQuoteButton = true }) => {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteQuoteId, setDeleteQuoteId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editQuoteData, setEditQuoteData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getQuote();
        setQuoteData(response.quote);
      } catch (error) {
        setError("Error al obtener los datos de cotización");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (quoteId) => {
    const quote = quoteData.find((quote) => quote.id === quoteId);
    if (quote) {
      setEditQuoteData(quote);
      setShowEditModal(true);
    } else {
      console.error(`No se encontró la cotizacion con ID: ${quoteId}`);
    }
  };

  const handleDelete = (quoteId) => {
    setDeleteQuoteId(quoteId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    console.log("Eliminar la cotizacion con ID:", deleteQuoteId);
    setShowDeleteConfirmation(false);
    deleteQuote(deleteQuoteId)
      .then((response) => {
        if (
          response.msg === `Se elimino con exito la cotizacion ${deleteQuoteId}`
        ) {
          setQuoteData(quoteData.filter((quote) => quote.id !== deleteQuoteId));
        } else {
          console.error("Error al eliminar la cotizacion:", response.msg);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la cotizacion:", error);
      });
  };

  const cancelDelete = () => {
    setDeleteQuoteId(null);
    setShowDeleteConfirmation(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditQuoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const updatedQuoteData = {
        ...editQuoteData,
      };
      console.log(
        "Datos de la cotizacion a enviar al backend:",
        updatedQuoteData
      );
      const response = await updateQuote(updatedQuoteData);
      console.log("Respuesta del backend:", response); //
      if (response.msg === "Se edito con exito la cotizacion") {
        setQuoteData((prevData) =>
          prevData.map((quote) =>
            quote.id === updatedQuoteData.id ? updatedQuoteData : quote
          )
        );
        setShowEditModal(false);
      } else {
        console.error("Error al actualizar la cotizacion:", response.msg);
      }
    } catch (error) {
      console.error("Error al actualizar la cotizacion:", error);
    }
  };

  return (
    <div>
      {showNewQuoteButton && (
        <NavLink to="/guardar-cotizacion" className="btn btn-primary mb-3">
          <CIcon icon={cilPlus} /> Crear Nueva Cotizacion
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
            <CTableHeaderCell># Cotización</CTableHeaderCell>
            <CTableHeaderCell>Cliente</CTableHeaderCell>
            <CTableHeaderCell>Precio Total</CTableHeaderCell>
            <CTableHeaderCell>Elaboro</CTableHeaderCell>
            <CTableHeaderCell>Descuento</CTableHeaderCell>
            <CTableHeaderCell>% Descuento</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {quoteData.map((quote, index) => (
            <CTableRow key={index}>
              <CTableDataCell className="text-center"></CTableDataCell>
              <CTableDataCell>
                <div>{quote.number}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.idCustomer}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.priceTotal}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.idUser}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.discount}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.percentageDiscount}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{quote.idStateQuote}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown>
                  <CDropdownToggle size="sm">
                    <CIcon icon={cilOptions} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleEdit(quote.id)}>
                      Editar
                    </CDropdownItem>
                    <CDropdownItem
                      className="deleteButton"
                      onClick={() => handleDelete(quote.id)}
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
          <CModalTitle>Eliminar Cotización</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro de que deseas eliminar esta cotización?
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
            Actualizar Cotización
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>Nombre</CInputGroupText>
              <CFormInput
                name="name"
                value={editQuoteData ? editQuoteData.name : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Identificación</CInputGroupText>
              <CFormInput
                name="document"
                value={editQuoteData ? editQuoteData.document : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Email</CInputGroupText>
              <CFormInput
                name="email"
                value={editQuoteData ? editQuoteData.email : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Teléfono</CInputGroupText>
              <CFormInput
                name="phone"
                value={editQuoteData ? editQuoteData.phone : ""}
                onChange={handleEditInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Dirección</CInputGroupText>
              <CFormInput
                name="address"
                value={editQuoteData ? editQuoteData.address : ""}
                onChange={handleEditInputChange}
              />
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

QuotePage.propTypes = {
  showNewQuoteButton: PropTypes.bool,
};
