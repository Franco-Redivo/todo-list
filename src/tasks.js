import './styles.css';
function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

const projects = [];

const task1 = new Task('Task 1', 'Description 1', 'dec 31th', 'High');
const task2 = new Task('Task 2', 'Description 2', 'dec 31th', 'Medium');
const task3 = new Task('Task 3', 'Description 3', 'nov 14th', 'Low');
const task4 = new Task('Task 4', 'Description 4', 'nov 14th', 'High');

function Project(name) {
  this.name = name;
  this.tasks = [];
}

function addProject(project) {
  projects.push(project);
}

const project1 = new Project('Project 1');
addProject(project1);
const project2 = new Project('Project 2');
addProject(project2);

function addTaskToProject(project, task) {
  project.tasks.push(task);
}

addTaskToProject(project1, task1);
addTaskToProject(project1, task2);
addTaskToProject(project2, task3);
addTaskToProject(project2, task4);

function removeTaskFromProject(project, task) {
  project.tasks = project.tasks.filter((t) => t !== task);
}

const taskUl = document.querySelector('.tasks');
const projectUl = document.querySelector('.projects');
const projectTitle = document.querySelector('#project-title');

function displayTasks(project) {
  projectTitle.innerHTML = project.name;
  project.tasks.forEach((task) => {
    const taskLi = document.createElement('li');
    taskLi.classList.add('task');
    taskLi.innerHTML = `
      <div class="task-title">
        <input type="checkbox">
        <span>${task.title}</span>
      </div>
      <div class="task-info">
          <p>${task.dueDate}</p>
          <button>edit</button>
          <button>delete</button>
      </div>
      
    `;
    taskUl.appendChild(taskLi);
  });

}

function displayAllTasks(){
  projects.forEach((project) => {
    displayTasks(project);
  });
  projectTitle.innerHTML = 'All Tasks';
}

function displayProjects() {
  projects.forEach((project) => {
    const projectLi = document.createElement('li');
    projectLi.classList.add('project');
    projectLi.innerHTML = `
      <button class="project-btn">${project.name}</button>
    `;
    projectUl.appendChild(projectLi);
  });
}
function clearTasks(){
  taskUl.innerHTML = '';
}
function clearProjects(){
  projectUl.innerHTML = '';
}

export { project1,project2,projects, addTaskToProject, removeTaskFromProject, displayTasks, displayProjects, displayAllTasks, clearTasks, clearProjects  };

