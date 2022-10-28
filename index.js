// Selections
const list = document.querySelector("#todo-list");

const form = document.querySelector("form");
const input = document.querySelector("#input");

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
    const completedButton = document.createElement("button");
    completedButton.innerText = "✔️";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    list.appendChild(li);
    li.appendChild(completedButton);
    li.appendChild(deleteButton);
    completedButton.addEventListener("click", function () {
      const url = `http://localhost:3000/todos/${todo.id}`;
      const options = {
        method: "PATCH",
        headers: {
          // key-value pairs
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((updatedTask) => {
          for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === updatedTask.id) {
              state.todos[i] = updatedTask;
              break;
            }
          }
          renderTodos();
        });
    });

    deleteButton.addEventListener("click", () => {
      const url = `http://localhost:3000/todos/${todo.id}`;

      const options = {
        method: "DELETE",
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((deletedUser) => {
          getAllTodos();
        });
    });
  });
}

getAllTodos();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = "http://localhost:3000/todos";
  const newTask = input.value;
  const options = {
    method: "POST",
    headers: {
      // key-value pairs
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTask,
      completed: false,
    }),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((newTask) => {
      state.todos.push(newTask);
      renderTodos();
    });
});
