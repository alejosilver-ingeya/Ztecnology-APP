import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
} from "@coreui/react";

import { saveProduct } from "../../Api/Products/Product.api";

export const NewProductCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    priceUnit: "",
    photo: "",
    state: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal abierto");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Modal cerrado");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await saveProduct(productData);
      console.log("Respuesta del API:", response);
      closeModal();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <>
      <CCard
        style={{
          width: "18rem",
          margin: "10px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <CCardBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            +
          </div>
          <CButton color="primary" onClick={openModal}>
            Agregar producto
          </CButton>
        </CCardBody>
      </CCard>
      <CModal visible={isModalOpen} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>Agregar Producto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>Nombre</CInputGroupText>
              <CFormInput
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Descripción</CInputGroupText>
              <CFormInput
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Precio</CInputGroupText>
              <CFormInput
                name="priceUnit"
                value={productData.priceUnit}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Imagen</CInputGroupText>
              <CFormInput
                name="photo"
                value={productData.photo}
                onChange={handleInputChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Estado</CInputGroupText>
              <CFormSelect
                name="state"
                value={productData.state}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar estado...</option>
                <>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </>
              </CFormSelect>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSave}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
