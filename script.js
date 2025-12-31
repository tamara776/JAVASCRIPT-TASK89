
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


  // Load tasks from localStorage (or empty array)
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Index of task we are editing
  let currentEditIndex = null;

  // Current filter: "all" | "done" | "todo"
  let currentFilter = "all";

  // Function that will run when user clicks "Confirm"
  let confirmAction = null;


  // Save tasks to localStorage and re-render list
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  };

  // Render tasks according to the current filter
  const renderTasks = () => {
    todoList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "done") filteredTasks = tasks.filter(t => t.done);
    if (currentFilter === "todo") filteredTasks = tasks.filter(t => !t.done);

    filteredTasks.forEach(task => {
      // Get real index in the original array
      const index = tasks.indexOf(task);

      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <span class="todo-text ${task.done ? "completed" : ""}">
          ${task.name || task.text}
        </span>
        <div>
          <input type="checkbox" ${task.done ? "checked" : ""} data-index="${index}" />
          <i class="fa-solid fa-pen edit-btn" data-index="${index}"></i>
          <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
        </div>
      `;
      todoList.appendChild(li);
    });


// **************Delete one task***********************
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.onclick = e => {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        saveTasks();
      };
    });

    // *******************Checkbox change (done / not done)****************
    document.querySelectorAll("input[type=checkbox]").forEach(cb => {
      cb.onchange = e => {
        const index = e.target.dataset.index;
        tasks[index].done = e.target.checked;
        saveTasks();
      };
    });
  };
  // Add new task
  addTaskButton.onclick = () => {
    const value = taskInput.value.trim();

    // Simple validation: no empty, min 5 chars, no numbers
    if (!value || value.length < 5 || /\d/.test(value)) {
      errorMessage.textContent = "Task invalid (min 5 chars, no numbers)";
      return;
    }

    errorMessage.textContent = "";
    tasks.push({ name: value, done: false });
    taskInput.value = "";
    saveTasks();
  };

  // Save edited task name
  saveButton.

onclick = () => {
    const newName = modalInput.value.trim();

    // Simple validation for edit
    if (!newName || newName.length < 5 || /\d/.test(newName)) {
      modalError.textContent = "Task invalid (min 5 chars, no numbers)";
      return;
    }

    tasks[currentEditIndex].name = newName;
    editPopup.style.display = "none";
    saveTasks();
  };

  // Close edit modal without saving
  cancelButton.onclick = () => {
    editPopup.style.display = "none";
  };
    
  // Open confirm modal with custom title, message and action
  const openConfirm = (title, message, action) => {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmAction = action; // function to run when user clicks "Confirm"
    confirmPopup.style.display = "flex";
  };

  // Confirm Yes
  confirmYes.onclick = () => {
    if (typeof confirmAction === "function") {
      confirmAction();
    }
    confirmPopup.style.display = "none";
  };

  // Confirm No
  confirmNo.onclick = () => {
    confirmPopup.style.display = "none";
    confirmAction = null;
  };
// Filter buttons
  allTasksButton.onclick = () => {
    currentFilter = "all";
    renderTasks();
  };

  doneTasksButton.onclick = () => {
    currentFilter = "done";
    renderTasks();
  };

  todoTasksButton.onclick = () => {
    currentFilter = "todo";
    renderTasks();
  };




 
  // Initial render when page opens
  renderTasks();
});
 