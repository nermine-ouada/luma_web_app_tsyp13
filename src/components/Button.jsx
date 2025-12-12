import styled from "styled-components";
import { colors } from "../theme/colors";

const StyledButton = styled.button`
  background-color: ${(props) => {
    if (props.variant === "secondary") return colors.secondary;
    if (props.variant === "danger") return colors.error;
    if (props.variant === "success") return colors.success;
    return colors.primary;
  }};
  color: ${colors.white};
  padding: ${(props) =>
    props.size === "small"
      ? "0.5rem 1rem"
      : props.size === "large"
      ? "1rem 2rem"
      : "0.75rem 1.5rem"};
  border-radius: 16px;
  font-size: ${(props) =>
    props.size === "small"
      ? "0.875rem"
      : props.size === "large"
      ? "1.125rem"
      : "1rem"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px ${colors.shadowLight};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${colors.shadowDark};
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
