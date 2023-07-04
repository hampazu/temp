import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      setError(true);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div>
      <div className="LoginForm LoginFormPosition">
        <h2 className="LoginFormHeading">Login:</h2>
        <div className="LoginFormComponentsPosition">
          <form onSubmit={onSubmit}>
            <div className="InputTextAreaPosition">
              <label htmlFor="email" className="LoginLabel">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                className="form-control InputTextArea "
                placeholder="Enter Email"
                onChange={onChange}
                required
              />
            </div>
            <div className="InputTextAreaPosition">
              <label htmlFor="password" className="LoginLabel">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="form-control InputTextArea "
                placeholder="Enter Password"
                onChange={onChange}
                required
              />
            </div>
            <div>
              {error && <h6 className="text-light Link">Error Logging in</h6>}
              <button className="btn btn-light text-success">Submit</button>
            </div>
          </form>
          <div>
            <Link to="/register" className="text-light Link RegisterBtn">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
