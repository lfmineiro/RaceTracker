import { LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserInfo = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    signOut();
    navigate('/login');
  };
  return (
    <div className="p-4 space-y-2">
        <button 
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-slate-700 transition-colors text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut size={18} />
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-slate-400 text-xs">{user?.email}</p>
              </div>
          </button>
      </div>
  )
}

export default UserInfo