import { useState } from "react";
import styled from "styled-components";
import { usersAPI, kidsAPI, healthAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { colors } from "../theme/colors";

const TestContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestSection = styled(Card)`
  margin-bottom: 2rem;
`;

const TestButton = styled(Button)`
  margin: 0.5rem;
  width: calc(50% - 1rem);
`;

const ResponseArea = styled.pre`
  background-color: ${colors.primaryDark};
  color: ${colors.white};
  padding: 1rem;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.875rem;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: 0.5rem;
  background-color: ${(props) => {
    if (props.status >= 200 && props.status < 300) return colors.success;
    if (props.status >= 400) return colors.error;
    return colors.warning;
  }};
  color: ${colors.white};
`;

export default function ApiTest() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async (apiCall, label) => {
    try {
      setLoading(true);
      setResponse({ label, loading: true });
      const result = await apiCall();
      setResponse({
        label,
        status: result.status,
        data: result.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setResponse({
        label,
        status: error.response?.status || "Error",
        error: error.response?.data || error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "2rem", color: colors.primary }}>
        API Testing
      </h1>

      <TestContainer>
        <div>
          <TestSection>
            <h2 style={{ color: colors.primary, marginBottom: "1rem" }}>
              Health Check
            </h2>
            <TestButton
              onClick={() => handleTest(healthAPI.check, "Health Check")}
            >
              Test Health
            </TestButton>
          </TestSection>

          <TestSection>
            <h2 style={{ color: colors.primary, marginBottom: "1rem" }}>
              Users API
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <TestButton
                onClick={() => handleTest(usersAPI.getAll, "Get All Users")}
              >
                GET All
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter User ID:");
                  if (id)
                    handleTest(() => usersAPI.getById(id), `Get User ${id}`);
                }}
              >
                GET By ID
              </TestButton>
              <TestButton
                onClick={() => {
                  const data = {
                    name: "Test User",
                    email: `test${Date.now()}@example.com`,
                    phone: "+1234567890",
                  };
                  handleTest(() => usersAPI.create(data), "Create User");
                }}
              >
                POST Create
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter User ID to update:");
                  if (id) {
                    const data = { name: "Updated Name" };
                    handleTest(
                      () => usersAPI.update(id, data),
                      `Update User ${id}`
                    );
                  }
                }}
              >
                PUT Update
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter User ID to delete:");
                  if (id)
                    handleTest(() => usersAPI.delete(id), `Delete User ${id}`);
                }}
              >
                DELETE
              </TestButton>
            </div>
          </TestSection>
        </div>

        <div>
          <TestSection>
            <h2 style={{ color: colors.primary, marginBottom: "1rem" }}>
              Kids API
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <TestButton
                onClick={() => handleTest(kidsAPI.getAll, "Get All Kids")}
              >
                GET All
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter Kid ID:");
                  if (id)
                    handleTest(() => kidsAPI.getById(id), `Get Kid ${id}`);
                }}
              >
                GET By ID
              </TestButton>
              <TestButton
                onClick={() => {
                  const userId = prompt("Enter User ID for the kid:");
                  if (userId) {
                    const data = {
                      userId,
                      name: "Test Kid",
                      dateOfBirth: "2020-01-01",
                      gender: "male",
                    };
                    handleTest(() => kidsAPI.create(data), "Create Kid");
                  }
                }}
              >
                POST Create
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter Kid ID to update:");
                  if (id) {
                    const data = { name: "Updated Kid Name" };
                    handleTest(
                      () => kidsAPI.update(id, data),
                      `Update Kid ${id}`
                    );
                  }
                }}
              >
                PUT Update
              </TestButton>
              <TestButton
                onClick={() => {
                  const id = prompt("Enter Kid ID to delete:");
                  if (id)
                    handleTest(() => kidsAPI.delete(id), `Delete Kid ${id}`);
                }}
              >
                DELETE
              </TestButton>
              <TestButton
                onClick={() => {
                  const userId = prompt("Enter User ID:");
                  if (userId) {
                    handleTest(
                      () => kidsAPI.getByUserId(userId),
                      `Get Kids by User ${userId}`
                    );
                  }
                }}
              >
                GET By User
              </TestButton>
            </div>
          </TestSection>
        </div>
      </TestContainer>

      {response && (
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ color: colors.primary }}>
              Response: {response.label}
            </h3>
            {response.status && (
              <StatusBadge status={response.status}>
                {typeof response.status === "number"
                  ? response.status
                  : "Error"}
              </StatusBadge>
            )}
          </div>
          {response.timestamp && (
            <p
              style={{
                color: colors.textSecondaryLight,
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              {new Date(response.timestamp).toLocaleString()}
            </p>
          )}
          <ResponseArea>
            {JSON.stringify(
              response.data || response.error || response,
              null,
              2
            )}
          </ResponseArea>
        </Card>
      )}
    </div>
  );
}
