// src/components/FighterList.tsx
import React, { useState, useEffect } from "react";
import { getFighters, deleteFighter, updateFighter } from "../api/fighterApi";
import { toast } from "react-toastify";

const FighterList: React.FC = () => {
  const [fighters, setFighters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFighter, setSelectedFighter] = useState<any | null>(null);

  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const fetchedFighters = await getFighters();
        setFighters(fetchedFighters);
      } catch (error) {
        setError("Failed to fetch fighters");
        toast.error("Failed to fetch fighters");
      }
    };
    fetchFighters();
  }, []);

  const handleUpdateFighter = async (updatedFighter: any) => {
    try {
      const response = await updateFighter(updatedFighter.id, updatedFighter);
      if (response.error) {
        console.error(response.message);
        toast.error(response.message);
      } else {
        const updatedFighters = fighters.map((fighter) =>
          fighter.id === updatedFighter.id ? updatedFighter : fighter
        );
        setFighters(updatedFighters);
        setSelectedFighter(null);
        toast.success("Fighter updated successfully");
      }
    } catch (error) {
      console.error("Failed to update fighter", error);
      toast.error("Failed to update fighter");
    }
  };

  const handleDeleteFighter = async (id: number) => {
    try {
      const response = await deleteFighter(id);
      if (response && response.message) {
        console.error(response.message);
        toast.error(response.message);
      } else {
        setFighters(fighters.filter((fighter) => fighter.id !== id));
        toast.success("Fighter deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete fighter", error);
      toast.error("Failed to delete fighter");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Fighter List</h2>
      <ul>
        {fighters.map((fighter) => (
          <li
            key={fighter.id}
            className='border rounded p-4 mb-4'
          >
            <h3 className='text-xl font-bold'>{fighter.name}</h3>
            <p>Power: {fighter.power}</p>
            <p>Defense: {fighter.defense}</p>
            <p>Health: {fighter.health}</p>
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4'
              onClick={() => setSelectedFighter(fighter)}
            >
              Update
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleDeleteFighter(fighter.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedFighter && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Update Fighter</h2>
          <div className='mb-4'>
            <input
              type='text'
              className='border rounded w-full py-2 px-3'
              value={selectedFighter.name}
              onChange={(e) =>
                setSelectedFighter({ ...selectedFighter, name: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='number'
              className='border rounded w-full py-2 px-3'
              value={selectedFighter.power}
              onChange={(e) =>
                setSelectedFighter({
                  ...selectedFighter,
                  power: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='number'
              className='border rounded w-full py-2 px-3'
              value={selectedFighter.defense}
              onChange={(e) =>
                setSelectedFighter({
                  ...selectedFighter,
                  defense: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='number'
              className='border rounded w-full py-2 px-3'
              value={selectedFighter.health}
              onChange={(e) =>
                setSelectedFighter({
                  ...selectedFighter,
                  health: parseInt(e.target.value),
                })
              }
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={() => handleUpdateFighter(selectedFighter)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FighterList;
