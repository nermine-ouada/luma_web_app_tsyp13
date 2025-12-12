import styled from "styled-components";
import { colors } from "../theme/colors";

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.textPrimaryLight};
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${(props) => props.$borderColor || colors.borderLight};
  border-radius: 12px;
  font-size: 1rem;
  background-color: ${(props) => props.$bgColor || colors.white};
  color: ${(props) => props.$textColor || colors.textPrimaryLight};
  transition: all 0.3s;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${colors.primaryLight}33;
  }

  &::placeholder {
    color: ${colors.textSecondaryLight};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${colors.borderLight};
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${colors.primaryLight}33;
  }

  &::placeholder {
    color: ${colors.textSecondaryLight};
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${colors.borderLight};
  border-radius: 12px;
  font-size: 1rem;
  background-color: ${colors.white};
  color: ${colors.textPrimaryLight};
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${colors.primaryLight}33;
  }
`;

export default function Input({ label, type = "text", style, ...props }) {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, "-") || Math.random()}`;
  const bgColor = style?.backgroundColor;
  const textColor = style?.color;
  const borderColor = style?.borderColor;

  return (
    <InputContainer>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {type === "textarea" ? (
        <StyledTextarea id={inputId} {...props} style={style} />
      ) : type === "select" ? (
        <StyledSelect id={inputId} {...props} style={style} />
      ) : (
        <StyledInput 
          id={inputId} 
          type={type} 
          {...props} 
          style={style}
          $bgColor={bgColor}
          $textColor={textColor}
          $borderColor={borderColor}
        />
      )}
    </InputContainer>
  );
}
