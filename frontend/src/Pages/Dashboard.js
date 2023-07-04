import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="container">
        <div className="dashboard-menu">
          <Link to="/dashboard/view">
            <div className="dashboard-menu-option">
              <p className="dashboard-menu-option-text">View Recordings </p>
            </div>
          </Link>
          <Link to="/dashboard/create">
            <div className="dashboard-menu-option">
              <p className="dashboard-menu-option-text">Create Recordings</p>
            </div>
          </Link>
        </div>

        {children}
      </div>
    </> 
  );
}
