import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "./Pages/Side";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route path="/dashboard" element={<SideBar />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
