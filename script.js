function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function () {
        this.classList.toggle("completed");
    };
    
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", span.textContent);
        if (newText !== null) span.textContent = newText.trim();
    };
    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delsete-btn";
    deleteBtn.onclick = function () {
        this.parentElement.remove();
    };
    
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    
    taskInput.value = "";
}
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});