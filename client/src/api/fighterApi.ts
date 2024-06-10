const API_URL = "http://localhost:3002/api";

interface Fighter {
  id: number;
  name: string;
  power: number;
  defense: number;
  health: number;
  error?: boolean;
  message?: string;
}

interface FightersResponse {
  error?: boolean;
  message?: string;
  fighters?: Fighter[];
}

export const getFighters = async (): Promise<Fighter[]> => {
  const response = await fetch(`${API_URL}/fighters`);
  console.log(response);
  if (!response.ok) {
    console.error(
      "Failed to fetch fighters",
      response.status,
      response.statusText
    );
    throw new Error("Failed to fetch fighters");
  }
  const data = await response.json();
  console.log(data); // Переконайтеся, що data - це масив файтерів
  return data;
};

export const addFighter = async (
  fighter: Omit<Fighter, "id">
): Promise<Fighter> => {
  const response = await fetch(`${API_URL}/fighters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fighter),
  });
  return response.json();
};

export const updateFighter = async (
  id: number,
  data: Partial<Fighter>
): Promise<Fighter> => {
  const response = await fetch(`${API_URL}/fighters/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteFighter = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/fighters/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error(
      "Failed to delete fighter",
      response.status,
      response.statusText
    );
    throw new Error("Failed to delete fighter");
  }

  return { message: "Fighter deleted successfully" };
};
