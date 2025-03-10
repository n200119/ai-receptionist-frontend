import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskHistory() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://ai-receptionist-backend.onrender.com/api/tasks",
        {
          headers: { Authorization: `${token}` },
        }
      );

      // Get current date and time
      const currentDate = new Date();

      // Filter only past tasks
      const pastTasks = response.data.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate < currentDate; // Show only past tasks
      });

      setTasks(pastTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch task history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task History</h1>

      {loading && <div className="text-center text-blue-500">Loading...</div>}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No past tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="p-4 border rounded bg-gray-100">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-500">Completed On: {task.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
