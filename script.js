document.addEventListener('DOMContentLoaded', loadTask);
// to take a data from database and seen
function loadTask() {
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => addTaskMenu(task));
}



function addTask(){
    // take a value from input flied
    let textinput = document.getElementById("inputtask");
    let textcontent=textinput.value;

    addTaskMenu(textcontent)

// to save in local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(textcontent);

    localStorage.setItem("tasks", JSON.stringify(tasks))
    textinput.value = "";

    
}

// to add those in to do 
function addTaskMenu (textcontent){

    let ul = document.getElementById('tasklist');
    let li = document.createElement('li');

    li.innerHTML=`
    <span> ${textcontent}</span>
    <span>
        <span class="delete btn btn-danger" onclick="deleteTask(this)" >🗑️</span>
        <span class="edit btn btn-primary" onclick="editTask(this)">✏️</span>
        </span>
    `
    ul.appendChild(li);

}
 // delete a task 

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove()

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(task => task !== taskText)
    localStorage.setItem("tasks",JSON.stringify(tasks))

}

function editTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    let newTaskText = prompt("Edit your task:", taskText);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        li.firstElementChild.innerText = newTaskText;

        // Update the task in local storage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = tasks.indexOf(taskText);
        if (index !== -1) {
            tasks[index] = newTaskText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}