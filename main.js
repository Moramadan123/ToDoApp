let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".deleteall");

// Empty array to store tasks
let arrayOfTasks = [];

// Check if there are tasks in localStorage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    addElementsToPageFrom(arrayOfTasks);
}

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);  // Add task to array of tasks
        input.value = "";  // Clear input field
    }
};

// Click on task element
taskDiv.addEventListener("click", (e) => {
    // Delete button
    if (e.target.classList.contains("del")) {
        // Remove task from localStorage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove task from page
        e.target.parentElement.remove();
    }
    
    // Toggle done status on task
    if (e.target.classList.contains("task")) {
        toggleStatusTaskWithId(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});

// Add task to array and localStorage
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    };
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Add tasks to page
function addElementsToPageFrom(arrayOfTasks) {
    taskDiv.innerHTML = "";  // Clear tasks div
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.classList.add("done");
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        
        taskDiv.appendChild(div);
    });
}

// Store tasks in localStorage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Get tasks from localStorage
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

// Delete task with a specific ID
function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Toggle task completed status
function toggleStatusTaskWithId(taskId) {
    arrayOfTasks = arrayOfTasks.map((task) => {
        if (task.id == taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Delete all tasks
delAll.onclick = function () {
    taskDiv.innerHTML = "";
    localStorage.clear();
    arrayOfTasks = [];
};
