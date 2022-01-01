import { useEffect, useState } from "react";
import "./App.css";
import { LoginForm, Main } from "./components";
import { ApiErrors, apiFetch } from "./utils/api";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    apiFetch("/me")
      .then((user) => setUser(user))
      .catch((err) => {
        setUser(false);
      });
  }, []);
  if (user === null) {
    return null;
  }
  return user ? (
    <div>
      <Main />
    </div>
  ) : (
    <LoginForm onConnect={setUser} />
  );
}

export default App;
