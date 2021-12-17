import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import EventList from "./components/EventList/EventList";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import Header from "./components/Header/Header";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import NotificationProvider from "./context/NotificationContext";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <NotificationProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <EventList />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </LocalizationProvider>
  );
}
function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
export default App;
