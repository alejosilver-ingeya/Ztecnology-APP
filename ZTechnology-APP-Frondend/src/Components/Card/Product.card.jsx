import PropTypes from "prop-types";
import { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";

export const ProductCard = ({ name, description, priceUnit, photo, state }) => {
  const parsedPrice = parseFloat(priceUnit)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const [hovered, setHovered] = useState(false);
  const [productState, setProductState] = useState(state);

  const cardStyle = {
    width: "18rem",
    margin: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out",
    transform: hovered ? "scale(1.05)" : "scale(1)",
  };

  const containerStyle = {
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  };

  const circleStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: productState === 0 ? "red" : "green",
    marginRight: "5px",
    padding: "5px",
  };

  const statusTextStyle = {
    backgroundColor: productState === 0 ? "red" : "green",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
  };

  const toggleChangeState = () => {
    setProductState(productState === 0 ? 1 : 0);
  };

  return (
    <CCard
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CCardImage
        orientation="top"
        src={photo}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <CCardBody>
        <div style={containerStyle}>
          <CCardTitle>{name}</CCardTitle>
          <CCardText>{description}</CCardText>
        </div>
        <CCardText>
          <strong>Precio:</strong> ${parsedPrice}
        </CCardText>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <div style={circleStyle}></div>
          <span style={statusTextStyle}>
            {productState === 0 ? "Inactivo" : "Activo"}
          </span>
          <CButton
            color="primary"
            style={{ marginLeft: "auto" }}
            onClick={toggleChangeState}
          >
            Cambiar estado
          </CButton>
        </div>
      </CCardBody>
      {productState === 1 && <CCardBody></CCardBody>}
    </CCard>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  state: PropTypes.number.isRequired,
};
