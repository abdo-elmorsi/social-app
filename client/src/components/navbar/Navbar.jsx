import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import putData from "../../helpers/putData";
import { toast } from "react-toastify";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { logOut, currentUser } = useContext(AuthContext);


  const handleDarkMode = async () => {
    toggle();
    try {
      await putData(`users/${currentUser._id}`, { "darkMode": !darkMode, "userId": currentUser._id }, "");
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, darkMode: !darkMode }));

    } catch (error) {
      toast.error(error.response?.data)
    }
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Abdo-social</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={handleDarkMode} />
        ) : (
          <DarkModeOutlinedIcon onClick={handleDarkMode} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={currentUser.profilePicture}
            alt=""
          />
          <span onClick={logOut}>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
