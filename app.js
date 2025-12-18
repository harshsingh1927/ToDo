let tasks = [];

/* ADD TASK */
const addTask = () => {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    updateTasks();
};

/* UPDATE UI */
const updateTasks = () => {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" 
                        ${task.completed ? "checked" : ""} 
                        onchange="toggleTask(${index})">
                    <p>${task.text}</p>
                </div>
                <div class="icon">
                    <img src="./img/edit.png" onclick="editTask(${index})">
                    <img src="./img/delete-icon-clipart-5.png" onclick="deleteTask(${index})">
                </div>
            </div>
        `;
        list.appendChild(li);
    });

    updateProgress();
};

/* TOGGLE */
const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
};

/* DELETE */
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasks();
};

/* EDIT */
const editTask = (index) => {
    const newText = prompt("Edit task", tasks[index].text);
    if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasks();
    }
};

/* PROGRESS */
const updateProgress = () => {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;

    document.getElementById("numbers").innerText = `${done} / ${total}`;

    const percent = total === 0 ? 0 : (done / total) * 100;
    document.getElementById("progress").style.width = percent + "%";
};

/* EVENT */
document.getElementById("newTask").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});
