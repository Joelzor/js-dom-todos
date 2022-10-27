// Selections
const list = document.querySelector("#todo-list");

const state = {
  todos: [],
};

function getAllTodos() {
  const url = "http://localhost:3000/todos";

  fetch(url)
    .then((response) => response.json())
    .then((todos) => {
      state.todos = todos;
      renderTodos();
    });
}

function renderTodos() {
  list.innerHTML = "";

  state.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerText = todo.title;
    if (todo.completed === true) {
      li.setAttribute("class", "completed");
    }

    list.appendChild(li);
  });
}

getAllTodos();
