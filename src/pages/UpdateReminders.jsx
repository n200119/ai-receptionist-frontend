import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateReminders() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

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
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ai-receptionist-backend.onrender.com/api/tasks/${id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      alert("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const markAsComplete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      // Get the current date & time in YYYY-MM-DD HH:MM format
      const currentDateTime = new Date().toISOString().slice(0, 16);
      await axios.put(
        `https://ai-receptionist-backend.onrender.com/api/tasks/${id}`,
        { date: currentDateTime },
        { headers: { Authorization: `${token}` } }
      );
      alert("Task marked as complete");
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as complete:", error);
      alert("Failed to mark as complete");
    } finally {
      setLoading(false);
      setSelectedTask(null);
    }
  };

  const updateDueDate = async () => {
    if (!newDate || !selectedTask) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `https://ai-receptionist-backend.onrender.com/api/tasks/${selectedTask}`,
        { date: newDate },
        { headers: { Authorization: `${token}` } }
      );
      alert("Due date updated");
      setSelectedTask(null);
      setNewDate("");
      fetchTasks();
    } catch (error) {
      console.error("Error updating due date:", error);
      alert("Failed to update due date");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Reminders</h1>

      {loading && <div className="text-center text-blue-500">Loading...</div>}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500">Due Date: {task.date}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => setConfirmDelete(task._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => setSelectedTask(task._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Popup */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedTask(null)}
            >
              ✖
            </button>
            <button
              className="w-full bg-green-500 text-white p-2 rounded mb-3"
              onClick={() => markAsComplete(selectedTask)}
            >
              Mark as Complete
            </button>
            <div>
              <label className="block text-gray-700">Update Due Date</label>
              <input
                type="datetime-local"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white p-2 rounded mt-3"
              onClick={updateDueDate}
            >
              Update Due Date
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteTask(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
