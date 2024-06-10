// src/components/AddFighterForm.tsx
import React, { useState } from "react";
import { addFighter } from "../api/fighterApi";
import { toast } from "react-toastify";

const AddFighterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [power, setPower] = useState<number>(0);
  const [defense, setDefense] = useState<number>(0);
  const [health, setHealth] = useState<number>(0);

  const handleAddFighter = async () => {
    try {
      const response = await addFighter({ name, power, defense, health });
      if (response.error) {
        console.error(response.message);
        toast.error(response.message);
      } else {
        console.log("Fighter added successfully", response);
        toast.success("Fighter added successfully");
      }
    } catch (error) {
      console.error("Failed to add fighter:", error);
      toast.error("Failed to add fighter");
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white rounded p-8 shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Add Fighter</h2>
      <div className='mb-4'>
        <input
          type='text'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <input
          type='number'
          className='border rounded w-full py-2 px-3'
          placeholder='Power'
          value={power}
          onChange={(e) => setPower(parseInt(e.target.value))}
        />
      </div>
      <div className='mb-4'>
        <input
          type='number'
          className='border rounded w-full py-2 px-3'
          placeholder='Defense'
          value={defense}
          onChange={(e) => setDefense(parseInt(e.target.value))}
        />
      </div>
      <div className='mb-4'>
        <input
          type='number'
          className='border rounded w-full py-2 px-3'
          placeholder='Health'
          value={health}
          onChange={(e) => setHealth(parseInt(e.target.value))}
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        onClick={handleAddFighter}
      >
        Add Fighter
      </button>
    </div>
  );
};

export default AddFighterForm;
