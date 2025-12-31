
document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const todoList = document.getElementById("todoList");
  const deleteDoneTasks = document.getElementById("deleteDoneTasks");
  const deleteAllTasks = document.getElementById("deleteAllTasks");
  const allTasksButton = document.getElementById("allTasks");
  const doneTasksButton = document.getElementById("doneTasks");
  const todoTasksButton = document.getElementById("todoTasks");

  const editPopup = document.getElementById("editPopup");
  const modalInput = document.getElementById("modalInput");
  const modalError = document.getElementById("modalError");
  const saveButton = document.getElementById("saveButton");
  const cancelButton = document.getElementById("cancelButton");

  const errorMessage = document.getElementById("error-message");

  // Confirm modal elements
  const confirmPopup = document.getElementById("confirmPopup");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

 
  // Initial render when page opens
  renderTasks();
});
 