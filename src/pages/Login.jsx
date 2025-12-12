import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../theme/colors";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${colors.backgroundDark} 0%,
    ${colors.surfaceDark} 100%
  );
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: ${colors.surfaceDark};
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors.borderLight};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  color: ${colors.white};
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 0.95rem;
  text-align: center;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${colors.textPrimaryLight};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.85rem;
  margin: 0;
  text-align: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${colors.borderLight};
  }
`;

const InfoText = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 0.85rem;
  text-align: center;
  margin: 0;
  font-style: italic;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Non-functional login - just redirect to dashboard
    // In a real app, this would authenticate with the backend
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo size={80} showText={true} variant="dark" />
          <Title>Admin Login</Title>
          <Subtitle>Sign in to access the Luma Admin Dashboard</Subtitle>
        </LogoContainer>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              label=""
              type="email"
              placeholder="admin@luma.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: colors.surfaceDark,
                color: colors.white,
                borderColor: colors.borderLight,
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              label=""
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: colors.surfaceDark,
                color: colors.white,
                borderColor: colors.borderLight,
              }}
            />
          </FormGroup>

          <Button type="submit" fullWidth>
            Sign In
          </Button>

          <Divider />

          <InfoText>
            Demo Mode: Any credentials will redirect to the dashboard
          </InfoText>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}

