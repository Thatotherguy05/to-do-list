document.addEventListener("DOMContentLoaded", function() {
  let getItems = localStorage.getItem('ToDo');
  if (!getItems || getItems === '') {
    return;
  }

  getItems = JSON.parse(getItems);

  var ul = document.getElementById("list");

  getItems.forEach(element => {
    var li = document.createElement("li");

    li.innerHTML = `
      <span class="task">${element.text}</span>
      <div class="actions">
        <button onclick="RemoveItem(this.parentNode.parentNode)">Remove</button>
        <button onclick="ToggleDone(this.parentNode.parentNode)">Done</button>
      </div>
    `;

    if (element.isCompleted) {
      li.querySelector(".task").classList.add("done");
    }

    ul.appendChild(li);
  });
});

function AddItem() {
  var ul = document.getElementById("list");
  var input = document.getElementById("user");
  
  if (input.value === '') {
    return alert('Enter a Task');
  }

  var todo = {
    text: input.value,
    isCompleted: false
  };
  
  var existingTodos = localStorage.getItem("ToDo");
  if (existingTodos) {
    existingTodos = JSON.parse(existingTodos);
    if (!Array.isArray(existingTodos)) {
      existingTodos = [];
    }
  } else {
    existingTodos = [];
  }

  existingTodos.push(todo);
  saveTodoJSON(existingTodos);

  var li = document.createElement("li");
  li.innerHTML = `
    <span class="task">${input.value}</span>
    <div class="actions">
      <button onclick="RemoveItem(this.parentNode.parentNode)">Remove</button>
      <button onclick="ToggleDone(this.parentNode.parentNode)">Done</button>
    </div>
  `;
  ul.appendChild(li);
  input.value = "";
}

function RemoveItem(item) {
  var ul = document.getElementById("list");
  ul.removeChild(item);

  var task = item.querySelector(".task");
  var existingTodos = retrieveTodos();
  existingTodos = existingTodos.filter(todo => todo.text !== task.textContent);
  saveTodoJSON(existingTodos);
}

function ToggleDone(item) {
  var task = item.querySelector(".task");
  task.classList.toggle("done");

  var existingTodos = retrieveTodos();
  var todo = existingTodos.find(todo => todo.text === task.textContent);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    saveTodoJSON(existingTodos);
  }
}

function retrieveTodos() {
  var existingTodos = localStorage.getItem("ToDo");
  if (existingTodos) {
    return JSON.parse(existingTodos);
  }
  return [];
}

function saveTodoJSON(todos) {
  localStorage.setItem("ToDo", JSON.stringify(todos));
}