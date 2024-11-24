import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [notAssignedTasks, setNotAssignedTasks] = useState([
    { id: 1, name: "Task 1", assignedTo: null },
    { id: 2, name: "Task 2", assignedTo: null },
    { id: 3, name: "Task 3", assignedTo: null },
  ]);

  const [colleagues] = useState(["Alice", "Bob", "Charlie"]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAddTask = () => {
    const newTaskId = Math.max(0, ...notAssignedTasks.map((t) => t.id)) + 1;
    const newTask = { id: newTaskId, name: `New Task ${newTaskId}`, assignedTo: null };
    setNotAssignedTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteTask = () => {
    setNotAssignedTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
    setAssignedTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
    setIsDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setTaskName(task.name);
    setAssignedTo(task.assignedTo || "");
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    const updatedTask = { ...currentTask, name: taskName, assignedTo };

    setNotAssignedTasks((prev) => prev.filter((task) => task.id !== currentTask.id));
    setAssignedTasks((prev) => [...prev, updatedTask]);

    setIsModalOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{getGreeting()} :) </h1>
      <p className="mb-6">
        Manage tasks by editing and assigning them to team members.
      </p>

      <div className="grid grid-cols-2 gap-6">
        <TaskColumn
          title="Not Assigned Tasks"
          tasks={notAssignedTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onAddTask={handleAddTask}
          isEditable
        />
        <TaskColumn
          title="Assigned Tasks"
          tasks={assignedTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Task Name</label>
                <input
                  type="text"
                  className="border px-4 py-2 w-full rounded"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Assign To</label>
                <select
                  className="border px-4 py-2 w-full rounded"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <option value="">--Select a colleague--</option>
                  {colleagues.map((colleague) => (
                    <option key={colleague} value={colleague}>
                      {colleague}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">CONFIRM DELETE</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmDeleteTask}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskColumn = ({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  isEditable,
}) => {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded relative">
      <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
        {title}
        {isEditable && (
          <FaPlus className="mr-3 text-2xl hover:bg-gray-200 cursor-pointer rounded" onClick={onAddTask}/>

        )}
      </h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
      </ul>
    </div>
  );
};

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="relative flex items-center group">
      <li
        className="p-2 bg-white border border-gray-300 rounded shadow flex-grow w-32 cursor-pointer hover:bg-gray-200"
        onClick={() => onEdit(task)}
      >
        <span className="px-2">{task.name}</span>
      </li>

      <MdDeleteOutline
        className="ml-3 text-4xl hover:text-red-600 hover:bg-red-100 rounded-full p-1 cursor-pointer transition"
        onClick={() => onDelete(task.id)}
      />
    </div>
  );
};

export default Dashboard;
