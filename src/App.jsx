import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./theme/globalStyles";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Kids from "./pages/Kids";
import ApiTest from "./pages/ApiTest";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/api-test" element={<ApiTest />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
