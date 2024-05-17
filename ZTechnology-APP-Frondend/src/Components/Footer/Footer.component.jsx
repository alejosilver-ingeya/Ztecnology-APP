//Importacion Core UI
import { CFooter } from "@coreui/react";

export const FooterComponent = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a target="_blank" rel="noopener noreferrer">
          Ztecnology
        </a>
        <span className="ms-1">&copy; 2024.</span>
      </div>
      <div className="ms-auto">
        <a target="_blank" rel="noopener noreferrer">
          Diseñado por &amp; Alejandro Yopasa
        </a>
      </div>
    </CFooter>
  );
};
