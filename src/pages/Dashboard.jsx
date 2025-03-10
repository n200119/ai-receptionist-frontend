import { useState } from "react";
import CreateTask from "../pages/CreateTask";
import UpdateReminders from "../pages/UpdateReminders";
import TaskHistory from "../pages/TaskHistory";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("create-task");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT Token
    navigate("/"); // Redirect to Login Page
  };

  // Function to render the correct component
  const renderComponent = () => {
    switch (activeComponent) {
      case "create-task":
        return <CreateTask />;
      case "update-reminders":
        return <UpdateReminders />;
      case "task-history":
        return <TaskHistory />;
      default:
        return <CreateTask />; // Default page
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold">Amego</div>
        <div className="text-lg">Welcome to your Dashboard</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <ul>
            <li
              className={`p-2 rounded cursor-pointer ${activeComponent === "create-task" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveComponent("create-task")}
            >
              Create Task
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${activeComponent === "update-reminders" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveComponent("update-reminders")}
            >
              Update Reminders
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${activeComponent === "task-history" ? "bg-gray-700" : ""}`}
              onClick={() => setActiveComponent("task-history")}
            >
              Task History
            </li>
          </ul>
        </div>

        {/* Main Content - Dynamically Rendered Component */}
        <div className="w-3/4 p-6">{renderComponent()}</div>
      </div>
    </div>
  );
}
