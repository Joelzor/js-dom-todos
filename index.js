// Selections
const list = document.querySelector("#todo-list");

const form = document.querySelector("form");
const input = document.querySelector("#input");
console.log(input);

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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = "http://localhost:3000/todos";
  console.log(input.value);
  const newTask = input.value;
 const options = {
  method: "POST",
  headers: {
    // key-value pairs
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: newTask,
    completed: false
  })
 }
fetch(url, options)
.then(res => res.json())
.then(newTask=> {
  state.todos.push(newTask)
  renderTodos();
})


});
