function AddItem() {
    var ul = document.getElementById("list");
    var input = document.getElementById("user");
  
    if (input.value === '') {
      return alert('Enter a Task');
    }
  
    var li = document.createElement("li");
    li.innerHTML = `
      <span class="task">${input.value}</span>
      <div class="actions">
        <button onclick="RemoveItem(this.parentNode.parentNode)">Remove</button>
        <button onclick="MarkDone(this.parentNode.parentNode)">Done</button>
      </div>
    `;
    ul.appendChild(li);
    input.value = "";
  }
  
function RemoveItem(item) {
    var ul = document.getElementById("list");
    ul.removeChild(item);
}
  
function MarkDone(item) {
    var task = item.querySelector(".task");
    task.classList.toggle("done");
}
  