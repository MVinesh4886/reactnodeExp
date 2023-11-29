import logo from "./logo.svg";
import "./App.css";
// import "antd/dist/antd.css";
import { Button } from "antd";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <protectedRoute>
                <Home />
              </protectedRoute>
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function protectedRoute(props) {
  if (localStorage.getItem("Expenses - User")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
