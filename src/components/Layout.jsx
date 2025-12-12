import { useState } from "react";
import styled from "styled-components";
import { colors } from "../theme/colors";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: ${colors.backgroundLight};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.sidebarOpen ? "280px" : "80px")};
  transition: margin-left 0.3s ease;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen}>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
}
