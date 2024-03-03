import "./Navbar.css";
// import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOP HERE</p>
      </div>
      <img className="nav-profile" src={navProfile} alt="" />
    </div>
  );
};

export default Navbar;
