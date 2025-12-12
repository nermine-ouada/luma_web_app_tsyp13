import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./theme/globalStyles";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import ApiTest from "./pages/ApiTest";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/welcome"
            element={
              <Layout>
                <Welcome />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/api-test"
            element={
              <Layout>
                <ApiTest />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
