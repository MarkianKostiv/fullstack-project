import React, { useState } from "react";
import { updateUser } from "../api/userApi";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

interface UserFormUpdateProps {
  user: {
    id: number;
    email: string;
    phoneNumber: string;
  };
}

const UserFormUpdate: React.FC<UserFormUpdateProps> = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [password, setPassword] = useState(user.phoneNumber || "");
  const { setUser } = useContext(AuthContext)!;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const updatedUser: any = await updateUser(user.id.toString(), {
        email,
        phoneNumber,
        password,
      });

      setUser(updatedUser);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Failed to update user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type='tel'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Password:: </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Update User</button>
    </form>
  );
};

export default UserFormUpdate;
