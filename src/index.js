document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#create-task-form").addEventListener("submit", e => {
    e.preventDefault()
    buildToDo(e["target"]["new-task-description"]["value"], e["target"]["priority"]["value"]);
    document.querySelector("#create-task-form").reset();
  })
});

let listItems = [];

function buildToDo(todo, priority) {
  let li = document.createElement("li");
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete);
  btn.textContent = " x ";
  li.textContent = `${todo} `;
  li.appendChild(btn);
  document.getElementById("tasks").appendChild(li);

  //Set color with priority
  if(priority === "high") {
    listItems.push({description: todo, priority: 3});
    li.style.color = "red";
  } else if (priority === "medium") {
    listItems.push({description: todo, priority: 2});
    li.style.color = "yellow";
  } else if (priority === "low") {
    listItems.push({description: todo, priority: 1});
    li.style.color = "green";
  }
}

function handleDelete(e) {
  e.target.parentNode.remove();
  
}

let filter = document.getElementById("filter");

filter.addEventListener("change", (e) => {
  if(e.target.value === "highToLow") {
    listItems.sort((a,b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0));

  } else if (e.target.value === "lowToHigh") {
    listItems.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
  }
  let sortedList = document.getElementById("tasks");
  sortedList.innerHTML = "";
  
  for(let i = 0; i < listItems.length; i++) {
    const li = document.createElement("li");
    li.textContent = listItems[i].description;
    document.getElementById("tasks").appendChild(li);
    let btn = document.createElement("button");
    btn.addEventListener("click", handleDelete);
    btn.textContent = " x ";
    li.appendChild(btn);

    if(listItems[i].priority === 3) {
      li.style.color = "red";
    } else if(listItems[i].priority === 2) {
      li.style.color = "yellow";
    } else {
      li.style.color = "green";
    }
  }
})