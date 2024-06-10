// src/components/UserDeleteButton.tsx
import React, { useState } from "react";
import { deleteUser } from "../api/userApi";

interface Props {
  userId: string;
  onSuccess: () => void;
}

const UserDeleteButton: React.FC<Props> = ({ userId, onSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      onSuccess();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default UserDeleteButton;
