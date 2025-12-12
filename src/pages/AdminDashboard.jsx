import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../theme/colors";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  doctorsAPI,
  articlesAPI,
  feedbackAPI,
  usersAPI,
  eventsAPI,
  gameProgressAPI,
  communityAPI,
} from "../services/api";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid ${colors.borderLight};
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? colors.primary : "transparent")};
  color: ${(props) =>
    props.active ? colors.primary : colors.textSecondaryLight};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${colors.primary};
  }
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: ${colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px ${colors.shadowLight};

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${colors.borderLight};
  }

  th {
    background: linear-gradient(
      135deg,
      ${colors.primary} 0%,
      ${colors.primaryLight} 100%
    );
    color: ${colors.white};
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: ${colors.greyLight + "40"};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    ${colors.white} 0%,
    ${colors.backgroundLight} 100%
  );
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${colors.white} 0%,
    ${colors.backgroundLight} 100%
  );
  border: 2px solid ${colors.borderLight};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-4px);
  }

  h3 {
    color: ${colors.primary};
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0.75rem 0;
  }

  p {
    color: ${colors.textSecondaryLight};
    margin: 0;
    font-weight: 500;
  }
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LocationCard = styled(Card)`
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    ${colors.white} 0%,
    ${colors.backgroundLight} 100%
  );
  border: 2px solid ${colors.borderLight};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 8px 24px ${colors.shadowLight};
  }
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${colors.borderLight};

  h3 {
    color: ${colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.backgroundLight};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 3px;
  }
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${colors.white};
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.backgroundLight};
    border-color: ${colors.primary};
    transform: translateX(4px);
  }
`;

const LocationName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;

  span {
    font-size: 1.5rem;
  }

  strong {
    color: ${colors.textPrimaryLight};
    font-weight: 600;
    font-size: 1rem;
  }
`;

const LocationCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CountBadge = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryLight} 100%
  );
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1rem;
  min-width: 50px;
  text-align: center;
  box-shadow: 0 2px 8px ${colors.shadowLight};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${colors.greyLight};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${colors.primary} 0%,
    ${colors.accent} 100%
  );
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${(props) => props.percentage}%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.textSecondaryLight};

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${colors.borderLight};

  h2 {
    margin: 0;
    color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${colors.borderLight};
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [doctors, setDoctors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formType, setFormType] = useState(null); // "doctor", "article", "feedback"
  const [citiesData, setCitiesData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);

  // Form states
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    titleEn: "",
    author: "",
    content: "",
    contentEn: "",
    summary: "",
    summaryEn: "",
    category: "General",
    categoryFr: "",
    tags: "",
    tagsEn: "",
    readTime: "",
    source: "",
    link: "",
    likes: 0,
    comments: 0,
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "doctors") {
        const res = await doctorsAPI.getAll();
        setDoctors(res.data.data || []);
      } else if (activeTab === "articles") {
        const res = await articlesAPI.getAll();
        setArticles(res.data.data || []);
      } else if (activeTab === "feedback") {
        const res = await feedbackAPI.getAll();
        setFeedback(res.data.data || []);
      } else if (activeTab === "overview") {
        await fetchOverviewStats();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverviewStats = async () => {
    try {
      const [
        usersRes,
        eventsRes,
        gameProgressRes,
        communityRes,
        feedbackRes,
        doctorsRes,
        articlesRes,
      ] = await Promise.all([
        usersAPI.getAll().catch(() => ({ data: { count: 0, data: [] } })),
        eventsAPI.getAll().catch(() => ({ data: { count: 0 } })),
        gameProgressAPI.getAll().catch(() => ({ data: { count: 0 } })),
        communityAPI.getAll().catch(() => ({ data: { count: 0 } })),
        feedbackAPI.getAll().catch(() => ({ data: { count: 0 } })),
        doctorsAPI.getAll().catch(() => ({ data: { count: 0 } })),
        articlesAPI.getAll().catch(() => ({ data: { count: 0 } })),
      ]);

      const users = usersRes.data.data || [];
      const totalUsers = usersRes.data.count || users.length || 0;

      setStats({
        users: totalUsers,
        events: eventsRes.data.count || eventsRes.data.data?.length || 0,
        gameProgress:
          gameProgressRes.data.count || gameProgressRes.data.data?.length || 0,
        communityPosts:
          communityRes.data.count || communityRes.data.data?.length || 0,
        feedback: feedbackRes.data.count || feedbackRes.data.data?.length || 0,
        doctors: doctorsRes.data.count || doctorsRes.data.data?.length || 0,
        articles: articlesRes.data.count || articlesRes.data.data?.length || 0,
      });

      // Aggregate users by city
      const cityMap = new Map();
      users.forEach((user) => {
        const city = user.city || "Unknown";
        cityMap.set(city, (cityMap.get(city) || 0) + 1);
      });
      const cities = Array.from(cityMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 cities
      setCitiesData(cities);

      // Aggregate users by country
      const countryMap = new Map();
      users.forEach((user) => {
        const country = user.country || "Unknown";
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      });
      const countries = Array.from(countryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      setCountriesData(countries);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await doctorsAPI.update(editingItem._id, doctorForm);
      } else {
        await doctorsAPI.create(doctorForm);
      }
      setDoctorForm({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        notes: "",
      });
      setEditingItem(null);
      setShowFormModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert(error.response?.data?.error || "Error saving doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const articleData = {
        ...articleForm,
        tags: articleForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        tagsEn: articleForm.tagsEn
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        likes: parseInt(articleForm.likes) || 0,
        comments: parseInt(articleForm.comments) || 0,
      };
      if (editingItem) {
        await articlesAPI.update(editingItem._id, articleData);
      } else {
        await articlesAPI.create(articleData);
      }
      setArticleForm({
        title: "",
        titleEn: "",
        author: "",
        content: "",
        contentEn: "",
        summary: "",
        summaryEn: "",
        category: "General",
        categoryFr: "",
        tags: "",
        tagsEn: "",
        readTime: "",
        source: "",
        link: "",
        likes: 0,
        comments: 0,
      });
      setEditingItem(null);
      setShowFormModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving article:", error);
      alert(error.response?.data?.error || "Error saving article");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      if (type === "doctor") {
        await doctorsAPI.delete(id);
      } else if (type === "article") {
        await articlesAPI.delete(id);
      } else if (type === "feedback") {
        await feedbackAPI.delete(id);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
      alert(error.response?.data?.error || "Error deleting item");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type) => {
    setFormType(type);
    setEditingItem(null);
    if (type === "doctor") {
      setDoctorForm({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        notes: "",
      });
    } else if (type === "article") {
      setArticleForm({
        title: "",
        titleEn: "",
        author: "",
        content: "",
        contentEn: "",
        summary: "",
        summaryEn: "",
        category: "General",
        categoryFr: "",
        tags: "",
        tagsEn: "",
        readTime: "",
        source: "",
        link: "",
        likes: 0,
        comments: 0,
      });
    }
    setShowFormModal(true);
  };

  const handleEdit = (type, item) => {
    setFormType(type);
    setEditingItem(item);
    if (type === "doctor") {
      setDoctorForm({
        name: item.name || "",
        specialty: item.specialty || "",
        phone: item.phone || "",
        email: item.email || "",
        address: item.address || "",
        city: item.city || "",
        notes: item.notes || "",
      });
    } else if (type === "article") {
      setArticleForm({
        title: item.title || "",
        titleEn: item.titleEn || "",
        author: item.author || "",
        content: item.content || "",
        contentEn: item.contentEn || "",
        summary: item.summary || "",
        summaryEn: item.summaryEn || "",
        category: item.category || "General",
        categoryFr: item.categoryFr || "",
        tags: item.tags?.join(", ") || "",
        tagsEn: item.tagsEn?.join(", ") || "",
        readTime: item.readTime || "",
        source: item.source || "",
        link: item.link || "",
        likes: item.likes || 0,
        comments: item.comments || 0,
      });
    }
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingItem(null);
    setFormType(null);
  };

  const handleViewArticle = (article) => {
    setModalContent(
      <div>
        <h2>{article.title}</h2>
        <p>
          <strong>Author:</strong> {article.author || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {article.category}
        </p>
        <p>
          <strong>Published:</strong>{" "}
          {new Date(article.publishedDate).toLocaleDateString()}
        </p>
        <div style={{ marginTop: "1rem" }}>
          <h3>Content:</h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              color: colors.textPrimaryLight,
            }}
          >
            {article.content}
          </div>
        </div>
        {article.link && (
          <p style={{ marginTop: "1rem" }}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              View Source
            </a>
          </p>
        )}
      </div>
    );
    setShowModal(true);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Admin Dashboard</Title>
        <Subtitle>Manage doctors, articles, and view platform data</Subtitle>
      </DashboardHeader>

      <TabsContainer>
        <Tab
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Tab>
        <Tab
          active={activeTab === "doctors"}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </Tab>
        <Tab
          active={activeTab === "articles"}
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </Tab>
        <Tab
          active={activeTab === "feedback"}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </Tab>
      </TabsContainer>

      {activeTab === "overview" && (
        <Section>
          <h2>Data Overview</h2>
          <StatsGrid>
            <StatCard>
              <p>Total Users</p>
              <h3>{stats.users || 0}</h3>
            </StatCard>
            <StatCard>
              <p>Events</p>
              <h3>{stats.events || 0}</h3>
            </StatCard>
            <StatCard>
              <p>Game Progress Records</p>
              <h3>{stats.gameProgress || 0}</h3>
            </StatCard>
            <StatCard>
              <p>Community Posts</p>
              <h3>{stats.communityPosts || 0}</h3>
            </StatCard>
            <StatCard>
              <p>Feedback Messages</p>
              <h3>{stats.feedback || 0}</h3>
            </StatCard>
          </StatsGrid>

          <LocationGrid>
            <LocationCard>
              <LocationHeader>
                <h3>
                  <span>🌍</span>
                  Users by Country
                </h3>
              </LocationHeader>
              {countriesData.length > 0 ? (
                <LocationList>
                  {countriesData.map((country, index) => {
                    const maxCount = Math.max(
                      ...countriesData.map((c) => c.count)
                    );
                    const percentage = (country.count / maxCount) * 100;
                    return (
                      <div key={index}>
                        <LocationItem>
                          <LocationName>
                            <span>📍</span>
                            <strong>{country.name}</strong>
                          </LocationName>
                          <LocationCount>
                            <CountBadge>{country.count}</CountBadge>
                          </LocationCount>
                        </LocationItem>
                        <ProgressBar>
                          <ProgressFill percentage={percentage} />
                        </ProgressBar>
                      </div>
                    );
                  })}
                </LocationList>
              ) : (
                <EmptyState>
                  <p>No country data available</p>
                </EmptyState>
              )}
            </LocationCard>

            <LocationCard>
              <LocationHeader>
                <h3>
                  <span>🏙️</span>
                  Top Cities
                </h3>
              </LocationHeader>
              {citiesData.length > 0 ? (
                <LocationList>
                  {citiesData.map((city, index) => {
                    const maxCount = Math.max(
                      ...citiesData.map((c) => c.count)
                    );
                    const percentage = (city.count / maxCount) * 100;
                    return (
                      <div key={index}>
                        <LocationItem>
                          <LocationName>
                            <span>🏘️</span>
                            <strong>{city.name}</strong>
                          </LocationName>
                          <LocationCount>
                            <CountBadge>{city.count}</CountBadge>
                          </LocationCount>
                        </LocationItem>
                        <ProgressBar>
                          <ProgressFill percentage={percentage} />
                        </ProgressBar>
                      </div>
                    );
                  })}
                </LocationList>
              ) : (
                <EmptyState>
                  <p>No city data available</p>
                </EmptyState>
              )}
            </LocationCard>
          </LocationGrid>

          <p style={{ color: colors.textSecondaryLight, marginTop: "2rem" }}>
            Note: Personal information (email, phone, address) of mothers is not
            displayed for privacy protection.
          </p>
        </Section>
      )}

      {activeTab === "doctors" && (
        <>
          <Section>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <SectionTitle>
                  <span>👨‍⚕️</span>
                  Doctor Contacts ({doctors.length})
                </SectionTitle>
                <Button onClick={() => handleAdd("doctor")}>
                  + Add Doctor
                </Button>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialty</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          style={{ textAlign: "center", padding: "2rem" }}
                        >
                          No doctors found. Click "Add Doctor" to create one.
                        </td>
                      </tr>
                    ) : (
                      doctors.map((doctor) => (
                        <tr key={doctor._id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.specialty}</td>
                          <td>{doctor.phone || "N/A"}</td>
                          <td>{doctor.email || "N/A"}</td>
                          <td>{doctor.city || "N/A"}</td>
                          <td>
                            <ActionButtons>
                              <Button
                                size="small"
                                variant="secondary"
                                onClick={() => handleEdit("doctor", doctor)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="danger"
                                onClick={() =>
                                  handleDelete("doctor", doctor._id)
                                }
                              >
                                Delete
                              </Button>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card>
          </Section>
        </>
      )}

      {activeTab === "articles" && (
        <>
          <Section>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <SectionTitle>
                  <span>📚</span>
                  Scientific Articles ({articles.length})
                </SectionTitle>
                <Button onClick={() => handleAdd("article")}>
                  + Add Article
                </Button>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{ textAlign: "center", padding: "2rem" }}
                        >
                          No articles found. Click "Add Article" to create one.
                        </td>
                      </tr>
                    ) : (
                      articles.map((article) => (
                        <tr key={article._id}>
                          <td>{article.title}</td>
                          <td>{article.author || "N/A"}</td>
                          <td>{article.category}</td>
                          <td>
                            {new Date(
                              article.publishedDate
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <ActionButtons>
                              <Button
                                size="small"
                                variant="secondary"
                                onClick={() => handleViewArticle(article)}
                              >
                                View
                              </Button>
                              <Button
                                size="small"
                                variant="secondary"
                                onClick={() => handleEdit("article", article)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="danger"
                                onClick={() =>
                                  handleDelete("article", article._id)
                                }
                              >
                                Delete
                              </Button>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card>
          </Section>
        </>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <Modal onClick={handleCloseFormModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {formType === "doctor" && (
              <>
                <ModalHeader>
                  <h2>{editingItem ? "Edit Doctor" : "Add New Doctor"}</h2>
                  <Button
                    size="small"
                    variant="secondary"
                    onClick={handleCloseFormModal}
                  >
                    ✕
                  </Button>
                </ModalHeader>
                <form onSubmit={handleDoctorSubmit}>
                  <FormGrid>
                    <Input
                      label="Name *"
                      value={doctorForm.name}
                      onChange={(e) =>
                        setDoctorForm({ ...doctorForm, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Specialty *"
                      value={doctorForm.specialty}
                      onChange={(e) =>
                        setDoctorForm({
                          ...doctorForm,
                          specialty: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      label="Phone"
                      value={doctorForm.phone}
                      onChange={(e) =>
                        setDoctorForm({ ...doctorForm, phone: e.target.value })
                      }
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={doctorForm.email}
                      onChange={(e) =>
                        setDoctorForm({ ...doctorForm, email: e.target.value })
                      }
                    />
                    <Input
                      label="Address"
                      value={doctorForm.address}
                      onChange={(e) =>
                        setDoctorForm({
                          ...doctorForm,
                          address: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="City"
                      value={doctorForm.city}
                      onChange={(e) =>
                        setDoctorForm({ ...doctorForm, city: e.target.value })
                      }
                    />
                  </FormGrid>
                  <Input
                    label="Notes"
                    type="textarea"
                    value={doctorForm.notes}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, notes: e.target.value })
                    }
                  />
                  <ActionButtons>
                    <Button type="submit" disabled={loading}>
                      {editingItem ? "Update" : "Add"} Doctor
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseFormModal}
                    >
                      Cancel
                    </Button>
                  </ActionButtons>
                </form>
              </>
            )}

            {formType === "article" && (
              <>
                <ModalHeader>
                  <h2>{editingItem ? "Edit Article" : "Add New Article"}</h2>
                  <Button
                    size="small"
                    variant="secondary"
                    onClick={handleCloseFormModal}
                  >
                    ✕
                  </Button>
                </ModalHeader>
                <form onSubmit={handleArticleSubmit}>
                  <FormGrid>
                    <Input
                      label="Title *"
                      value={articleForm.title}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      label="Title (English)"
                      value={articleForm.titleEn}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          titleEn: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Author"
                      value={articleForm.author}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          author: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Category"
                      type="select"
                      value={articleForm.category}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="General">General</option>
                      <option value="ADHD">ADHD</option>
                      <option value="Autism">Autism</option>
                      <option value="Down Syndrome">Down Syndrome</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Education">Education</option>
                      <option value="Research">Research</option>
                      <option value="Special Needs">Special Needs</option>
                      <option value="Mental Health">Mental Health</option>
                      <option value="Community">Community</option>
                      <option value="Wellness">Wellness</option>
                    </Input>
                    <Input
                      label="Category (French)"
                      value={articleForm.categoryFr}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          categoryFr: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Read Time (e.g., '8 min')"
                      value={articleForm.readTime}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          readTime: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Source"
                      value={articleForm.source}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          source: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Link"
                      type="url"
                      value={articleForm.link}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, link: e.target.value })
                      }
                    />
                    <Input
                      label="Likes"
                      type="number"
                      value={articleForm.likes}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          likes: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Comments"
                      type="number"
                      value={articleForm.comments}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          comments: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Tags (comma-separated)"
                      value={articleForm.tags}
                      onChange={(e) =>
                        setArticleForm({ ...articleForm, tags: e.target.value })
                      }
                    />
                    <Input
                      label="Tags (English, comma-separated)"
                      value={articleForm.tagsEn}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          tagsEn: e.target.value,
                        })
                      }
                    />
                  </FormGrid>
                  <Input
                    label="Summary"
                    type="textarea"
                    value={articleForm.summary}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        summary: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Summary (English)"
                    type="textarea"
                    value={articleForm.summaryEn}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        summaryEn: e.target.value,
                      })
                    }
                  />
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      Content *
                    </label>
                    <TextArea
                      value={articleForm.content}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          content: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      Content (English)
                    </label>
                    <TextArea
                      value={articleForm.contentEn}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          contentEn: e.target.value,
                        })
                      }
                    />
                  </div>
                  <ActionButtons>
                    <Button type="submit" disabled={loading}>
                      {editingItem ? "Update" : "Add"} Article
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCloseFormModal}
                    >
                      Cancel
                    </Button>
                  </ActionButtons>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {activeTab === "feedback" && (
        <Section>
          <Card>
            <SectionTitle>
              <span>💭</span>
              User Feedback ({feedback.length})
            </SectionTitle>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{ textAlign: "center", padding: "2rem" }}
                      >
                        No feedback found.
                      </td>
                    </tr>
                  ) : (
                    feedback.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name || "Anonymous"}</td>
                        <td>{item.email || "N/A"}</td>
                        <td>{item.subject}</td>
                        <td>
                          {item.rating
                            ? "★".repeat(item.rating) +
                              "☆".repeat(5 - item.rating)
                            : "N/A"}
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{item.isRead ? "Read" : "Unread"}</td>
                        <td>
                          <ActionButtons>
                            <Button
                              size="small"
                              variant="secondary"
                              onClick={() => {
                                setModalContent(
                                  <div>
                                    <h2>{item.subject}</h2>
                                    <p>
                                      <strong>From:</strong>{" "}
                                      {item.name || "Anonymous"}
                                    </p>
                                    <p>
                                      <strong>Email:</strong>{" "}
                                      {item.email || "N/A"}
                                    </p>
                                    <p>
                                      <strong>Rating:</strong>{" "}
                                      {item.rating
                                        ? "★".repeat(item.rating) +
                                          "☆".repeat(5 - item.rating)
                                        : "N/A"}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{" "}
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleString()}
                                    </p>
                                    <div style={{ marginTop: "1rem" }}>
                                      <h3>Message:</h3>
                                      <p
                                        style={{
                                          whiteSpace: "pre-wrap",
                                          lineHeight: "1.6",
                                        }}
                                      >
                                        {item.message}
                                      </p>
                                    </div>
                                  </div>
                                );
                                setShowModal(true);
                              }}
                            >
                              View
                            </Button>
                            {!item.isRead && (
                              <Button
                                size="small"
                                variant="success"
                                onClick={async () => {
                                  await feedbackAPI.markAsRead(item._id);
                                  fetchData();
                                }}
                              >
                                Mark Read
                              </Button>
                            )}
                            <Button
                              size="small"
                              variant="danger"
                              onClick={() => handleDelete("feedback", item._id)}
                            >
                              Delete
                            </Button>
                          </ActionButtons>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card>
        </Section>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {modalContent}
            <div style={{ marginTop: "1rem" }}>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
}
