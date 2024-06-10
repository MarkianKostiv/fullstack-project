import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddFighterForm from "../components/AddFighterForm";
import FighterList from "../components/FighterList";
import AuthContext from "../contexts/AuthContext";
import { deleteUser } from "../api/userApi";
import UserFormUpdate from "../components/UserFormUpdate";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, user }: any =
    useContext(AuthContext)!;
  const navigate = useNavigate();

  if (!user) {
    return (
      <div>
        <p>You need to be logged in to see the fighters and add new ones.</p>
        <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(user.id.toString());
      if (response) {
        console.log("User deleted successfully");
        setUser(null);
        setIsLoggedIn(false);
        toast.success("User deleted successfully");
        navigate("/login");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn ? (
        <>
          <AddFighterForm />
          <FighterList />
          <div className='mt-8'>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4'
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
              onClick={handleDeleteUser}
            >
              Delete Account
            </button>
          </div>
          <div className='mt-8'>
            <UserFormUpdate user={user} />
          </div>
        </>
      ) : (
        <div>
          <p>You need to be logged in to see the fighters and add new ones.</p>
          <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
