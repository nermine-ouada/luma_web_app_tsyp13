import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../theme/colors";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px ${colors.shadowLight};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${colors.white};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.primaryLight};
  }

  &.active {
    background-color: ${colors.secondary};
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const Footer = styled.footer`
  background-color: ${colors.primaryDark};
  color: ${colors.white};
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
`;

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo>WIE TSYP</Logo>
          <NavLinks>
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/users"
              className={location.pathname === "/users" ? "active" : ""}
            >
              Users
            </NavLink>
            <NavLink
              to="/kids"
              className={location.pathname === "/kids" ? "active" : ""}
            >
              Kids
            </NavLink>
            <NavLink
              to="/api-test"
              className={location.pathname === "/api-test" ? "active" : ""}
            >
              API Test
            </NavLink>
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>&copy; 2024 WIE TSYP. All rights reserved.</p>
      </Footer>
    </LayoutContainer>
  );
}
