import AppRoutes from "./routes/AppRoutes";
import SessionTimeout from "./pages/SessionTimeout/SessionTimeout";

function App() {
    const handleSessionTimeout = () => {
    localStorage.removeItem("User");

    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <>
      <SessionTimeout
        timeout={15 * 60 * 1000}
        onTimeout={handleSessionTimeout}
      />

      <AppRoutes />
    </>
  );
}

export default App;