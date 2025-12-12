import { useState } from "react";
import styled from "styled-components";
import { colors } from "../theme/colors";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";
import { feedbackAPI } from "../services/api";

const WelcomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.secondary} 100%
  );
  border-radius: 20px;
  color: ${colors.white};
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(48, 15, 73, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  position: relative;
  z-index: 1;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const MobileAppLink = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${colors.accent};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeedbackForm = styled(Card)`
  h2 {
    color: ${colors.primary};
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.textPrimaryLight};
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${colors.borderLight};
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => (props.active ? colors.warning : colors.greyLight)};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const InfoCard = styled(Card)`
  h2 {
    color: ${colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.textSecondaryLight};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background-color: ${colors.successLight};
  color: ${colors.success};
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: ${colors.errorLight};
  color: ${colors.error};
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

export default function Welcome() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await feedbackAPI.create(formData);
      setMessage({
        type: "success",
        text: "Thank you for your feedback! We appreciate your input.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        rating: 0,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit feedback. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WelcomeContainer>
      <HeroSection>
        <LogoContainer>
          <Logo size={120} textSize={2} variant="white" color={colors.white} />
        </LogoContainer>
        <HeroTitle>Welcome to Luma</HeroTitle>
        <HeroSubtitle>
          Supporting mothers and children with special needs through technology
          and community
        </HeroSubtitle>
        <MobileAppLink
          href="https://play.google.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          📱 Download Mobile App
        </MobileAppLink>
      </HeroSection>

      <ContentGrid>
        <FeedbackForm>
          <h2>Share Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your feedback about?"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you think..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Rating (Optional)</Label>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    key={star}
                    type="button"
                    active={
                      star <= (hoveredRating || formData.rating) ? true : false
                    }
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    ★
                  </StarButton>
                ))}
              </RatingContainer>
            </FormGroup>

            <Button type="submit" disabled={submitting} fullWidth>
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>

            {message.type === "success" && (
              <SuccessMessage>{message.text}</SuccessMessage>
            )}
            {message.type === "error" && (
              <ErrorMessage>{message.text}</ErrorMessage>
            )}
          </form>
        </FeedbackForm>

        <InfoCard>
          <h2>About Luma</h2>
          <p>
            Luma is a comprehensive platform designed to support mothers with
            children who have special needs, including ADHD, Down Syndrome, and
            Autism.
          </p>
          <p>
            Our mobile app provides tools for tracking progress, managing
            schedules, connecting with community, and accessing resources.
          </p>
          <p>
            <strong>Features:</strong>
          </p>
          <ul style={{ color: colors.textSecondaryLight, lineHeight: 1.8 }}>
            <li>Concentration games for children</li>
            <li>Progress tracking and analytics</li>
            <li>Calendar and event management</li>
            <li>Medicine reminders</li>
            <li>Period tracking</li>
            <li>Community support</li>
            <li>AI-powered chatbot assistance</li>
          </ul>
        </InfoCard>
      </ContentGrid>
    </WelcomeContainer>
  );
}
