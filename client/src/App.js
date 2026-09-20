import AppRoutes from "./routes/AppRoutes";
import SessionTimeout from "./pages/SessionTimeout/SessionTimeout";
import "./App.css";

const App = () => {
  const handleSessionTimeout = () => {
    localStorage.removeItem("User");

    // Redirect to login
    window.location.href = "/login";
  };

  const isLoginPage = window.location.pathname === "/login" || window.location.pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <SessionTimeout
          timeout={30 * 60 * 1000}
          onTimeout={handleSessionTimeout}
        />
      )}

      <AppRoutes />
    </>
  );
}

export default App;