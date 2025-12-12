import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  usersAPI,
  healthAPI,
  eventsAPI,
  gameProgressAPI,
  communityAPI,
  feedbackAPI,
  doctorsAPI,
  articlesAPI,
} from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { colors } from "../theme/colors";

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 1.1rem;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const KPICard = styled(Card)`
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  background: ${(props) =>
    props.gradient
      ? `linear-gradient(135deg, ${props.gradient[0]} 0%, ${props.gradient[1]} 100%)`
      : colors.white};
  color: ${(props) => (props.gradient ? colors.white : "inherit")};
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  transition: all 0.3s ease;
`;

const KPIIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const KPIValue = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: ${(props) => (props.gradient ? colors.white : colors.primary)};
`;

const KPILabel = styled.p`
  font-size: 0.9rem;
  opacity: ${(props) => (props.gradient ? 0.9 : 0.7)};
  font-weight: 500;
  margin: 0;
`;

const KPIChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  opacity: 0.8;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const ChartCard = styled(Card)`
  padding: 1.5rem;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${(props) =>
    props.status === "online"
      ? colors.successLight
      : props.status === "warning"
      ? colors.warningLight
      : colors.errorLight};
  color: ${(props) =>
    props.status === "online"
      ? colors.success
      : props.status === "warning"
      ? colors.warning
      : colors.error};
  font-weight: 600;
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "online"
      ? colors.success
      : props.status === "warning"
      ? colors.warning
      : colors.error};
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

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ActionButton = styled(Button)`
  flex: 1;
  min-width: 150px;
`;

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    gameProgress: 0,
    communityPosts: 0,
    feedback: 0,
    doctors: 0,
    articles: 0,
    apiStatus: "checking",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [
        usersRes,
        eventsRes,
        gameProgressRes,
        communityRes,
        feedbackRes,
        doctorsRes,
        articlesRes,
        healthRes,
      ] = await Promise.all([
        usersAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        eventsAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        gameProgressAPI
          .getAll()
          .catch(() => ({ data: { count: 0, data: [] } })),
        communityAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        feedbackAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        doctorsAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        articlesAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        healthAPI.check().catch(() => ({ data: { success: false } })),
      ]);

      setStats({
        users: usersRes.data.count || usersRes.data.data?.length || 0,
        events: eventsRes.data.count || eventsRes.data.data?.length || 0,
        gameProgress:
          gameProgressRes.data.count || gameProgressRes.data.data?.length || 0,
        communityPosts:
          communityRes.data.count || communityRes.data.data?.length || 0,
        feedback: feedbackRes.data.count || feedbackRes.data.data?.length || 0,
        doctors: doctorsRes.data.count || doctorsRes.data.data?.length || 0,
        articles: articlesRes.data.count || articlesRes.data.data?.length || 0,
        apiStatus: healthRes.data.success ? "online" : "offline",
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats((prev) => ({ ...prev, apiStatus: "offline" }));
    } finally {
      setLoading(false);
    }
  };

  const kpiData = [
    {
      icon: "👥",
      label: "Total Users",
      value: stats.users,
      gradient: [colors.primary, colors.primaryLight],
      change: "+12%",
    },
    {
      icon: "🎮",
      label: "Game Sessions",
      value: stats.gameProgress,
      gradient: [colors.accent, colors.accentLight],
      change: "+25%",
    },
    {
      icon: "💬",
      label: "Community Posts",
      value: stats.communityPosts,
      gradient: [colors.info, colors.infoLight],
      change: "+15%",
    },
    {
      icon: "📅",
      label: "Events",
      value: stats.events,
      gradient: [colors.success, colors.successLight],
      change: "+5%",
    },
    {
      icon: "👨‍⚕️",
      label: "Doctors",
      value: stats.doctors,
      gradient: [colors.warning, colors.warningLight],
      change: "New",
    },
    {
      icon: "📚",
      label: "Articles",
      value: stats.articles,
      gradient: [colors.secondaryDark, colors.secondary],
      change: "+3",
    },
    {
      icon: "💭",
      label: "Feedback",
      value: stats.feedback,
      gradient: [colors.primaryDark, colors.primary],
      change: "New",
    },
  ];

  return (
    <div>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <Subtitle>Overview of your platform metrics and KPIs</Subtitle>
      </DashboardHeader>

      <Section>
        <KPIGrid>
          {kpiData.map((kpi, index) => (
            <KPICard key={index} gradient={kpi.gradient}>
              <KPIIcon>{kpi.icon}</KPIIcon>
              <KPIValue gradient={kpi.gradient}>
                {loading ? "..." : kpi.value.toLocaleString()}
              </KPIValue>
              <KPILabel gradient={kpi.gradient}>{kpi.label}</KPILabel>
              <KPIChange>
                <span>📈</span>
                <span>{kpi.change}</span>
              </KPIChange>
            </KPICard>
          ))}
        </KPIGrid>
      </Section>

      <Section>
        <SectionTitle>
          <span>🔌</span>
          System Status
        </SectionTitle>
        <ChartCard>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "0.5rem", color: colors.primary }}>
                API Server
              </h3>
              <StatusBadge status={stats.apiStatus}>
                <StatusDot status={stats.apiStatus} />
                {stats.apiStatus === "online" ? "Operational" : "Offline"}
              </StatusBadge>
            </div>
            <Button size="small" onClick={fetchStats} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </ChartCard>
      </Section>

      <Section>
        <SectionTitle>
          <span>⚡</span>
          Quick Actions
        </SectionTitle>
        <QuickActions>
          <ActionButton onClick={() => (window.location.href = "/admin")}>
            Manage Doctors
          </ActionButton>
          <ActionButton onClick={() => (window.location.href = "/admin")}>
            Add Article
          </ActionButton>
          <ActionButton onClick={() => (window.location.href = "/welcome")}>
            View Feedback
          </ActionButton>
          <ActionButton onClick={() => (window.location.href = "/users")}>
            View Users
          </ActionButton>
        </QuickActions>
      </Section>
    </div>
  );
}
