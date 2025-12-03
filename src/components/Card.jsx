import styled from "styled-components";
import { colors } from "../theme/colors";

const StyledCard = styled.div`
  background-color: ${colors.surfaceLight};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px ${colors.shadowLight};
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 8px 12px ${colors.shadowDark};
    transform: translateY(-2px);
  }
`;

export default function Card({ children, ...props }) {
  return <StyledCard {...props}>{children}</StyledCard>;
}
