import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Importaciones de Core Ui
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

export const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:5500/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Error al iniciar sesión. Por favor, inténtelo de nuevo."
        );
      }

      const resData = await response.json();
      localStorage.setItem("jwt", resData.token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Bienvenido a Ztecnology</h1>
                      <p className="text-body-secondary">
                        Ingresa las credenciales para iniciar sesión
                      </p>
                      {error && <p className="text-danger">{error}</p>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          placeholder="Usuario"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          autoComplete="current-password"
                        />
                        <CButton
                          onMouseDown={() => setShowPassword(true)}
                          onMouseUp={() => setShowPassword(false)}
                          onMouseOut={() => setShowPassword(false)}
                          color="info"
                          variant="outline"
                        ></CButton>
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={handleClick}
                          >
                            Iniciar sesión
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          {/* <CButton color="link" className="px-0">
                            Olvido la contraseña?
                          </CButton> */}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};
