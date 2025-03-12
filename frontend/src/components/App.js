import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignUpPage from "../pages/SignUpPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LogoutPage from "../pages/LogoutPage";
import {
  Alert,
  AppBar,
  Button,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import authStore from "../stores/authStore";
import { useState } from "react";

function App() {
  const store = authStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSuccessNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: '"Roboto", "Arial", sans-serif',
                fontWeight: "bold",
                fontSize: "1.5rem",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span role="img" aria-label="notebook">
                📝
              </span>
              Notify
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {!store.loggedIn && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage showSuccessNotification={showSuccessNotification} />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUpPage showSuccessNotification={showSuccessNotification} />
            }
          />
          <Route
            path="/logout"
            element={
              <LogoutPage showSuccessNotification={showSuccessNotification} />
            }
          />
        </Routes>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
