const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateToDoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo (){
    const todo = todoInput.value.trim();
    if (todo.length > 0) {
        const todoObject = {
            text: todo,
            completed: false
        };
        allTodos.push(todoObject);
        updateToDoList();
        saveTodo();
        todoInput.value = "";
    }
}

function createTodoItem(todo, todoIndex) {
    const todoLi = document.createElement("li");
    const todoId = "todo-" + todoIndex;
    const todoText = todo.text;
    todoLi.className = "todo";
    todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg"
                             height="24px" viewBox="0 -960 960 960"
                             width="24px" ><path
                                d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                        </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 -960 960 960"
                         width="24px"><path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `

    const deleteButton = todoLi.querySelector("button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}

function updateToDoList () {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);

    })
}

function saveTodo() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodo();
    updateToDoList();
}
