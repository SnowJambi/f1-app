import { Link } from "react-router-dom";
import './styles/reset.scss';
import './styles/App.scss';

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
        {/* <Link to="/drivers">Drivers</Link> |{" "} */}
        <Link to="/schedule">Schedule</Link>
      </nav>
    </div>
  );
}
