// Motivational Quotes Array
const quotes = [
    "Believe you can and you're halfway there.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success is the sum of small efforts repeated daily.",
    "The secret to getting ahead is getting started.",
    "Small daily improvements lead to stunning results."
];

// Display random quote
function displayQuote() {
    const quoteEl = document.getElementById('motivationalQuote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[randomIndex];
}

// Task Management
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTitle = document.getElementById('taskTitle');
const taskSubject = document.getElementById('taskSubject');
const taskDueDate = document.getElementById('taskDueDate');
const taskPriority = document.getElementById('taskPriority');
const searchTask = document.getElementById('searchTask');
const progressFill = document.getElementById('progressFill');

// Display tasks
function displayTasks(filter='') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()) || task.subject.toLowerCase().includes(filter.toLowerCase()));
    filteredTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

        taskCard.innerHTML = `
            <div class="task-info">
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Subject:</strong> ${task.subject}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <label>
                    Completed: 
                    <input type="checkbox" class="task-completed" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index}, this)">
                </label>
            </div>
            <div class="task-buttons">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
    updateProgress();
}

// Add Task
addTaskBtn.addEventListener('click', () => {
    if(taskTitle.value && taskSubject.value && taskDueDate.value) {
        tasks.push({
            title: taskTitle.value,
            subject: taskSubject.value,
            dueDate: taskDueDate.value,
            priority: taskPriority.value,
            completed: false
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskTitle.value = '';
        taskSubject.value = '';
        taskDueDate.value = '';
        taskPriority.value = 'High';
        displayTasks();
    } else {
        alert("Please fill all fields");
    }
});

// Toggle Complete
function toggleComplete(index, checkbox){
    tasks[index].completed = checkbox.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateProgress();
}

// Edit Task
function editTask(index) {
    const task = tasks[index];
    const newTitle = prompt("Edit Task Title", task.title);
    const newSubject = prompt("Edit Subject", task.subject);
    const newDueDate = prompt("Edit Due Date", task.dueDate);
    const newPriority = prompt("Edit Priority (High/Medium/Low)", task.priority);

    if(newTitle && newSubject && newDueDate && newPriority) {
        tasks[index] = {
            ...task,
            title: newTitle,
            subject: newSubject,
            dueDate: newDueDate,
            priority: newPriority
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Delete Task
function deleteTask(index) {
    if(confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Search Task
searchTask.addEventListener('input', (e) => {
    displayTasks(e.target.value);
});

// Update Progress
function updateProgress() {
    if(tasks.length === 0){
        progressFill.style.width = '0%';
        progressFill.textContent = '0%';
        return;
    }
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = Math.round((completedTasks / tasks.length) * 100);
    progressFill.style.width = progress + '%';
    progressFill.textContent = progress + '%';
}

// Initial Load
displayQuote();
displayTasks();