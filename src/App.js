import AppRouter from "./routers/AppRouter";
import AuthProvider from "./auth/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
