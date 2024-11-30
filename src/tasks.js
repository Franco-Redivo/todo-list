
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

const taskUl = document.querySelector('.tasks');
const projectUl = document.querySelector('.projects');

function displayTasks(project) {
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
  });

}

function displayProjects(projects) {
  projects.forEach((project) => {
    const projectLi = document.createElement('li');
    projectLi.classList.add('project');
    projectLi.innerHTML = `
      <button class="project-btn">${project.name}</button>
    `;
  });
}

