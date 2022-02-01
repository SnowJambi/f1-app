import { Link } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/drivers">Drivers</Link> |{" "}
        <Link to="/tracks">Tracks</Link>
      </nav>
    </div>
  );
}
