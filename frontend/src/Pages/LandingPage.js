import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/landingpage.css";

function LandingPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="landing-screen">
      <div className="landing-screen-bg"></div>
      <div className="landing-screen-img"></div>
      <div className="landing-screen-text-position1">
        <h1 className="landing-screen-heading">Who are we?</h1>
        <p className="landing-screen-description">
          Bolo provides an interactive learning experience to the user who will
          be able to practice speech phonetics by recording the sounds in wave
          forms.
        </p>
      </div>
      <div className="landing-screen-text-position2">
        <h1 className="landing-screen-heading">What is our price?</h1>
        <p className="landing-screen-description">We are absolutely free.</p>
      </div>
      <div className="landing-screen-text-position3">
        <h1 className="landing-screen-heading">What is our purpose?</h1>
        <p className="landing-screen-description">
          We want to provide platform to people who are speech impaired
        </p>
      </div>
      <div className="landing-screen-text-position4">
        <h1 className="landing-screen-heading">Explore our site:</h1>
        <Link to="/login" className="landing-screen-link">
          {user === null ? "Login" : user.name}
        </Link>
        <Link to="/record" className="landing-screen-link">
          Practice
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
