import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./register.scss";
import handleRq from "../../helpers/handleRq";

import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(true);

  const showHide = () => setEye((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit form handler
  const onSubmit = async data => {
    setLoading(true);
    try {
      const user = await handleRq("post", "auth/register", data, "");
      login(user);
      toast.success(`Welcome ${user.username}`);
      navigate(`/`);
    } catch (error) {
      toast.error(error.response?.data)
    } finally { setLoading(false); }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Abdo Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input type="text" placeholder="User Name" id="username" {...register('username', { required: true })} />
            </div>
            <div>
              <input type="text" placeholder="Email" id="email" {...register('email', { required: true })} />
            </div>
            <div className="password">
              <input type={eye ? "password" : "text"} placeholder="Password" id="password"{...register('password', { required: true })} />
              {eye ? <RemoveRedEyeOutlinedIcon onClick={showHide} /> : <VisibilityOffOutlinedIcon onClick={showHide} />}
            </div>
            <button type="submit">Register{loading && <CircularProgress />}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
