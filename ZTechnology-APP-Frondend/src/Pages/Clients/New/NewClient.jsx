import { useState, useEffect } from "react";
import { ClientPage } from "../List/Client.page";

//Importaciones de CORE UI
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CFormSelect,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilEnvelopeOpen,
  cilPhone,
  cilFingerprint,
  cilHome,
  cilGlobeAlt,
  cilCheckCircle,
} from "@coreui/icons";

import { saveClient, getClient } from "../../../Api/Clients/Client.api";
import { getCitie } from "../../../Api/City/Citie.api";

export const NewClient = () => {
  const [cities, setCities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [clientId, setClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState({
    document: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    idCitie: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCitie();
        setCities(citiesData.city);
      } catch (error) {
        console.error("Error al obtener las ciudades:", error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.document || !selectedCity) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      const updatedFormData = { ...formData, idCitie: selectedCity };
      const response = await saveClient(updatedFormData);
      setClientId(response.id);

      const newClients = await getClient();
      setClients(newClients.clients);

      setShowAlert(true);
      setFormData({
        document: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        idCitie: "",
      });
      setSelectedCity("");
      setTimeout(() => {
        window.location.href = "/consultar-clientes";
      }, 3000);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const areFieldsFilled = () => {
    return (
      formData.name.trim() !== "" &&
      formData.document.trim() !== "" &&
      selectedCity !== ""
    );
  };

  return (
    <div className="bg-body-tertiary d-flex flex-column align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10} lg={12} xl={12}>
            <CCard className="mx-2">
              <CCardBody className="p-2">
                <CForm onSubmit={handleSubmit}>
                  <h2 className="text-center">Crear Cliente</h2>
                  <p className="text-body-secondary text-center">
                    Ingresa los datos del cliente
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre"
                      autoComplete="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilFingerprint} />{" "}
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Identificación"
                      autoComplete="document"
                      name="document"
                      value={formData.document}
                      onChange={handleChange}
                      aria-label="Document"
                    />
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeOpen} />{" "}
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-label="Email"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Dirección"
                      autoComplete="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      aria-label="Address"
                    />
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Teléfono"
                      autoComplete="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-label="Teléfono"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilGlobeAlt} />
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="ID Ciudad"
                      name="idCitie"
                      value={selectedCity}
                      onChange={handleCityChange}
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

                  <div className="d-grid">
                    <CButton
                      color="success"
                      type="submit"
                      disabled={!areFieldsFilled()}
                    >
                      Crear Cliente
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      {showAlert && (
        <CAlert color="success">
          <CIcon icon={cilCheckCircle} /> Cliente creado correctamente.
        </CAlert>
      )}
      <div className="mb-4"></div>
      <ClientPage showNewClientButton={false} clients={clients} />
    </div>
  );
};
