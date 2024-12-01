import "./styles.css";
import { project1,project2,projects, addTaskToProject, removeTaskFromProject, displayTasks, displayProjects, displayAllTasks,clearTasks, clearProjects  } from "./tasks";

displayAllTasks();
displayProjects();

//buttons
const allTasksBtn = document.querySelector('#all');
const addProjectBtn = document.querySelector('#add-project');
const projectBtns = document.querySelectorAll('.project-btn');
const addTaskBtn = document.querySelector('#add-task');
const dialog = document.querySelector('#dialog');
const cancelTaskBtn = document.querySelector('#cancel-button');

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelTaskBtn.addEventListener('click', () => {
    dialog.close();
});

addProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter project name');
    const project = { name: projectName, tasks: [] };
    projects.push(project);
    clearProjects();
    displayProjects();
});