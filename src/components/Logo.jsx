import styled from "styled-components";
import { colors } from "../theme/colors";
import logoDark from "../assets/logo/logo-dark-purple1.png";
import logoLight from "../assets/logo/logo-light-purple1.png";
import logoWhite from "../assets/logo/logo-white1.png";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoImage = styled.img`
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  object-fit: contain;
  border-radius: ${(props) => (props.rounded ? "12px" : "0")};
`;

const LogoText = styled.div`
  font-size: ${(props) => props.textSize || 1.5}rem;
  font-weight: bold;
  color: ${(props) => props.color || colors.white};
  letter-spacing: 0.5px;
`;

export default function Logo({
  size = 40,
  textSize,
  color,
  showText = true,
  variant = "dark", // "dark", "light", "white"
}) {
  const getLogoSource = () => {
    switch (variant) {
      case "light":
        return logoLight;
      case "white":
        return logoWhite;
      default:
        return logoDark;
    }
  };

  return (
    <LogoContainer>
      <LogoImage
        src={getLogoSource()}
        alt="Luma Logo"
        size={size}
        rounded={true}
      />
      {showText && (
        <LogoText textSize={textSize} color={color}>
          Luma
        </LogoText>
      )}
    </LogoContainer>
  );
}
