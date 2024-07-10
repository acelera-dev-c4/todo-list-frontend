import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import Logo from '../../assets/acelera_dev.png';
import { AccountCircle, ExitToApp, NotificationAdd } from '@mui/icons-material';
import NotificationModal from "../Modal";
import api from '../../api';

interface Notification {
  id: number;
  subscriptionId: number;
  message: string;
  readed: boolean;
  userId: number;
}

interface AuthData {
  userData: {
    id: number;
    name: string;
    email: string;
  };
  logout: () => void;
}

const Navbar = () => {
  const { userData, logout }: AuthData = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api('get', `/Notification/${userData.id}`, '', 'notification');
        setNotifications(response.data.sort((a: Notification, b: Notification) => b.id - a.id));
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    if (showModal) {
      fetchNotifications();
    }
  }, [showModal, userData.id]);


  return (
    <nav className="bg-slate-800 border-b-8 border-blue-400 p-0 m-0 h-16 fixed top-0 w-full flex flex-row justify-between">
      <div className="w-44 flex items-center justify-center bg-white rounded-tr-3xl border-r-8 border-blue-400 rounded-br-full h-full">
        <a href="index.php">
          <img src={Logo} alt="Logo" className="w-1/2 mx-auto" />
        </a>
      </div>
      <div className="flex items-center mr-8">
        <NotificationAdd className="text-yellow-400 mr-4 cursor-pointer" onClick={() => setShowModal(true)} />
        <AccountCircle className="text-green-400" />
        <span className="text-white p-4">{userData.name}</span>
        <button
          type="button"
          onClick={logout}
          className="text-white hover:text-slate-100 cursor-pointer"
          title="Logout"
        >
          <ExitToApp />
        </button>
      </div>
      <NotificationModal notifications={notifications} isOpen={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
};

export default Navbar;