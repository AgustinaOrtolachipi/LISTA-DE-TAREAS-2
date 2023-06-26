/*La interfaz Task define la estructura de una tarea, 
que tiene propiedades como id, name y completed.*/
interface Task {
    id: string;
    name: string;
    completed: boolean;
  }


  /*Estas variables guardan las referencias a los elementos del DOM con los respectivos IDs:
   taskList es el contenedor de las tareas, taskInput es el campo
   de entrada para agregar nuevas tareas, y addButton es el botón para agregar una tarea.
  */ 
 const taskList = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const addButton = document.getElementById('addButton');
 
 
  /*La variable tasks es un array que almacenará todas las tareas.*/
  let tasks: Task[] = [];
  

  /* La función renderTasks se encarga de actualizar la visualización de todas las tareas
   en el DOM. Recorre el array tasks y crea elementos HTML para cada tarea, incluyendo un checkbox,
 una etiqueta y un botón de eliminar. También asigna los eventos correspondientes al botón de
  eliminar y al checkbox.
  */
  function renderTasks() {
    if (!taskList) {
      console.error('No se encontró el elemento con id "taskList".');
      return;
    }
  
    taskList.innerHTML = '';
  
    tasks.forEach((task) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task';
      taskItem.innerHTML = `
        <input type="checkbox" class="taskCheckbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
        <label for="${task.id}" class="taskLabel ${task.completed ? 'completed' : ''}">${task.name}</label>
        <button class="deleteButton" data-task-id="${task.id}">Eliminar</button>
      `;
  
      taskList.appendChild(taskItem);
  
      const deleteButton = taskItem.querySelector('.deleteButton');
      deleteButton?.addEventListener('click', deleteTask);
  
      const checkbox = taskItem.querySelector('.taskCheckbox') as HTMLInputElement;
      checkbox?.addEventListener('change', toggleTaskCompletion);
    });
  }

  /*La función addTask se ejecuta cuando se hace clic en el botón de agregar una tarea. 
  Obtiene el valor del campo de entrada, crea una nueva tarea con un ID único y la agrega 
  al array tasks. Luego, se llama a renderTasks para actualizar la visualización de las tareas.
   */
  function addTask() {
    const taskName = taskInput.value.trim();
  
    if (taskName === '') {
      return;
    }
  
    const taskId = `task${tasks.length + 1}`;
    const newTask: Task = {
      id: taskId,
      name: taskName,
      completed: false,
    };
  
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }

  /*La función deleteTask se ejecuta cuando se hace clic en el botón de eliminar una tarea.
   Obtiene el ID de la tarea desde el atributo data-task-id del botón y filtra el array tasks
    para eliminar la tarea correspondiente. Luego, se llama a renderTasks para actualizar la 
    visualización.
   */
   function deleteTask(event: Event) {
    const button = event.target as HTMLButtonElement;
    const taskId = button.dataset.taskId;
  
    if (taskId) {
      tasks = tasks.filter((task) => task.id !== taskId);
      renderTasks();
    }
  }

  /*La función toggleTaskCompletion se ejecuta cuando se cambia el estado del checkbox de una tarea.
   Obtiene el ID de la tarea desde la propiedad id del checkbox y encuentra la tarea
    correspondiente en el array tasks. Luego, actualiza la propiedad completed de la tarea 
    según el estado del checkbox y llama a renderTasks para actualizar la visualización.
   */
  function toggleTaskCompletion(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const taskId = checkbox.id;
  
    const task = tasks.find((task) => task.id === taskId);
  
    if (task) {
      task.completed = checkbox.checked;
      renderTasks();
    }
  }


  /*Este bloque de código comprueba si los elementos taskList y addButton existen en el DOM.
   Si existen, agrega el evento de clic a addButton para llamar a addTask cuando se hace clic
    en él, y luego llama a renderTasks para mostrar las tareas. Si los elementos no se encuentran, 
    se muestra un mensaje de error en la consola.
   */
  if (taskList && addButton) {
    addButton.addEventListener('click', addTask);
    renderTasks();
  } else {
    console.error('No se encontraron los elementos necesarios.');
  }
  