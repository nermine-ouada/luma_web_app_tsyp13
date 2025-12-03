import { useState, useEffect } from "react";
import styled from "styled-components";
import { usersAPI, kidsAPI, healthAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { colors } from "../theme/colors";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.h2`
  font-size: 2.5rem;
  color: ${colors.primary};
  margin: 1rem 0;
`;

const StatLabel = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 1rem;
`;

const StatusIndicator = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "online" ? colors.success : colors.error};
  margin-right: 0.5rem;
  animation: ${(props) =>
    props.status === "online" ? "pulse 2s infinite" : "none"};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const StatusCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    kids: 0,
    apiStatus: "checking",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [usersRes, kidsRes, healthRes] = await Promise.all([
        usersAPI.getAll(),
        kidsAPI.getAll(),
        healthAPI.check().catch(() => ({ data: { success: false } })),
      ]);

      setStats({
        users: usersRes.data.count || usersRes.data.data?.length || 0,
        kids: kidsRes.data.count || kidsRes.data.data?.length || 0,
        apiStatus: healthRes.data.success ? "online" : "offline",
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats((prev) => ({ ...prev, apiStatus: "offline" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "2rem", color: colors.primary }}>Dashboard</h1>

      <DashboardContainer>
        <StatCard>
          <StatLabel>Total Users</StatLabel>
          <StatValue>{loading ? "..." : stats.users}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Kids</StatLabel>
          <StatValue>{loading ? "..." : stats.kids}</StatValue>
        </StatCard>

        <StatusCard>
          <div>
            <StatusIndicator status={stats.apiStatus} />
            <strong>API Status: </strong>
            <span style={{ textTransform: "uppercase" }}>
              {stats.apiStatus}
            </span>
          </div>
          <Button size="small" onClick={fetchStats} disabled={loading}>
            Refresh
          </Button>
        </StatusCard>
      </DashboardContainer>
    </div>
  );
}
