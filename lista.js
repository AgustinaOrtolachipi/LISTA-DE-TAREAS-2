var taskList = document.getElementById('taskList');
var taskInput = document.getElementById('taskInput');
var addButton = document.getElementById('addButton');
var tasks = [];
function renderTasks() {
    if (!taskList) {
        console.error('No se encontró el elemento con id "taskList".');
        return;
    }
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var taskItem = document.createElement('div');
        taskItem.className = 'task';
        taskItem.innerHTML = "\n        <input type=\"checkbox\" class=\"taskCheckbox\" id=\"".concat(task.id, "\" ").concat(task.completed ? 'checked' : '', ">\n        <label for=\"").concat(task.id, "\" class=\"taskLabel ").concat(task.completed ? 'completed' : '', "\">").concat(task.name, "</label>\n        <button class=\"deleteButton\" data-task-id=\"").concat(task.id, "\">Eliminar</button>\n      ");
        taskList.appendChild(taskItem);
        var deleteButton = taskItem.querySelector('.deleteButton');
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', deleteTask);
        var checkbox = taskItem.querySelector('.taskCheckbox');
        checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('change', toggleTaskCompletion);
    });
}
function addTask() {
    var taskName = taskInput.value.trim();
    if (taskName === '') {
        return;
    }
    var taskId = "task".concat(tasks.length + 1);
    var newTask = {
        id: taskId,
        name: taskName,
        completed: false,
    };
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}
function deleteTask(event) {
    var button = event.target;
    var taskId = button.dataset.taskId;
    if (taskId) {
        tasks = tasks.filter(function (task) { return task.id !== taskId; });
        renderTasks();
    }
}
function toggleTaskCompletion(event) {
    var checkbox = event.target;
    var taskId = checkbox.id;
    var task = tasks.find(function (task) { return task.id === taskId; });
    if (task) {
        task.completed = checkbox.checked;
        renderTasks();
    }
}
if (taskList && addButton) {
    addButton.addEventListener('click', addTask);
    renderTasks();
}
else {
    console.error('No se encontraron los elementos necesarios.');
}
