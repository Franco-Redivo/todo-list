
function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

const task1 = new Task('Task 1', 'Description 1', '2021-12-31', 'High');
const task2 = new Task('Task 2', 'Description 2', '2021-12-31', 'Medium');

function Project(name) {
  this.name = name;
  this.tasks = [];
}

const project1 = new Project('Project 1');

function addTaskToProject(project, task) {
  project.tasks.push(task);
}

addTaskToProject(project1, task1);
addTaskToProject(project1, task2);

function removeTaskFromProject(project, task) {
  project.tasks = project.tasks.filter((t) => t !== task);
}

function displayTasks(project) {
  project.tasks.forEach((task) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.innerHTML = `
      <label>
        <input type="checkbox">
        <span></span>
        ${task.title}
      </label>
      <p>${task.priority}</p>
      <p>Due: ${task.dueDate}</p>
      
    `;
  });

}

function displayProjects(projects) {
  projects.forEach((project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.innerHTML = `
      <h2>${project.name}</h2>
    `;
  });
}

