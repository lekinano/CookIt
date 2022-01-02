import { useEffect, useState } from "react";
import "./App.css";
import { LoginForm, Main } from "./components";
import { ApiErrors, apiFetch } from "./utils/api";
function App() {
  const [user, setUser] = useState(null);
  /* UseEffect -> Fetch une seul fois /me à la monté du composant pour vérifier si le cookie est tjrs valide
   * Sinon le state user change via le LoginForm et OnConnect
   * */
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
