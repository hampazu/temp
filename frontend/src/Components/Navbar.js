import React from "react";
import "../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [hamburger, sethamburger] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <div className="Navbar">
        <h1 className="NavHeadingText">Bolo</h1>
      </div>
      {/* <label className="hamburger-menu">
        <input type="checkbox" />
      </label> */}
      <div className="sidebar-menu">
        <Link to="/">
          <div className="sidebar-menu-option">
            <p className="sidebar-menu-option-text">Home</p>
          </div>
        </Link>
        <Link to="/record">
          <div className="sidebar-menu-option">
            <p className="sidebar-menu-option-text">Practice</p>
          </div>
        </Link>
        <Link to="/play">
          <div className="sidebar-menu-option">
            <p className="sidebar-menu-option-text">Play</p>
          </div>
        </Link>
        {user === null ? (
          <Link to="/login">
            <div className="sidebar-menu-option">
              <p className="sidebar-menu-option-text">Login</p>
            </div>
          </Link>
        ) : (
          <Link to="/dashboard">
            <div className="sidebar-menu-option">
              <p className="sidebar-menu-option-text">{user.name}</p>
            </div>
          </Link>
        )}
        {user !== null && (
          <Link to="/dashboard">
            <div className="sidebar-menu-option">
              <p className="sidebar-menu-option-text" onClick={onLogout}>
                Logout
              </p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
