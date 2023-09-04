(() => {
    let tasks = [];
    const tasklist = document.getElementById('list');
    const addtaskinput = document.getElementById('add-task-input');
    const tasksCounter = document.getElementById('tasks-counter');
    const addtaskbutton = document.getElementById('add-task-button');

    function renderlist() {
        tasklist.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            addtasktoDOM(tasks[i]);
        }
        tasksCounter.textContent = tasks.length;
    }

    function addtasktoDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="checkbox-${task.id}" ${task.completed ? 'checked' : ''} class="task-checkbox">
            <label for="checkbox-${task.id}">${task.title}</label>
            <img src="bin.svg" class="delete" data-id="${task.id}" />`;
        tasklist.appendChild(li);
    }

    function addtask(task) {
        if (task) {
            tasks.push(task);
            renderlist();
            showNotification(`Task added successfully`);
            return;
        }
        showNotification(`Task cannot be added`);
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            const text = addtaskinput.value;
            if (!text) {
                showNotification(`Task text cannot be empty`);
                return;
            }
            const task = {
                title: text,
                id: Date.now(),
                completed: false
            };
            addtaskinput.value = '';
            addtask(task);
        }
    }

    addtaskbutton.addEventListener('click', () => {
        const text = addtaskinput.value;
        if (!text) {
            showNotification(`Task text cannot be empty`);
            return;
        }
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        };
        addtaskinput.value = '';
        addtask(task);
    });

    function handleClickListener(e) {
        const target = e.target;
        if (target.className === 'delete') {
            const taskid = target.dataset.id;
            deletetask(taskid);
        } else if (target.className === 'task-checkbox') {
            const taskid = target.id.replace('checkbox-', '');
            marktaskascomplete(taskid);
        }
    }

    function marktaskascomplete(taskid) {
        const taskIndex = tasks.findIndex(task => task.id == Number(taskid));
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderlist();
            showNotification(`Task toggled successfully`);
        } else {
            showNotification(`Could not toggle the task`);
        }
    }

    function deletetask(taskid) {
        tasks = tasks.filter(task => task.id != Number(taskid));
        renderlist();
        showNotification(`Task deleted successfully`);
    }

    function initialising() {
        addtaskinput.addEventListener('keyup', handleInputKeyPress);
        tasklist.addEventListener('click', handleClickListener);
    }

    initialising();
})();
