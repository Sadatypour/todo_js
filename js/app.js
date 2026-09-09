const addtask = document.querySelector(".add_task")
const maintodolist = document.querySelector(".todo_list")
const deletetask = document.querySelectorAll(".delete")
const done = document.querySelectorAll(".done")
const text = document.querySelector(".text")
const modalscreen = document.querySelector(".modal_screen")
const add = document.querySelector(".add")
const back = document.querySelector(".back")
const inputtask = document.querySelector(".input_task")
let todos = []

function showmodal() {
    modalscreen.classList.remove("hidden")
}

function hiddenmodal() {
    modalscreen.classList.add("hidden")
}
function showtodo(showtodos) {
    maintodolist.innerHTML = "";
    showtodos.forEach(function (todo) {
        maintodolist.insertAdjacentHTML("beforeend", `
         <div class="todo ${todo.iscomplate ? "complete" : ""}">
                    <div class="btns">
                        <img class="delete" onclick="removeTodo(${todo.id
            })" src="./images/icons8-delete.svg" alt="delete">
                        <img class="done" onclick="completeTodo(${todo.id
            })" src="./images/icons8-done.svg" alt="done">
                    </div>
                    <p class="text">${todo.title}</p>
                </div>
        `)
    })

}
function addtodo() {

    const input = inputtask.value
    const newtodo = {
        id: Math.floor(Math.random() * 9999),
        title: input,
        iscomplate: false
    }

    todos.push(newtodo)
    savetodolocal(todos)
    showtodo(todos);

    inputtask.value = ""
    modalscreen.classList.add("hidden")

}


function savetodolocal(todosArray) {
    localStorage.setItem("todos", JSON.stringify(todosArray))
}
function gettodolocal() {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
        todos = localTodos;
    }
    showtodo(localTodos)
}

function removeTodo(todoid) {
    const mainindex = todos.findIndex(function (todo) {
        return todo.id === todoid
    })
    console.log(mainindex)
    todos.splice(mainindex, 1);
    console.log(todos)
    showtodo(todos);
    savetodolocal(todos);
}

function completeTodo(todoId) {
    todos.some(function (todo) {
        if (todo.id === todoId) {
            todo.iscomplate = true;
            return true;
        }
    });
    console.log("ok")
    savetodolocal(todos);
    showtodo(todos);
}






add.addEventListener("click", addtodo)
addtask.addEventListener("click", showmodal)
back.addEventListener("click", hiddenmodal)





