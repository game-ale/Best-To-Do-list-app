document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("deadlineInput");
    let taskText = taskInput.value.trim();
    let deadline = deadlineInput.value; // Get deadline value

    if (taskText === "") return;

    let tasks = getTasksFromStorage();
    tasks.push({ text: taskText, deadline: deadline, completed: false });
    saveTasksToStorage(tasks);

    renderTasks();
    taskInput.value = "";
    deadlineInput.value = "";
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = getTasksFromStorage();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        
        // Apply 'overdue' class if task is overdue
        if (task.deadline && isOverdue(task.deadline)) {
            li.classList.add("overdue");
        }

        let span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");
        span.onclick = function () {
            toggleTaskCompletion(index);
        };

        let deadlineSpan = document.createElement("span");
        deadlineSpan.textContent = task.deadline ? ` (Due: ${formatDeadline(task.deadline)})` : "";
        deadlineSpan.className = "deadline";

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            editTask(index);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(span);
        li.appendChild(deadlineSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function toggleTaskCompletion(index) {
    let tasks = getTasksFromStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage(tasks);
    renderTasks();
}

function editTask(index) {
    let tasks = getTasksFromStorage();
    let newText = prompt("Edit task:", tasks[index].text);
    let newDeadline = prompt("Edit deadline (YYYY-MM-DD HH:MM):", tasks[index].deadline);

    if (newText !== null) tasks[index].text = newText.trim();
    if (newDeadline !== null) tasks[index].deadline = newDeadline.trim();

    saveTasksToStorage(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks();
}

function formatDeadline(deadline) {
    let date = new Date(deadline);
    return date.toLocaleString(); // Format the date nicely
}

function isOverdue(deadline) {
    return new Date(deadline) < new Date();
}

// Listen for "Enter" key to add a task
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
