document.addEventListener('DOMContentLoaded', function () {
    displayTasks();
});

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    if (title && dueDate) {
        const task = {
            title,
            description,
            dueDate,
            priority,
            category,
            status: 'New'
        };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTasks();
        clearForm();
    } else {
        alert('Title and Due Date are required!');
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task';
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <button onclick="updateTaskStatus('${task.title}', 'In Progress')">Start</button>
            <button onclick="updateTaskStatus('${task.title}', 'Completed')">Complete</button>
            <button onclick="deleteTask('${task.title}')">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });
}

function updateTaskStatus(title, status) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.title === title) {
            return { ...task, status };
        } else {
            return task;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
}

function deleteTask(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.title !== title);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('priority').value = 'low';
    document.getElementById('category').value = '';
}
