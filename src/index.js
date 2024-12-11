import "./styles.css";

function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  
  const projects = [];
  
  function Project(name) {
    this.name = name;
    this.tasks = [];
  }
  
  function addProject(project) {
    projects.push(project);
  }
  
  
  function addTaskToProject(project, task) {
    project.tasks.push(task);
  }
  
  
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
          <span class="task-name">${task.title}</span>
        </div>
        <div class="task-info">
            <p>${task.dueDate}</p>
            <button id="edit-task-btn">edit</button>
            <button id="delete-task-btn">delete</button>
        </div>
        `;
      if(task.priority === 'high'){
          taskLi.style.backgroundColor = '#f8d7da';
      } else if(task.priority === 'medium'){
          taskLi.style.backgroundColor = '#fff3cd';
      } else {
          taskLi.style.backgroundColor = '#d1e7dd';
      }

      
      taskUl.appendChild(taskLi);
    });
    updateTaskButtons();
  
  }
  function updateTaskButtons() {
    const deleteBtns = document.querySelectorAll('#delete-task-btn');
    const editBtns = document.querySelectorAll('#edit-task-btn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const taskName = document.querySelectorAll('.task-name');
    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            removeTaskFromProject(currentProject, currentProject.tasks[index]);
            clearTasks();
            displayTasks(currentProject);
        });
    });

    editBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            dialogUpdate.showModal();
            currentTaskIndex = index;
            const taskToEdit = currentProject.tasks[index];
            taskNameInputUpdated.value = taskToEdit.title;
            taskDateInputUpdated.value = taskToEdit.dueDate;
            taskDescInputUpdated.value = taskToEdit.description;
            taskPriorityInputUpdated.value = taskToEdit.priority;
          
        });
    });

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskName[index].style.textDecoration = 'line-through';
            } else {
                taskName[index].style.textDecoration = 'none';
            }
          });
        });
  }
  
  function displayAllTasks(){
    projects.forEach((project) => {
      displayTasks(project);
    });
    projectTitle.innerHTML = 'All Tasks';
    
  }

  function updateProjectButtons() {
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            clearTasks();
            displayTasks(projects[index]);
            currentProject = projects[index];
        });
    });
  }
  
  function displayProjects() {
    clearProjects();
    projects.forEach((project) => {
      const projectLi = document.createElement('li');
      projectLi.classList.add('project');
      projectLi.innerHTML = `
        <button class="project-btn">${project.name}</button>
      `;
      projectUl.appendChild(projectLi);
    });
    updateProjectButtons();
  }
  function clearTasks(){
    taskUl.innerHTML = '';
  }
  function clearProjects(){
    projectUl.innerHTML = '';
  }


  
//buttons
const allTasksBtn = document.querySelector('#all');
const addProjectBtn = document.querySelector('#add-project');
const addTaskBtn = document.querySelector('#add-task');
const dialog = document.querySelector('#dialog');
const dialogUpdate = document.querySelector('#update-dialog');
const cancelTaskBtn = document.querySelector('#cancel-button');
const confirmTaskBtn = document.querySelector('#confirm-button');
const updateTaskBtn = document.querySelector('#update-confirm-button');
const cancelUpdateTaskBtn = document.querySelector('#update-cancel-button');

//inputs
const taskNameInput = document.querySelector('#task-title');
const taskDateInput = document.querySelector('#task-date');
const taskDescInput = document.querySelector('#task-description');
const taskPriorityInput = document.querySelector('#task-priority');
const taskNameInputUpdated = document.querySelector('#update-task-title');
const taskDateInputUpdated = document.querySelector('#update-task-date');
const taskDescInputUpdated = document.querySelector('#update-task-description');
const taskPriorityInputUpdated = document.querySelector('#update-task-priority');

let currentTaskIndex = null;
let currentProject = projects.length > 0 ? projects[0] : null;
displayAllTasks();
displayProjects();
updateProjectButtons();

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelTaskBtn.addEventListener('click', () => {
    dialog.close();
});

cancelUpdateTaskBtn.addEventListener('click', () => {
    dialogUpdate.close();
});

addProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter project name');
    if (!projectName) return;

    const newProject = new Project(projectName);
    addProject(newProject);

    // Actualiza el proyecto actual al nuevo
    currentProject = newProject;

    clearProjects();
    displayProjects();
    clearTasks();
    displayTasks(currentProject);
});

allTasksBtn.addEventListener('click', () => {
    clearTasks();
    displayAllTasks();
});

updateTaskBtn.addEventListener('click', () => {
    if (!currentProject) {
        alert('Please select or create a project first!');
        dialogUpdate.close();
        return;
    }

    if (currentTaskIndex === null) {
        alert('Please select a task to update!');
        dialogUpdate.close();
        return;
    }

    // Validar los campos del formulario antes de proceder
    if (
        !taskNameInputUpdated.value.trim() ||
        !taskDateInputUpdated.value.trim() ||
        !taskDescInputUpdated.value.trim() ||
        !taskPriorityInputUpdated.value
    ) {
        alert('Please fill in all the fields!');
        return;
    }

    // Crear una nueva tarea
    const updatedTask = new Task(
        taskNameInputUpdated.value.trim(),
        taskDescInputUpdated.value.trim(),
        taskDateInputUpdated.value.trim(),
        taskPriorityInputUpdated.value
    );

    // Actualizar la tarea en el proyecto actual
    currentProject.tasks[currentTaskIndex] = updatedTask;
    

    // Limpiar tareas y mostrar el proyecto actual
    clearTasks();
    displayTasks(currentProject);

    // Cerrar el modal
    dialogUpdate.close();

    // Limpiar los valores del formulario
    taskNameInputUpdated.value = '';
    taskDateInputUpdated.value = '';
    taskDescInputUpdated.value = '';
    taskPriorityInputUpdated.value = '';
});





confirmTaskBtn.addEventListener('click', () => {
    if (!currentProject) {
        alert('Please select or create a project first!');
        dialog.close();
        return;
    }

    // Validar los campos del formulario antes de proceder
    if (
        !taskNameInput.value.trim() ||
        !taskDateInput.value.trim() ||
        !taskDescInput.value.trim() ||
        !taskPriorityInput.value
    ) {
        alert('Please fill in all the fields!');
        return;
    }


    // Crear una nueva tarea
    const task = new Task(
        taskNameInput.value.trim(),
        taskDescInput.value.trim(),
        taskDateInput.value.trim(),
        taskPriorityInput.value
    );

    // Agregar la tarea al proyecto actual
    addTaskToProject(currentProject, task);
    console.log(task.priority);
    // Limpiar tareas y mostrar el proyecto actual
    clearTasks();
    displayTasks(currentProject);

    // Cerrar el modal
    dialog.close();

    // Limpiar los valores del formulario
    taskNameInput.value = '';
    taskDateInput.value = '';
    taskDescInput.value = '';
    taskPriorityInput.value = '';
});
