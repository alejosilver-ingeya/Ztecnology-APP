import { ContentComponent } from "../Content/Content.component";
import { SidebarComponent } from "../Sidebar/Sidebar.component";
import { FooterComponent } from "../Footer/Footer.component";
import { HeaderComponent } from "../Header/Header.component";

export const LayoutComponent = () => {
  return (
    <div>
      <SidebarComponent />
      <div className="wrapper d-flex flex-column min-vh-100">
        <HeaderComponent />
        <div className="body flex-grow-1">
          <ContentComponent />
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};
