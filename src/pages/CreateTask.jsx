import { useState } from "react";
import axios from "axios";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription || !mobile || !dateTime) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token"); // Get Token from Local Storage

    let inputDate = new Date(dateTime);

    // Add 5 hours 30 minutes to get IST
    inputDate.setHours(inputDate.getHours() + 5);
    inputDate.setMinutes(inputDate.getMinutes() + 30);

    const taskData = {
      title: taskName,
      description: taskDescription,
      phoneNumber: mobile,
      date: inputDate.toISOString(), // Store in correct IST format
    };

    try {
      setLoading(true);
      await axios.post(
        "https://ai-receptionist-backend.onrender.com/api/tasks",
        taskData,
        {
          headers: {
            Authorization: `${token}`, // Include Token in Header
            "Content-Type": "application/json",
          },
        }
      );

      alert("Task Created Successfully");
      setTaskName("");
      setTaskDescription("");
      setMobile("");
      setDateTime("");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter task name..."
          />
        </div>

        <div>
          <label className="block text-gray-700">Task Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter task description..."
          />
        </div>

        <div>
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter mobile number..."
          />
        </div>

        <div>
          <label className="block text-gray-700">Due Date & Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
