const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
// JSON.stringify() => 값을 string 형식으로 바꿔줌
// JSON.parse() => string을 지워줌, 사용할수 있는 형태로 바꿈

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // 거름망 => True 면 작성, Fasle면 제외 (toDo.id === parseInt(li.id))
  // 새로운 array를 주기때문에 다시 저장하기
  saveToDos();
  // 해당되는 li 지우고 DB인 array에도 따로 지워줘야함
  // => 보기에는 지워졌지만 array에서 다시 불러오기 때문에 새로고침하면 다시 보임.
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "X";

  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  //   parsedToDos.forEach((item) => console.log("this is the turn of ", item));
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
