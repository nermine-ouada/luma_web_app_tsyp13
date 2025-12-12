import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../theme/colors";
import Logo from "./Logo";

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.isOpen ? "280px" : "80px")};
  background: linear-gradient(
    180deg,
    ${colors.primary} 0%,
    ${colors.primaryDark} 100%
  );
  transition: width 0.3s ease;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const SidebarContent = styled.div`
  padding: 2rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? "flex-start" : "center")};
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${colors.white};
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MenuItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: ${colors.white};
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-20px)"};
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  &.active {
    background: ${colors.secondary};
    box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3);
  }

  ${(props) =>
    !props.isOpen &&
    `
    justify-content: center;
    opacity: 1;
    transform: translateX(0);
  `}
`;

const MenuIcon = styled.span`
  font-size: 1.5rem;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuText = styled.span`
  font-weight: 500;
  white-space: nowrap;
`;

const Tooltip = styled.div`
  position: absolute;
  left: 100%;
  margin-left: 1rem;
  background: ${colors.primaryDark};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  white-space: nowrap;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const menuItems = [
  { path: "/welcome", icon: "👋", label: "Welcome" },
  { path: "/", icon: "📊", label: "Dashboard" },
  { path: "/admin", icon: "⚙️", label: "Admin Panel" },
  { path: "/users", icon: "👥", label: "Users" },
  { path: "/api-test", icon: "🧪", label: "API Test" },
];

export default function Sidebar({ isOpen: controlledIsOpen, onToggle }) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent>
        <LogoSection isOpen={isOpen}>
          {isOpen ? (
            <Logo
              size={48}
              textSize={1.25}
              variant="white"
              color={colors.white}
            />
          ) : (
            <Logo size={48} showText={false} variant="white" />
          )}
        </LogoSection>

        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "☰"}
        </MenuButton>

        <MenuItems>
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              to={item.path}
              isOpen={isOpen}
              className={location.pathname === item.path ? "active" : ""}
              onMouseEnter={() => !isOpen && setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              {isOpen && <MenuText>{item.label}</MenuText>}
              {!isOpen && hoveredItem === item.path && (
                <Tooltip show={true}>{item.label}</Tooltip>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </SidebarContent>
    </SidebarContainer>
  );
}
