import { useAuth } from "../../context/AuthContext";
import Logo from '../../assets/acelera_dev.png';
import { AccountCircle, ExitToApp, NotificationAdd } from '@mui/icons-material';

const Navbar = () => {
  const { userData, logout } = useAuth();

  return (
    <nav className="bg-slate-800 border-b-8 border-blue-400 p-0 m-0 h-16 fixed top-0 w-full flex flex-row justify-between">
      <div className="w-44 flex items-center justify-center bg-white rounded-tr-3xl border-r-8 border-blue-400 rounded-br-full h-full">
        <a href="index.php">
          <img src={Logo} alt="Logo" className="w-1/2 mx-auto" />
        </a>
      </div>
      <div className="flex items-center mr-8">
        <NotificationAdd className="text-yellow-400 mr-4" />
        <AccountCircle className="text-green-400" />
        <span className="text-white top-0 right-0 p-4">{userData.name}</span>
        <button
          type="button"
          onClick={logout}
          className="text-white hover:text-slate-100 cursor-pointer"
          title="Logout"
        >
          <ExitToApp />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;