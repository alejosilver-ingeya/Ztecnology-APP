import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilLockUnlocked,
  cilPhone,
  cilEnvelopeOpen,
  cilBriefcase,
  cilUnderline,
  cilCheckCircle,
} from "@coreui/icons";

import { saveUser } from "../../../Api/Users/User.api";

export const RegisterPage = () => {
  const [userData, setUserData] = useState({
    names: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
    area: "",
    idRol: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveUser(userData);
      console.log("Usuario creado con éxito:", response);
      setShowAlert(true);
      setUserData({
        names: "",
        email: "",
        password: "",
        repeatPassword: "",
        phone: "",
        area: "",
        idRol: "",
      });
      setTimeout(() => {
        window.location.href = "/consultar-usuarios";
      }, 3000);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="names"
                      value={userData.names}
                      onChange={handleChange}
                      placeholder="Nombre de usuario"
                      autoComplete="names"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeOpen} />
                    </CInputGroupText>
                    <CFormInput
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockUnlocked} />{" "}
                      {/* Cambié el icono de la contraseña */}
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockUnlocked} />{" "}
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="repeatPassword"
                      value={userData.repeatPassword}
                      onChange={handleChange}
                      placeholder="Repita la contraseña"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />{" "}
                    </CInputGroupText>
                    <CFormInput
                      type="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="Teléfono"
                      autoComplete="phone"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBriefcase} />{" "}
                    </CInputGroupText>
                    <CFormInput
                      type="area"
                      name="area"
                      value={userData.area}
                      onChange={handleChange}
                      placeholder="Área"
                      autoComplete="area"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUnderline} />
                    </CInputGroupText>
                    <select
                      className="form-select"
                      name="idRol"
                      value={userData.idRol}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione un rol</option>
                      <option value="1">Administrador</option>
                      <option value="2">Gestor</option>
                    </select>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Crear Usuario
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
          <CIcon icon={cilCheckCircle} /> Usuario creado correctamente.
        </CAlert>
      )}
    </div>
  );
};
